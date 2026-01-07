// === Modal Functions ===

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// === Button Event Listeners ===

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            if (navLinks.classList.contains('active')) {
                navToggle.innerHTML = '✕';
            } else {
                navToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking a nav link
        const navLinksItems = navLinks.querySelectorAll('.nav-link');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '☰';
            }
        });
    }

    // Demo button listeners
    const demoButtons = document.querySelectorAll('[data-modal-demo]');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            trackAnalytics('demo_clicked');
            openModal('demoModal');
        });
    });

    // Video button listeners
    const videoButtons = document.querySelectorAll('[data-modal-video]');
    videoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            trackAnalytics('video_clicked');
            openModal('videoModal');
        });
    });

    // Contact button listeners
    const contactButtons = document.querySelectorAll('[data-modal-contact]');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const analytics = btn.getAttribute('data-analytics');
            if (analytics) trackAnalytics(analytics);
            openModal('contactModal');
        });
    });

    // Initialize Three.js Hero
    initThreeHero();

    // Initialize Tech Rail
    initInfiniteTechRail();

    // Setup Intersection Observer for animations
    setupIntersectionObserver();
});

// === Analytics Tracking ===

function trackAnalytics(eventName) {
    console.log('📊 Analytics Event:', eventName);
    // You can integrate with Google Analytics, Mixpanel, or any other service here
    // Example: gtag('event', eventName);
}

// === Contact Form Handler ===

function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        name: form.querySelector('input[placeholder="Full Name"]').value,
        email: form.querySelector('input[placeholder="Email Address"]').value,
        phone: form.querySelector('input[placeholder="Phone Number"]').value,
        interest: form.querySelector('select').value,
        message: form.querySelector('textarea').value
    };

    console.log('📧 Contact Form Submitted:', data);
    
    // Show success message
    const submitBtn = form.querySelector('.modal-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Reset form
    form.reset();

    // Revert button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
    }, 3000);

    // Track analytics
    trackAnalytics('contact_form_submitted');
    
    // Here you would send the data to your backend
    // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
}

// === Three.js Hero Animation ===

let scene, camera, renderer, particles, objects = [];

function initThreeHero() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a1628, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1);
    pointLight1.position.set(100, 100, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 0.8);
    pointLight2.position.set(-100, -100, 100);
    scene.add(pointLight2);

    // Create floating particles
    createParticles();

    // Create 3D objects
    createCubes();
    createSpheres();
    createTorus();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    animate();
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positionArray[i] = (Math.random() - 0.5) * 200;
        positionArray[i + 1] = (Math.random() - 0.5) * 200;
        positionArray[i + 2] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        color: 0x3b82f6,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

function createCubes() {
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x06b6d4,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
    });

    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube1.position.set(-30, 15, 0);
    scene.add(cube1);
    objects.push({
        mesh: cube1,
        vx: 0.02,
        vy: 0.01,
        vz: 0.015,
        type: 'cube',
    });

    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial.clone());
    cube2.position.set(30, -15, 0);
    scene.add(cube2);
    objects.push({
        mesh: cube2,
        vx: -0.015,
        vy: 0.02,
        vz: -0.01,
        type: 'cube',
    });
}

function createSpheres() {
    const sphereGeometry = new THREE.IcosahedronGeometry(5, 4);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x06b6d4,
        emissive: 0x3b82f6,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
    });

    const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere1.position.set(-40, -20, -20);
    scene.add(sphere1);
    objects.push({
        mesh: sphere1,
        vx: 0.01,
        vy: -0.015,
        vz: 0.02,
        type: 'sphere',
    });

    const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
    sphere2.position.set(40, 20, -20);
    scene.add(sphere2);
    objects.push({
        mesh: sphere2,
        vx: -0.02,
        vy: 0.01,
        vz: 0.015,
        type: 'sphere',
    });
}

