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

      // ─── Core Variables ───
      let animationId
      let collidableMeshes = []
      let mixer = null
      let animations = {}
      let currentAction = null
      const clock = new THREE.Clock()

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
        distance: 1.85,
        height: 1.3,
        smoothness: 0.5,
        rotationY: 0,
        rotationX: 0.1,
        minRotationX: -0.4,
        maxRotationX: 0.4,
      }

      // ─── Raycaster for Collision ───
      const raycaster = new THREE.Raycaster()

      // ─── Simple Wall Collision Check ───
      function checkWallCollision(position, direction, distance) {
        const origin = new THREE.Vector3(
          position.x,
          position.y + 1.0,
          position.z
        )

        raycaster.set(origin, direction.normalize())
        raycaster.far = distance

        const intersects = raycaster.intersectObjects(collidableMeshes, true)

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

      // ─── Ground Height Detection ───
      function getGroundHeight(position) {
        const origin = new THREE.Vector3(
          position.x,
          position.y + 5,
          position.z
        )
        const direction = new THREE.Vector3(0, -1, 0)

        raycaster.set(origin, direction)
        raycaster.far = 10

        const intersects = raycaster.intersectObjects(collidableMeshes, true)

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
              } else if (clipName.includes('ascend') || clipName.includes('stair') || clipName.includes('climb')) {
                animations['stairs'] = action
              } else if (clipName.includes('turnleft') || clipName.includes('turn_left') || clipName.includes('left')) {
                animations['turnLeft'] = action
              } else if (clipName.includes('turnright') || clipName.includes('turn_right') || clipName.includes('right')) {
                animations['turnRight'] = action
              }

              // Also store by exact name
              animations[clip.name] = action
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
              collidableMeshes.push(child)
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
          if (isClimbingStairs && animations['stairs']) {
            playAnimation('stairs')
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
          const detectedFloor = Math.max(0, Math.floor((player.position.y + 0.5 ) / 4) + 1)

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

      // ─── Camera Collision Detection ───
      // Cast ray from player to ideal camera position
      const rayDirection = idealPosition.clone().sub(cameraTarget).normalize()
      const rayDistance = idealPosition.distanceTo(cameraTarget)
      
      raycaster.set(cameraTarget, rayDirection)
      raycaster.far = rayDistance
      
      const cameraHits = raycaster.intersectObjects(collidableMeshes, true)
      
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