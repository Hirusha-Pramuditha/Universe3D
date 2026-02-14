import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function GameCanvas() {
  const containerRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!containerRef.current || isInitialized) return
    setIsInitialized(true)

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x87CEEB) // Sky blue background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 20, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 100
    directionalLight.shadow.camera.left = -30
    directionalLight.shadow.camera.right = 30
    directionalLight.shadow.camera.top = 30
    directionalLight.shadow.camera.bottom = -30
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x90EE90, // Light green grass
      roughness: 0.8
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 50, 0x4A9FD4, 0x7EC8E3)
    gridHelper.position.y = 0.01
    scene.add(gridHelper)

    // Placeholder buildings - styled like the loading screen
    const buildings = []
    const buildingConfigs = [
      { pos: [-10, 0, -10], size: [6, 12, 6], color: 0x4A9FD4 },
      { pos: [10, 0, -10], size: [8, 18, 8], color: 0x5BA8DC },
      { pos: [-10, 0, 10], size: [5, 8, 5], color: 0x58A4D4 },
      { pos: [10, 0, 10], size: [6, 10, 6], color: 0x4A9FD4 },
      { pos: [0, 0, 0], size: [10, 20, 10], color: 0x7EC8E3 } // Main building
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
      buildings.push(building)
      scene.add(building)
    })

    // Simple trees
    const treePositions = [
      [-15, 0, -5], [-15, 0, 5], [15, 0, -5], [15, 0, 5],
      [-5, 0, -15], [5, 0, -15], [-5, 0, 15], [5, 0, 15]
    ]

    treePositions.forEach(pos => {
      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 2, 8)
      const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x5A8FBF })
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
      trunk.position.set(pos[0], 1, pos[2])
      trunk.castShadow = true
      scene.add(trunk)

      // Foliage
      const foliageGeometry = new THREE.SphereGeometry(1.5, 8, 8)
      const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x6BC5A0 })
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
      foliage.position.set(pos[0], 3, pos[2])
      foliage.castShadow = true
      scene.add(foliage)
    })

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80
      positions[i + 1] = Math.random() * 20 + 2
      positions[i + 2] = (Math.random() - 0.5) * 80
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.6
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Animation
    let animationId
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Gentle camera rotation
      camera.position.x = Math.sin(elapsed * 0.1) * 25
      camera.position.z = Math.cos(elapsed * 0.1) * 25
      camera.position.y = 10 + Math.sin(elapsed * 0.2) * 2
      camera.lookAt(0, 5, 0)

      // Animate particles
      particles.rotation.y = elapsed * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [isInitialized])

  return <div ref={containerRef} className="game-canvas" />
}

export default GameCanvas