function createTorus() {
    const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 32);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x06b6d4,
        transparent: true,
        opacity: 0.25,
        wireframe: true,
    });

    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, -30);
    scene.add(torus);
    objects.push({
        mesh: torus,
        vx: 0.005,
        vy: 0.008,
        vz: 0,
        type: 'torus',
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
    }

    // Animate objects
    objects.forEach((obj, index) => {
        obj.mesh.rotation.x += obj.vx;
        obj.mesh.rotation.y += obj.vy;
        obj.mesh.rotation.z += obj.vz;

        const time = Date.now() * 0.001;
        obj.mesh.position.x += Math.sin(time + index) * 0.02;
        obj.mesh.position.y += Math.cos(time + index * 0.7) * 0.02;
        obj.mesh.position.z += Math.sin(time + index * 0.5) * 0.01;
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// === Infinite Tech Rail Animation ===

function initInfiniteTechRail() {
    const techRail = document.querySelector('.tech-rail-content');
    
    if (!techRail) return;

    // Get all original items
    const items = Array.from(techRail.querySelectorAll('.tech-item'));
    
    if (items.length === 0) return;

    // Clone items multiple times for seamless infinite loop
    const cloneCount = 3;
    
    for (let i = 0; i < cloneCount; i++) {
        items.forEach(item => {
            const clone = item.cloneNode(true);
            techRail.appendChild(clone);
        });
    }

    // Pause animation on hover
    techRail.addEventListener('mouseenter', () => {
        techRail.style.animationPlayState = 'paused';
    });

    techRail.addEventListener('mouseleave', () => {
        techRail.style.animationPlayState = 'running';
    });

    // Mobile touch events
    techRail.addEventListener('touchstart', () => {
        techRail.style.animationPlayState = 'paused';
    });

    techRail.addEventListener('touchend', () => {
        techRail.style.animationPlayState = 'running';
    });

    console.log('✅ Infinite Tech Rail Initialized');
}

// === Intersection Observer for Animations ===

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}



// === Global Background Animation ===

let globalScene, globalCamera, globalRenderer, globalParticles = [];

function initGlobalBackgroundAnimation() {
    // Create a container for the global background
    const bgContainer = document.createElement('div');
    bgContainer.id = 'global-bg-container';
    bgContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.insertBefore(bgContainer, document.body.firstChild);

    // Scene setup
    globalScene = new THREE.Scene();
    globalScene.background = new THREE.Color(0x0a1628);

    globalCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    globalCamera.position.z = 100;

    globalRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    globalRenderer.setSize(window.innerWidth, window.innerHeight);
    globalRenderer.setClearColor(0x0a1628, 1);
    globalRenderer.setPixelRatio(window.devicePixelRatio);
    bgContainer.appendChild(globalRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    globalScene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 0.6);
    pointLight1.position.set(200, 200, 200);
    globalScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 0.4);
    pointLight2.position.set(-200, -200, 200);
    globalScene.add(pointLight2);

    // Create subtle animated elements
    createGlobalParticles();
    createGlobalOrbs();
    createGlobalConnections();

    // Handle window resize
    window.addEventListener('resize', onGlobalWindowResize);

    // Animation loop
    animateGlobalBackground();

    console.log('✅ Global Background Animation Initialized');
}

function createGlobalParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positionArray[i] = (Math.random() - 0.5) * 400;
        positionArray[i + 1] = (Math.random() - 0.5) * 400;
        positionArray[i + 2] = (Math.random() - 0.5) * 400;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        color: 0x3b82f6,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.3,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    globalScene.add(particles);

    globalParticles.push({
        mesh: particles,
        rotationSpeed: { x: 0.00005, y: 0.00008, z: 0.00003 },
    });
}

function createGlobalOrbs() {
    const orbs = [
        { pos: [-150, 100, -200], color: 0x3b82f6, size: 8 },
        { pos: [150, -100, -200], color: 0x06b6d4, size: 12 },
        { pos: [0, 150, -300], color: 0x3b82f6, size: 6 },
        { pos: [-100, -150, -250], color: 0x06b6d4, size: 10 },
    ];

    orbs.forEach((orb, index) => {
        const geometry = new THREE.IcosahedronGeometry(orb.size, 4);
        const material = new THREE.MeshPhongMaterial({
            color: orb.color,
            emissive: orb.color,
            transparent: true,
            opacity: 0.1,
            wireframe: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(orb.pos[0], orb.pos[1], orb.pos[2]);
        globalScene.add(mesh);

        globalParticles.push({
            mesh: mesh,
            basePos: [...orb.pos],
            speed: 0.001 + index * 0.0003,
            amplitude: 20 + index * 5,
            type: 'orb',
        });
    });
}

function createGlobalConnections() {
    const connectionPoints = [
        [100, 80, -150],
        [-100, -80, -150],
        [0, 120, -180],
        [80, -120, -200],
    ];

    const material = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.15,
    });

    // Create connections between random points
    for (let i = 0; i < connectionPoints.length - 1; i++) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(
            new Float32Array([
                ...connectionPoints[i],
                ...connectionPoints[i + 1],
            ]), 3
        ));

        const line = new THREE.Line(geometry, material);
        globalScene.add(line);

        globalParticles.push({
            mesh: line,
            type: 'connection',
        });
    }
}

function animateGlobalBackground() {
    requestAnimationFrame(animateGlobalBackground);

    const time = Date.now() * 0.0005;

    globalParticles.forEach((particle, index) => {
        if (particle.type === 'connection') {
            // Subtle pulse effect on connections
            particle.mesh.material.opacity = 0.15 + Math.sin(time + index) * 0.08;
        } else if (particle.type === 'orb') {
            // Floating orbs with subtle movement
            particle.mesh.position.x = particle.basePos[0] + Math.sin(time * particle.speed) * particle.amplitude;
            particle.mesh.position.y = particle.basePos[1] + Math.cos(time * particle.speed * 0.7) * particle.amplitude;
            particle.mesh.position.z = particle.basePos[2] + Math.sin(time * particle.speed * 0.5) * (particle.amplitude * 0.5);
            
            // Gentle rotation
            particle.mesh.rotation.x += 0.0002;
            particle.mesh.rotation.y += 0.0003;
        } else if (particle.mesh.isPoints) {
            // Rotate particle cloud
            particle.mesh.rotation.x += particle.rotationSpeed.x;
            particle.mesh.rotation.y += particle.rotationSpeed.y;
            particle.mesh.rotation.z += particle.rotationSpeed.z;
        }
    });

    globalRenderer.render(globalScene, globalCamera);
}

function onGlobalWindowResize() {
    globalCamera.aspect = window.innerWidth / window.innerHeight;
    globalCamera.updateProjectionMatrix();
    globalRenderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initGlobalBackgroundAnimation();
});