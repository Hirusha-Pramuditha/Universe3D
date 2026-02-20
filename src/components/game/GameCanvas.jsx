import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
import '../../styles/GameCanvas.css'
import MissionInfoModal from './MissionInfoModal'
import MissionQuizModal from './MissionQuizModal'

// Patch Three.js to use BVH-accelerated raycasting (massive speedup for complex meshes)
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

function GameCanvas({ selectedBuilding, teleportTarget, onFloorChange, missions, setMissions }) {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [modelError, setModelError] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [currentMission, setCurrentMission] = useState(null)
  const [missionCubes, setMissionCubes] = useState([])
  const [interactionTarget, setInteractionTarget] = useState(null)

  // Refs for scene and mission cubes (accessible outside useEffect)
  const sceneRef = useRef(null)
  const cubesRef = useRef([])

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

      playerState.current.currentY = y
      playerState.current.targetY = y

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

    // ─── Create mission collectible (Exclamation Mark) ───
    // ─── Create mission collectible (Exclamation Mark) ───
    const createMissionCubes = (scene) => {
      const cubeRefs = []

      // Reuse geometry and material for better performance
      const lineGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15)
      const dotGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15)
      const material = new THREE.MeshStandardMaterial({
        color: 0x00BFFF,
        emissive: 0x00BFFF,
        emissiveIntensity: 1.5, // Increased intensity since we removed the light
        metalness: 0.8,
        roughness: 0.2
      })

      missions.forEach((mission) => {
        const markGroup = new THREE.Group()
        markGroup.position.set(
          mission.coordinates.x,
          mission.coordinates.y,
          mission.coordinates.z
        )

        const line = new THREE.Mesh(lineGeometry, material)
        line.position.y = 0.5
        // Disable shadow casting for performance
        line.castShadow = false
        markGroup.add(line)

        const dot = new THREE.Mesh(dotGeometry, material)
        dot.position.y = 0
        dot.castShadow = false
        markGroup.add(dot)

        // Removed PointLight to fix lag - emissive material is enough

        markGroup.userData = { missionId: mission.id }
        scene.add(markGroup)
        cubeRefs.push({ mesh: markGroup, mission })
      })
      return cubeRefs
    }

    // ─── Core Variables ───
    let animationId
    let collidableMeshes = []
    let mixer = null
    let animations = {}
    let currentAction = null
    const clock = new THREE.Clock()

    // ─── Spatial Grid for Collision Optimization ───
    // Instead of raycasting against ALL meshes, we only check nearby ones
    const GRID_CELL_SIZE = 10
    const spatialGrid = new Map()

    function getCellKey(x, z) {
      const cx = Math.floor(x / GRID_CELL_SIZE)
      const cz = Math.floor(z / GRID_CELL_SIZE)
      return `${cx},${cz}`
    }

    function addMeshToGrid(mesh) {
      // Get mesh world bounding box
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
      const box = new THREE.Box3().setFromObject(mesh)

      const minCX = Math.floor(box.min.x / GRID_CELL_SIZE)
      const maxCX = Math.floor(box.max.x / GRID_CELL_SIZE)
      const minCZ = Math.floor(box.min.z / GRID_CELL_SIZE)
      const maxCZ = Math.floor(box.max.z / GRID_CELL_SIZE)

      for (let cx = minCX; cx <= maxCX; cx++) {
        for (let cz = minCZ; cz <= maxCZ; cz++) {
          const key = `${cx},${cz}`
          if (!spatialGrid.has(key)) spatialGrid.set(key, [])
          spatialGrid.get(key).push(mesh)
        }
      }
    }

    function getNearbyMeshes(position) {
      const cx = Math.floor(position.x / GRID_CELL_SIZE)
      const cz = Math.floor(position.z / GRID_CELL_SIZE)
      const nearby = []
      // Check 3x3 grid around player
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          const key = `${cx + dx},${cz + dz}`
          const cell = spatialGrid.get(key)
          if (cell) {
            for (const mesh of cell) {
              if (!nearby.includes(mesh)) nearby.push(mesh)
            }
          }
        }
      }
      return nearby
    }

    // ─── Scene Setup ───
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x87CEEB)
    scene.fog = new THREE.Fog(0x87CEEB, 100, 500)

    // ─── Camera (Third Person) ───
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // ─── Renderer (Shadows Disabled) ───
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false // Shadows disabled
    containerRef.current.appendChild(renderer.domElement)

    // ─── Lighting (No shadows) ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(50, 100, 50)
    directionalLight.castShadow = false
    scene.add(directionalLight)

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x7cba6d, 0.5)
    scene.add(hemiLight)

    // ─── Ground Plane (backup floor) ───
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x7cba6d,
      roughness: 0.9
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.1
    scene.add(ground)

    // ─── Create Player Group ───
    const player = new THREE.Group()
    playerRef.current = player
    player.position.set(-70, 50, -4)
    scene.add(player)

    // ─── Player State ───
    playerState.current = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      sprint: false,
      speed: 0.06,
      sprintMultiplier: 2.5,
      currentY: 0,
      targetY: 0,
      isOnStairs: false
    }

    // ─── Camera Settings ───
    const cameraSettings = {
      distance: 1.9,
      height: 1.3,
      smoothness: 0.5,
      rotationY: 0,
      rotationX: 0.1,
      minRotationX: -0.4,
      maxRotationX: 0.4,
    }

    // ─── Raycaster for Collision ───
    const raycaster = new THREE.Raycaster()

    // ─── Simple Wall Collision Check (OPTIMIZED: uses spatial grid) ───
    function checkWallCollision(position, direction, distance) {
      const origin = new THREE.Vector3(
        position.x,
        position.y + 1.0,
        position.z
      )

      raycaster.set(origin, direction.normalize())
      raycaster.far = distance

      // Only check NEARBY meshes instead of ALL meshes
      const nearby = getNearbyMeshes(position)
      const intersects = raycaster.intersectObjects(nearby, false)

      for (const hit of intersects) {
        if (hit.face) {
          const normal = hit.face.normal.clone()
          normal.transformDirection(hit.object.matrixWorld)
          if (Math.abs(normal.y) < 0.5) {
            return true
          }
        }
      }
      return false
    }

    // ─── Ground Height Detection (OPTIMIZED: uses spatial grid) ───
    function getGroundHeight(position) {
      const origin = new THREE.Vector3(
        position.x,
        position.y + 5,
        position.z
      )
      const direction = new THREE.Vector3(0, -1, 0)

      raycaster.set(origin, direction)
      raycaster.far = 10

      // Only check NEARBY meshes instead of ALL meshes
      const nearby = getNearbyMeshes(position)
      const intersects = raycaster.intersectObjects(nearby, false)

      if (intersects.length > 0) {
        for (const hit of intersects) {
          if (hit.point.y <= position.y + 1.5) {
            return hit.point.y
          }
        }
      }
      return 0
    }

    // ─── Animation Helper: Switch Animation ───
    function playAnimation(name, fadeTime = 0.2) {
      const newAction = animations[name]
      if (!newAction || newAction === currentAction) return

      if (currentAction) {
        currentAction.fadeOut(fadeTime)
      }

      newAction.reset()
      newAction.fadeIn(fadeTime)
      newAction.play()
      currentAction = newAction
    }

    // ─── Load Character Model ───
    const characterLoader = new GLTFLoader()
    const characterPath = '/models/player.glb'

    characterLoader.load(
      characterPath,
      (gltf) => {
        const character = gltf.scene

        // Scale character if needed
        character.scale.set(1, 1, 1)
        character.position.set(0, 0, 0)

        // Disable shadows on character
        character.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        player.add(character)

        // ─── Setup Animation Mixer ───
        if (gltf.animations && gltf.animations.length > 0) {

          // ─── FIX ROOT MOTION: Remove position tracks from animations ───
          gltf.animations.forEach((clip) => {
            clip.tracks = clip.tracks.filter(track => {
              // Remove position tracks for root/hip bones (keeps character in place)
              const isRootPosition =
                (track.name.toLowerCase().includes('hips') ||
                  track.name.toLowerCase().includes('root') ||
                  track.name.toLowerCase().includes('armature')) &&
                track.name.toLowerCase().includes('position')
              return !isRootPosition
            })
          })

          mixer = new THREE.AnimationMixer(character)

          console.log('Available animations:')
          gltf.animations.forEach((clip, index) => {
            console.log(`  ${index}: ${clip.name}`)

            const clipName = clip.name.toLowerCase()
            const action = mixer.clipAction(clip)


            // Map animation names
            if (clipName.includes('idle')) {
              animations['idle'] = action
            } else if (clipName.includes('run')) {
              animations['run'] = action
            } else if (clipName.includes('walk')) {
              animations['walk'] = action
            } else if (clipName.includes('ascend')) {
              animations['ascend'] = action
            }
          })

          // Start with idle
          if (animations['idle']) {
            animations['idle'].play()
            currentAction = animations['idle']
          }

          console.log('Mapped animations:', Object.keys(animations))
        }

        console.log('Character loaded successfully')
      },
      (progress) => {
        console.log('Loading character:', (progress.loaded / progress.total * 100).toFixed(0) + '%')
      },
      (error) => {
        console.error('Error loading character:', error)
        createPlaceholderCharacter()
      }
    )

    // ─── Placeholder Character (fallback) ───
    function createPlaceholderCharacter() {
      const bodyGeometry = new THREE.CapsuleGeometry(0.2, 0.5, 3, 7)
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.5
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.position.y = 0.55
      player.add(body)

      const headGeometry = new THREE.SphereGeometry(0.15, 16, 16)
      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd699,
        roughness: 0.6
      })
      const head = new THREE.Mesh(headGeometry, headMaterial)
      head.position.y = 1.1
      player.add(head)

      const eyeGeometry = new THREE.SphereGeometry(0.06, 8, 8)
      const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
      leftEye.position.set(-0.05, 1.15, 0.12)
      player.add(leftEye)
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
      rightEye.position.set(0.05, 1.15, 0.12)
      player.add(rightEye)

      const indicatorGeometry = new THREE.ConeGeometry(0.08, 0.15, 8)
      const indicatorMaterial = new THREE.MeshStandardMaterial({ color: 0x22c55e })
      const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial)
      indicator.rotation.x = Math.PI / 2
      indicator.position.set(0, 0.55, 0.3)
      player.add(indicator)
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
            child.castShadow = false
            child.receiveShadow = false
            // Build BVH for each mesh geometry (dramatically speeds up raycasting)
            if (child.geometry) {
              child.geometry.computeBoundsTree()
            }
            collidableMeshes.push(child)
            // Add each mesh to the spatial grid for fast lookup
            addMeshToGrid(child)
          }
        })

        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())

        model.position.x = -center.x
        model.position.z = -center.z
        model.position.y = -box.min.y

        scene.add(model)

        player.position.set(-15, 0, -4)
        playerState.current.currentY = 0
        playerState.current.targetY = 0

        setIsLoading(false)
        setModelError(false)
        console.log('Building loaded with', collidableMeshes.length, 'meshes')
        console.log('Spatial grid cells:', spatialGrid.size)

        // Create mission cubes after building loads
        const cubes = createMissionCubes(scene)
        setMissionCubes(cubes)
        cubesRef.current = cubes
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
      }
    )

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
      cameraSettings.rotationX += deltaY * 0.002
      cameraSettings.rotationX = Math.max(
        cameraSettings.minRotationX,
        Math.min(cameraSettings.maxRotationX, cameraSettings.rotationX)
      )
    }

    const onWheel = (e) => {
      cameraSettings.distance += e.deltaY * 0.01
      cameraSettings.distance = Math.max(2, Math.min(10, cameraSettings.distance))
    }

    const onKeyDown = (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return
      }

      if (e.key === 'Control') {
        if (inputState.current.isLocked) {
          document.exitPointerLock()
        } else {
          renderer.domElement.requestPointerLock()
        }
        return
      }

      if (!inputState.current.isLocked) return

      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          playerState.current.moveForward = true
          break
        case "KeyS":
        case "ArrowDown":
          playerState.current.moveBackward = true
          break
        case "KeyA":
        case "ArrowLeft":
          playerState.current.moveLeft = true
          break
        case "KeyD":
        case "ArrowRight":
          playerState.current.moveRight = true
          break
        case "ShiftLeft":
        case "ShiftRight":
          playerState.current.sprint = true
          break
        case "KeyE":
          if (playerRef.current.interactionMissionId) {
            const targetIndex = cubesRef.current.findIndex(c => c.mission.id === playerRef.current.interactionMissionId)
            if (targetIndex !== -1) {
              const { mesh, mission } = cubesRef.current[targetIndex]
              mesh.visible = false
              setTimeout(() => { if (mesh) mesh.visible = true }, 3000)
              document.exitPointerLock()
              setCurrentMission(mission)
              setShowInfoModal(true)
              setInteractionTarget(null)
              playerRef.current.interactionMissionId = null
            }
          }
          break
      }
    }

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

      // Update animation mixer
      const delta = clock.getDelta()
      if (mixer) {
        mixer.update(delta)
      }

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

      // ─── Determine Animation State ───
      const isMoving = moveDirection.length() > 0
      const isSprinting = playerState.current.sprint && isMoving

      // Detect if climbing stairs (height changing while moving)
      const heightDiff = playerState.current.targetY - playerState.current.currentY
      const isClimbingStairs = isMoving && heightDiff > 0.1

      // ─── Play Appropriate Animation ───
      if (mixer && Object.keys(animations).length > 0) {
        if (isClimbingStairs && animations['ascend']) {
          playAnimation('ascend')
        } else if (isSprinting && animations['run']) {
          playAnimation('run')
        } else if (isMoving && animations['walk']) {
          playAnimation('walk')
        } else if (!isMoving) {
          playAnimation('idle')
        }
      }

      // ─── Apply Movement with Collision ───
      if (isMoving) {
        moveDirection.normalize()

        const speed = playerState.current.sprint
          ? playerState.current.speed * playerState.current.sprintMultiplier
          : playerState.current.speed

        const collisionDist = 0.6

        const dirX = new THREE.Vector3(moveDirection.x, 0, 0).normalize()
        if (moveDirection.x !== 0 && !checkWallCollision(player.position, dirX, collisionDist)) {
          player.position.x += moveDirection.x * speed
        }

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

      // ─── Ground Detection ───
      if (collidableMeshes.length > 0) {
        const groundY = getGroundHeight(player.position)
        playerState.current.targetY = groundY

        const heightDiff = playerState.current.targetY - playerState.current.currentY

        if (Math.abs(heightDiff) < 2) {
          playerState.current.currentY += heightDiff * 0.15
        }

        player.position.y = playerState.current.currentY

        // ─── Update Floor UI ───
        const detectedFloor = Math.max(0, Math.floor((player.position.y + 0.5) / 4) + 1)

        if (playerRef.current.detectedFloor !== detectedFloor) {
          playerRef.current.detectedFloor = detectedFloor
          onFloorChange?.(detectedFloor)
        }
      }

      // ─── Update Camera with Collision ───
      const cameraTarget = new THREE.Vector3(
        player.position.x,
        player.position.y + 1.2,
        player.position.z
      )

      // Calculate ideal camera position
      const idealOffset = new THREE.Vector3(
        Math.sin(cameraSettings.rotationY) * cameraSettings.distance,
        cameraSettings.height + cameraSettings.rotationX * 2,
        Math.cos(cameraSettings.rotationY) * cameraSettings.distance
      )
      const idealPosition = cameraTarget.clone().add(idealOffset)

      // ─── Camera Collision Detection (OPTIMIZED: uses nearby meshes) ───
      const rayDirection = idealPosition.clone().sub(cameraTarget).normalize()
      const rayDistance = idealPosition.distanceTo(cameraTarget)

      raycaster.set(cameraTarget, rayDirection)
      raycaster.far = rayDistance

      const nearby = getNearbyMeshes(player.position)
      const cameraHits = raycaster.intersectObjects(nearby, false)

      let finalCameraPosition = idealPosition.clone()

      if (cameraHits.length > 0) {
        // Camera would hit something - pull it closer
        const hitDistance = cameraHits[0].distance
        const safeDistance = Math.max(0.5, hitDistance - 0.3) // Keep 0.3 units away from wall

        // Calculate new position at safe distance
        finalCameraPosition = cameraTarget.clone().add(
          rayDirection.multiplyScalar(safeDistance)
        )
      }

      // Smooth camera movement
      camera.position.lerp(finalCameraPosition, cameraSettings.smoothness)
      camera.lookAt(cameraTarget)

      // Update light position (no shadows)
      directionalLight.position.set(
        player.position.x + 30,
        50,
        player.position.z + 30
      )

      // ─── Animate mission cubes (rotation and floating) ───
      const time = Date.now() * 0.001
      cubesRef.current.forEach(({ mesh }) => {
        if (mesh) {
          mesh.rotation.y = time
          if (mesh.userData.initialY === undefined) mesh.userData.initialY = mesh.position.y
          mesh.position.y = mesh.userData.initialY + Math.sin(time * 2) * 0.2
        }
      })

      // ─── Check for mission cube proximity (manual interaction) ───
      if (playerRef.current && inputState.current.isLocked) {
        let foundTarget = null
        cubesRef.current.forEach(({ mesh, mission }) => {
          if (!mesh || !mesh.visible) return
          const distance = playerRef.current.position.distanceTo(mesh.position)
          if (distance < 2) {
            foundTarget = { mesh, mission }
          }
        })
        if (playerRef.current.interactionMissionId !== (foundTarget?.mission.id || null)) {
          playerRef.current.interactionMissionId = foundTarget?.mission.id || null
          setInteractionTarget(foundTarget)
        }
      }

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
      }
      if (mixer) {
        mixer.stopAllAction()
      }
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [selectedBuilding]) // Note: we don't depend on missions here to avoid re-creating scene on completion

  const handleInfoContinue = () => {
    setShowInfoModal(false)
    setShowQuizModal(true)
  }

  const handleQuizComplete = (passed) => {
    setShowQuizModal(false)
    if (passed) {
      setMissions(prevMissions =>
        prevMissions.map(m =>
          m.id === currentMission.id ? { ...m, completed: true } : m
        )
      )
    }
    setCurrentMission(null)
  }

  const handleModalClose = () => {
    setShowInfoModal(false)
    setShowQuizModal(false)
    setCurrentMission(null)
  }

  return (
    <>
      <div ref={containerRef} className="game-canvas" />

      {showInfoModal && currentMission && (
        <MissionInfoModal
          mission={currentMission}
          onContinue={handleInfoContinue}
          onClose={handleModalClose}
        />
      )}

      {/* Interaction Prompt */}
      {interactionTarget && !showInfoModal && !showQuizModal && (
        <div className="interaction-prompt">
          <div className="key-hint">E</div>
          <span>Interact with {interactionTarget.mission.title}</span>
        </div>
      )}

      {showQuizModal && currentMission && (
        <MissionQuizModal
          mission={currentMission}
          onComplete={handleQuizComplete}
          onClose={handleModalClose}
        />
      )}

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