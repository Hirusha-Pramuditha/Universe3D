import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../../styles/GameCanvas.css'

function GameCanvas({ selectedBuilding, teleportTarget, onFloorChange }) {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [modelError, setModelError] = useState(false)

  // ─── Input State ───
  const [isLocked, setIsLocked] = useState(false)

  // ─── Mouse State (Pointer Lock) ───
  const inputState = useRef({
    isLocked: false
  })

  // ─── Player Reference ───
  const playerRef = useRef(null)

  // ─── Player State (Ref for persistence) ───
  const playerState = useRef({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    sprint: false,
    speed: 0.12,
    sprintMultiplier: 2,
    currentY: 0,
    targetY: 0
  })

  // ─── Handle Teleportation ───
  useEffect(() => {
    if (teleportTarget && playerRef.current) {
      const { x, y, z } = teleportTarget.coordinates
      playerRef.current.position.set(x, y, z)

      // Update physics state to prevent snapping back
      playerState.current.currentY = y
      playerState.current.targetY = y

      // Stop movement to ensure exact positioning
      playerState.current.moveForward = false
      playerState.current.moveBackward = false
      playerState.current.moveLeft = false
      playerState.current.moveRight = false
      playerState.current.sprint = false

      console.log(`Teleported to ${teleportTarget.name} at (${x}, ${y}, ${z})`)
    }
  }, [teleportTarget])

  useEffect(() => {
    if (!containerRef.current) return

    // ─── Core Variables ───
    let animationId
    let collidableMeshes = []

    // ─── Scene Setup ───
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x87CEEB)
    scene.fog = new THREE.Fog(0x87CEEB, 100, 500)

    // ─── Camera (Third Person) ───
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 100, 50)
    directionalLight.castShadow = false
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)
    scene.add(directionalLight.target)

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x7cba6d, 0.4)
    scene.add(hemiLight)

    // ─── Ground Plane (backup floor) ───
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x7cba6d,
      roughness: 0.9
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.1 // Slightly below 0
    ground.receiveShadow = true
    scene.add(ground)

    // ─── Create Player Character ───
    const player = new THREE.Group()
    playerRef.current = player // Store ref for teleportation

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.2, 0.5, 3, 7)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.5
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.55
    body.castShadow = true
    player.add(body)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd699,
      roughness: 0.6
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.1
    head.castShadow = true
    player.add(head)

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.06, 8, 8)
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.05, 1.15, 0.12)
    player.add(leftEye)
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.05, 1.15, 0.12)
    player.add(rightEye)

    // Direction indicator
    const indicatorGeometry = new THREE.ConeGeometry(0.08, 0.15, 8)
    const indicatorMaterial = new THREE.MeshStandardMaterial({ color: 0x22c55e })
    const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial)
    indicator.rotation.x = Math.PI / 2
    indicator.position.set(0, 0.55, 0.3)
    player.add(indicator)

    // Set initial position
    player.position.set(-70, 50, -4)
    scene.add(player)

    // ─── Player State ───
    // Using ref defined at top level to persist state
    // Reset state on building change
    playerState.current = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      sprint: false,
      speed: 0.12,
      sprintMultiplier: 2,
      currentY: 0,        // Current ground height
      targetY: 0          // Target ground height (for smooth transitions)
    }

    // ─── Camera Settings ───
    const cameraSettings = {
      distance: 2, // Closer to player
      height: 1, // Lower height (indoor friendly)
      smoothness: 0.1,
      rotationY: 0,
      rotationX: 0.2,
      minRotationX: -0.2,
      maxRotationX: 0.8,
    };

    // ─── Input State ───
    // MOVED TO TOP LEVEL

    // ─── Raycaster for Collision ───
    const raycaster = new THREE.Raycaster()

    // ─── Simple Wall Collision Check ───
    function checkWallCollision(position, direction, distance) {
      // Cast ray from player chest height
      const origin = new THREE.Vector3(
        position.x,
        position.y + 1.0, // Chest height
        position.z
      )

      raycaster.set(origin, direction.normalize())
      raycaster.far = distance

      const intersects = raycaster.intersectObjects(collidableMeshes, true)

      // Filter out floors (normals pointing up)
      for (const hit of intersects) {
        if (hit.face) {
          const normal = hit.face.normal.clone()
          // Transform normal to world space
          normal.transformDirection(hit.object.matrixWorld)
          // If normal is mostly horizontal, it's a wall
          if (Math.abs(normal.y) < 0.5) {
            return true // Wall hit
          }
        }
      }
      return false
    }

    // ─── Ground Height Detection ───
    function getGroundHeight(position) {
      // Cast ray downward from above player
      const origin = new THREE.Vector3(
        position.x,
        position.y + 5, // Start from above
        position.z
      )
      const direction = new THREE.Vector3(0, -1, 0)

      raycaster.set(origin, direction)
      raycaster.far = 10

      const intersects = raycaster.intersectObjects(collidableMeshes, true)

      if (intersects.length > 0) {
        // Find the highest floor below us (not ceiling above)
        for (const hit of intersects) {
          if (hit.point.y <= position.y + 1.5) { // Allow stepping up 1.5m max
            return hit.point.y
          }
        }
      }
      return 0 // Default ground
    }

    // ─── Load Building Model ───
    const loader = new GLTFLoader()
    const modelPath = `/models/${selectedBuilding}.glb`

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            collidableMeshes.push(child)
          }
        })

        // Position model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())

        model.position.x = -center.x
        model.position.z = -center.z
        model.position.y = -box.min.y // Place on ground

        scene.add(model)

        // Set player start position
        player.position.set(-15, 0, -4)
        playerState.current.currentY = 0
        playerState.current.targetY = 0

        setIsLoading(false)
        setModelError(false)
        console.log('Model loaded with', collidableMeshes.length, 'meshes')
      },
      (progress) => {
        if (progress.total > 0) {
          setLoadingProgress((progress.loaded / progress.total) * 100)
        }
      },
      (error) => {
        console.error('Error loading model:', error)
        setModelError(true)
        setIsLoading(false)

        // Create placeholder
        createPlaceholder()
      }
    )

    // ─── Placeholder Building ───
    function createPlaceholder() {
      const configs = [
        { pos: [0, 10, 0], size: [20, 20, 20], color: 0x7EC8E3 }
      ]
      configs.forEach(c => {
        const geo = new THREE.BoxGeometry(...c.size)
        const mat = new THREE.MeshStandardMaterial({ color: c.color })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(...c.pos)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
        collidableMeshes.push(mesh)
      })
    }

    // ─── Event Handlers ───
    const onClick = () => {
      if (!inputState.current.isLocked) {
        renderer.domElement.requestPointerLock()
      }
    }

    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === renderer.domElement
      inputState.current.isLocked = locked
      setIsLocked(locked)
    }

    const onMouseMove = (e) => {
      if (!inputState.current.isLocked) return

      const deltaX = e.movementX || 0
      const deltaY = e.movementY || 0

      cameraSettings.rotationY -= deltaX * 0.002
      cameraSettings.rotationX += deltaY * 0.002 // Natural look (Mouse Up -> Look Up)
      cameraSettings.rotationX = Math.max(
        cameraSettings.minRotationX,
        Math.min(cameraSettings.maxRotationX, cameraSettings.rotationX)
      )
    }

    const onWheel = (e) => {
      cameraSettings.distance += e.deltaY * 0.01
      cameraSettings.distance = Math.max(3, Math.min(15, cameraSettings.distance))
    }

    const onKeyDown = (e) => {
      // Block movement when typing in input fields
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Handle Control key for toggling cursor
      if (e.key === 'Control') {
        if (inputState.current.isLocked) {
          document.exitPointerLock()
        } else {
          renderer.domElement.requestPointerLock()
        }
        return
      }

      // Only allow movement if locked
      if (!inputState.current.isLocked) return

      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          playerState.current.moveForward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          playerState.current.moveBackward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          playerState.current.moveLeft = true;
          break;
        case "KeyD":
        case "ArrowRight":
          playerState.current.moveRight = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          playerState.current.sprint = true;
          break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': playerState.current.moveForward = false; break
        case 'KeyS': case 'ArrowDown': playerState.current.moveBackward = false; break
        case 'KeyA': case 'ArrowLeft': playerState.current.moveLeft = false; break
        case 'KeyD': case 'ArrowRight': playerState.current.moveRight = false; break
        case 'ShiftLeft': case 'ShiftRight': playerState.current.sprint = false; break
      }
    }

    // Add listeners
    // Add listeners
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    renderer.domElement.addEventListener('click', onClick)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: true })
    renderer.domElement.addEventListener('contextmenu', e => e.preventDefault())

    // ─── Animation Loop ───
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // ─── Calculate Movement Direction ───
      const moveDirection = new THREE.Vector3()

      const forward = new THREE.Vector3(
        -Math.sin(cameraSettings.rotationY),
        0,
        -Math.cos(cameraSettings.rotationY)
      )

      const right = new THREE.Vector3(
        Math.cos(cameraSettings.rotationY),
        0,
        -Math.sin(cameraSettings.rotationY)
      )

      if (playerState.current.moveForward) moveDirection.add(forward)
      if (playerState.current.moveBackward) moveDirection.sub(forward)
      if (playerState.current.moveLeft) moveDirection.sub(right)
      if (playerState.current.moveRight) moveDirection.add(right)

      // ─── Apply Movement with Collision ───
      if (moveDirection.length() > 0) {
        moveDirection.normalize()

        const speed = playerState.current.sprint
          ? playerState.current.speed * playerState.current.sprintMultiplier
          : playerState.current.speed

        const collisionDist = 0.6

        // Check X movement
        const dirX = new THREE.Vector3(moveDirection.x, 0, 0).normalize()
        if (moveDirection.x !== 0 && !checkWallCollision(player.position, dirX, collisionDist)) {
          player.position.x += moveDirection.x * speed
        }

        // Check Z movement
        const dirZ = new THREE.Vector3(0, 0, moveDirection.z).normalize()
        if (moveDirection.z !== 0 && !checkWallCollision(player.position, dirZ, collisionDist)) {
          player.position.z += moveDirection.z * speed
        }

        // Rotate player to face movement direction
        const targetRotation = Math.atan2(moveDirection.x, moveDirection.z)
        let rotDiff = targetRotation - player.rotation.y
        while (rotDiff > Math.PI) rotDiff -= Math.PI * 2
        while (rotDiff < -Math.PI) rotDiff += Math.PI * 2
        player.rotation.y += rotDiff * 0.15
      }

      // ─── Ground Detection (Simplified) ───
      if (collidableMeshes.length > 0) {
        const groundY = getGroundHeight(player.position)
        playerState.current.targetY = groundY

        // Smooth height transition (prevents flying)
        const heightDiff = playerState.current.targetY - playerState.current.currentY

        // Only allow gradual changes (max 0.3 per frame for stairs)
        if (Math.abs(heightDiff) < 2) {
          playerState.current.currentY += heightDiff * 0.15
        }

        player.position.y = playerState.current.currentY

        // ─── Update Floor UI ───
        // Calculate floor based on height (approx 4 units per floor)
        // Floor 1 = Ground (y=0 to y=3.49)
        // Floor 2 = First (y=3.5 to y=7.49) (Threshold y=3.5)
        // Adjusted to 4 units per floor based on user feedback
        const detectedFloor = Math.max(1, Math.floor((player.position.y + 0.5) / 4) + 1)

        // We can use a ref to throttle this update so we don't spam the parent
        if (playerRef.current.detectedFloor !== detectedFloor) {
          playerRef.current.detectedFloor = detectedFloor
          onFloorChange?.(detectedFloor)
          console.log(`Floor changed to ${detectedFloor}`)
        }
      }

      // ─── Update Camera ───
      const cameraOffset = new THREE.Vector3(
        Math.sin(cameraSettings.rotationY) * cameraSettings.distance,
        cameraSettings.height + cameraSettings.rotationX * 2,
        Math.cos(cameraSettings.rotationY) * cameraSettings.distance
      )

      const cameraTarget = new THREE.Vector3(
        player.position.x,
        player.position.y + 0.5, // Lower target for smaller character
        player.position.z,
      );

      camera.position.lerp(cameraTarget.clone().add(cameraOffset), cameraSettings.smoothness)
      camera.lookAt(cameraTarget)

      // Update light
      directionalLight.position.set(
        player.position.x + 30,
        50,
        player.position.z + 30
      )
      directionalLight.target.position.copy(player.position)

      renderer.render(scene, camera)
    }
    animate()

    // ─── Handle Resize ───
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ─── Cleanup ───
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', onClick)
        renderer.domElement.removeEventListener('mousemove', onMouseMove)
        renderer.domElement.removeEventListener('wheel', onWheel)
        renderer.domElement.removeEventListener('contextmenu', e => e.preventDefault())
      }
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [selectedBuilding])

  return (
    <>
      <div ref={containerRef} className="game-canvas" />

      {isLoading && (
        <div className="model-loading-overlay">
          <div className="model-loading-content">
            <div className="model-loading-spinner"></div>
            <p>Loading {selectedBuilding?.replace('-', ' ').toUpperCase() || 'Building'}...</p>
            <div className="model-loading-bar">
              <div className="model-loading-fill" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <span className="model-loading-percent">{loadingProgress.toFixed(0)}%</span>
          </div>
        </div>
      )}

      {modelError && !isLoading && (
        <div className="model-error-toast">
          <span>⚠️ Model not found. Using placeholder.</span>
        </div>
      )}
    </>
  )
}

export default GameCanvas
