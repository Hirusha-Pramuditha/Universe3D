import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function GameCanvas({ selectedBuilding }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const animationIdRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [modelError, setModelError] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Cleanup previous scene if exists
    if (rendererRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      rendererRef.current.dispose()
      if (containerRef.current.contains(rendererRef.current.domElement)) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
    }

    // ─── Scene Setup ───
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x87CEEB) // Sky blue
    scene.fog = new THREE.Fog(0x87CEEB, 100, 500)
    sceneRef.current = scene

    // ─── Camera ───
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 30, 80)
    cameraRef.current = camera

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(50, 100, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 300
    directionalLight.shadow.camera.left = -150
    directionalLight.shadow.camera.right = 150
    directionalLight.shadow.camera.top = 150
    directionalLight.shadow.camera.bottom = -150
    directionalLight.shadow.mapSize.width = 4096
    directionalLight.shadow.mapSize.height = 4096
    scene.add(directionalLight)

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x90EE90, 0.4)
    scene.add(hemiLight)

    // ─── Ground Plane ───
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7cba6d,
      roughness: 0.9
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // ─── Grid Helper (optional, for debugging) ───
    const gridHelper = new THREE.GridHelper(200, 50, 0x4A9FD4, 0x7EC8E3)
    gridHelper.position.y = 0.05
    gridHelper.material.opacity = 0.3
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // ─── Load Building Model ───
    const loader = new GLTFLoader()
    const modelPath = `/models/${selectedBuilding}.glb`

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene
        
        // Enable shadows for all meshes
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        // Center and position the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        model.position.x = -center.x
        model.position.z = -center.z
        model.position.y = 0

        scene.add(model)
        
        // Position camera based on model size
        const maxDim = Math.max(size.x, size.y, size.z)
        camera.position.set(maxDim * 0.8, maxDim * 0.5, maxDim * 0.8)
        camera.lookAt(0, size.y / 3, 0)

        setIsLoading(false)
        setModelError(false)
        console.log('Model loaded:', selectedBuilding)
      },
      (progress) => {
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total) * 100
          setLoadingProgress(percent)
        }
      },
      (error) => {
        console.error('Error loading model:', error)
        setModelError(true)
        setIsLoading(false)
        
        // Create placeholder building if model fails to load
        createPlaceholderBuilding(scene)
      }
    )

    // ─── Placeholder Building (fallback) ───
    function createPlaceholderBuilding(scene) {
      const buildingConfigs = [
        { pos: [-10, 0, -10], size: [6, 12, 6], color: 0x4A9FD4 },
        { pos: [10, 0, -10], size: [8, 18, 8], color: 0x5BA8DC },
        { pos: [-10, 0, 10], size: [5, 8, 5], color: 0x58A4D4 },
        { pos: [10, 0, 10], size: [6, 10, 6], color: 0x4A9FD4 },
        { pos: [0, 0, 0], size: [10, 20, 10], color: 0x7EC8E3 }
      ]

      buildingConfigs.forEach((config) => {
        const geometry = new THREE.BoxGeometry(...config.size)
        const material = new THREE.MeshStandardMaterial({
          color: config.color,
          roughness: 0.3,
          metalness: 0.1
        })
        const building = new THREE.Mesh(geometry, material)
        building.position.set(config.pos[0], config.size[1] / 2, config.pos[2])
        building.castShadow = true
        building.receiveShadow = true
        scene.add(building)
      })
    }

    // ─── Drone Controls State ───
    const droneState = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      moveUp: false,
      moveDown: false,
      speed: 0.8,
      rotationSpeed: 0.02
    }

    // Mouse look state
    let isMouseDown = false
    let mouseX = 0
    let mouseY = 0
    const euler = new THREE.Euler(0, 0, 0, 'YXZ')

    // ─── Event Handlers ───
    const onMouseDown = (e) => {
      isMouseDown = true
      mouseX = e.clientX
      mouseY = e.clientY
      renderer.domElement.style.cursor = 'grabbing'
    }

    const onMouseUp = () => {
      isMouseDown = false
      renderer.domElement.style.cursor = 'grab'
    }

    const onMouseMove = (e) => {
      if (!isMouseDown) return

      const deltaX = e.clientX - mouseX
      const deltaY = e.clientY - mouseY
      mouseX = e.clientX
      mouseY = e.clientY

      euler.setFromQuaternion(camera.quaternion)
      euler.y -= deltaX * 0.003
      euler.x -= deltaY * 0.003
      euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x))
      camera.quaternion.setFromEuler(euler)
    }

    const onKeyDown = (e) => {
      // Prevent default for game controls
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ShiftRight', 'KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }
      
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          droneState.moveForward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          droneState.moveBackward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          droneState.moveLeft = true
          break
        case 'KeyD':
        case 'ArrowRight':
          droneState.moveRight = true
          break
        case 'Space':
          droneState.moveUp = true
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          droneState.moveDown = true
          break
        case 'KeyQ':
          euler.setFromQuaternion(camera.quaternion)
          euler.y += droneState.rotationSpeed * 2
          camera.quaternion.setFromEuler(euler)
          break
        case 'KeyE':
          euler.setFromQuaternion(camera.quaternion)
          euler.y -= droneState.rotationSpeed * 2
          camera.quaternion.setFromEuler(euler)
          break
      }
    }

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          droneState.moveForward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          droneState.moveBackward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          droneState.moveLeft = false
          break
        case 'KeyD':
        case 'ArrowRight':
          droneState.moveRight = false
          break
        case 'Space':
          droneState.moveUp = false
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          droneState.moveDown = false
          break
      }
    }

    const onWheel = (e) => {
      droneState.speed = Math.max(0.2, Math.min(3, droneState.speed - e.deltaY * 0.001))
    }

    const onContextMenu = (e) => e.preventDefault()

    // Add event listeners
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('mouseleave', onMouseUp)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: true })
    renderer.domElement.addEventListener('contextmenu', onContextMenu)
    renderer.domElement.style.cursor = 'grab'

    // ─── Animation Loop ───
    const direction = new THREE.Vector3()
    const right = new THREE.Vector3()

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Get camera direction
      camera.getWorldDirection(direction)
      right.crossVectors(camera.up, direction).normalize().negate()

      // Apply drone movement
      if (droneState.moveForward) {
        camera.position.addScaledVector(direction, droneState.speed)
      }
      if (droneState.moveBackward) {
        camera.position.addScaledVector(direction, -droneState.speed)
      }
      if (droneState.moveLeft) {
        camera.position.addScaledVector(right, -droneState.speed)
      }
      if (droneState.moveRight) {
        camera.position.addScaledVector(right, droneState.speed)
      }
      if (droneState.moveUp) {
        camera.position.y += droneState.speed
      }
      if (droneState.moveDown) {
        camera.position.y = Math.max(2, camera.position.y - droneState.speed)
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
      cancelAnimationFrame(animationIdRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      renderer.domElement.removeEventListener('mousedown', onMouseDown)
      renderer.domElement.removeEventListener('mouseup', onMouseUp)
      renderer.domElement.removeEventListener('mouseleave', onMouseUp)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('wheel', onWheel)
      renderer.domElement.removeEventListener('contextmenu', onContextMenu)
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [selectedBuilding])

  return (
    <>
      <div ref={containerRef} className="game-canvas" />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="model-loading-overlay">
          <div className="model-loading-content">
            <div className="model-loading-spinner"></div>
            <p>Loading {selectedBuilding ? selectedBuilding.replace('-', ' ').toUpperCase() : 'Building'}...</p>
            <div className="model-loading-bar">
              <div 
                className="model-loading-fill" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="model-loading-percent">{loadingProgress.toFixed(0)}%</span>
          </div>
        </div>
      )}

      {/* Error message if model failed */}
      {modelError && !isLoading && (
        <div className="model-error-toast">
          <span>⚠️ Model not found. Using placeholder.</span>
        </div>
      )}
    </>
  )
}

export default GameCanvas
