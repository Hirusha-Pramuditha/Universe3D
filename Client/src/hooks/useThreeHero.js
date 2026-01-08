import * as THREE from 'three'

class ThreeHero {
  constructor(container) {
    this.container = container
    this.scene = null
    this.camera = null
    this.renderer = null
    this.particles = null
    this.objects = []
    this.animationId = null
    
    this.init()
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0a1628)

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 50

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x0a1628, 1)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1)
    pointLight1.position.set(100, 100, 100)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x06b6d4, 0.8)
    pointLight2.position.set(-100, -100, 100)
    this.scene.add(pointLight2)

    // Create floating particles
    this.createParticles()

    // Create 3D objects
    this.createCubes()
    this.createSpheres()
    this.createTorus()

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize())

    // Animation loop
    this.animate()
  }

  createParticles() {
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 300
    const positionArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 200
      positionArray[i + 1] = (Math.random() - 0.5) * 200
      positionArray[i + 2] = (Math.random() - 0.5) * 200
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x3b82f6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial)
    this.scene.add(this.particles)
  }

  createCubes() {
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3)
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x06b6d4,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    })

    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube1.position.set(-30, 15, 0)
    this.scene.add(cube1)
    this.objects.push({
      mesh: cube1,
      vx: 0.02,
      vy: 0.01,
      vz: 0.015,
      type: 'cube',
    })

    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial.clone())
    cube2.position.set(30, -15, 0)
    this.scene.add(cube2)
    this.objects.push({
      mesh: cube2,
      vx: -0.015,
      vy: 0.02,
      vz: -0.01,
      type: 'cube',
    })
  }

  createSpheres() {
    const sphereGeometry = new THREE.IcosahedronGeometry(5, 4)
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    })

    const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere1.position.set(-40, -20, -20)
    this.scene.add(sphere1)
    this.objects.push({
      mesh: sphere1,
      vx: 0.01,
      vy: -0.015,
      vz: 0.02,
      type: 'sphere',
    })

    const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial.clone())
    sphere2.position.set(40, 20, -20)
    this.scene.add(sphere2)
    this.objects.push({
      mesh: sphere2,
      vx: -0.02,
      vy: 0.01,
      vz: 0.015,
      type: 'sphere',
    })
  }

  createTorus() {
    const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 32)
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x06b6d4,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    })

    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.position.set(0, 0, -30)
    this.scene.add(torus)
    this.objects.push({
      mesh: torus,
      vx: 0.005,
      vy: 0.008,
      vz: 0,
      type: 'torus',
    })
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate())

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.x += 0.0001
      this.particles.rotation.y += 0.0002
    }

    // Animate objects
    this.objects.forEach((obj, index) => {
      obj.mesh.rotation.x += obj.vx
      obj.mesh.rotation.y += obj.vy
      obj.mesh.rotation.z += obj.vz

      const time = Date.now() * 0.001
      obj.mesh.position.x += Math.sin(time + index) * 0.02
      obj.mesh.position.y += Math.cos(time + index * 0.7) * 0.02
      obj.mesh.position.z += Math.sin(time + index * 0.5) * 0.01
    })

    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    
    window.removeEventListener('resize', this.onWindowResize)
    
    if (this.renderer && this.container) {
      this.container.removeChild(this.renderer.domElement)
    }
    
    // Dispose of Three.js objects
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
    
    if (this.renderer) {
      this.renderer.dispose()
    }
  }
}

export default ThreeHero

