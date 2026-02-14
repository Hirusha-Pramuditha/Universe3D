import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function GameCanvas({ selectedBuilding }) {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [modelError, setModelError] = useState(false)

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
    directionalLight.castShadow = true
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
    player.position.set(30, 0, 30)
    scene.add(player)

    // ─── Player State ───
    const playerState = {
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

    // ─── Mouse State ───
    let isMouseDown = false
    let lastMouseX = 0
    let lastMouseY = 0

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
        player.position.set(-11.5293, -1.81704, -6.13487)
        playerState.currentY = 0
        playerState.targetY = 0

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
    const onMouseDown = (e) => {
      isMouseDown = true
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      renderer.domElement.style.cursor = 'grabbing'
    }

    const onMouseUp = () => {
      isMouseDown = false
      renderer.domElement.style.cursor = 'grab'
    }

    const onMouseMove = (e) => {
      if (!isMouseDown) return
      
      const deltaX = e.clientX - lastMouseX
      const deltaY = e.clientY - lastMouseY
      lastMouseX = e.clientX
      lastMouseY = e.clientY

      cameraSettings.rotationY -= deltaX * 0.005
      cameraSettings.rotationX += deltaY * 0.005
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

      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          playerState.moveForward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          playerState.moveBackward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          playerState.moveLeft = true;
          break;
        case "KeyD":
        case "ArrowRight":
          playerState.moveRight = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          playerState.sprint = true;
          break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': playerState.moveForward = false; break
        case 'KeyS': case 'ArrowDown': playerState.moveBackward = false; break
        case 'KeyA': case 'ArrowLeft': playerState.moveLeft = false; break
        case 'KeyD': case 'ArrowRight': playerState.moveRight = false; break
        case 'ShiftLeft': case 'ShiftRight': playerState.sprint = false; break
      }
    }

    // Add listeners
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('mouseleave', onMouseUp)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: true })
    renderer.domElement.addEventListener('contextmenu', e => e.preventDefault())
    renderer.domElement.style.cursor = 'grab'

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

      if (playerState.moveForward) moveDirection.add(forward)
      if (playerState.moveBackward) moveDirection.sub(forward)
      if (playerState.moveLeft) moveDirection.sub(right)
      if (playerState.moveRight) moveDirection.add(right)

      // ─── Apply Movement with Collision ───
      if (moveDirection.length() > 0) {
        moveDirection.normalize()
        
        const speed = playerState.sprint 
          ? playerState.speed * playerState.sprintMultiplier 
          : playerState.speed

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
        playerState.targetY = groundY
        
        // Smooth height transition (prevents flying)
        const heightDiff = playerState.targetY - playerState.currentY
        
        // Only allow gradual changes (max 0.3 per frame for stairs)
        if (Math.abs(heightDiff) < 2) {
          playerState.currentY += heightDiff * 0.15
        }
        
        player.position.y = playerState.currentY
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
      renderer.domElement.removeEventListener('mousedown', onMouseDown)
      renderer.domElement.removeEventListener('mouseup', onMouseUp)
      renderer.domElement.removeEventListener('mouseleave', onMouseUp)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
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
