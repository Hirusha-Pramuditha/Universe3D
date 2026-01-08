import React, { useEffect, useRef } from 'react'

function TechRail() {
  const railRef = useRef(null)

  useEffect(() => {
    const techRail = railRef.current
    if (!techRail) return

    const items = Array.from(techRail.querySelectorAll('.tech-item'))
    if (items.length === 0) return

    // Clone items multiple times for seamless infinite loop
    const cloneCount = 3
    for (let i = 0; i < cloneCount; i++) {
      items.forEach(item => {
        const clone = item.cloneNode(true)
        techRail.appendChild(clone)
      })
    }

    // Pause animation on hover
    const handleMouseEnter = () => {
      techRail.style.animationPlayState = 'paused'
    }

    const handleMouseLeave = () => {
      techRail.style.animationPlayState = 'running'
    }

    techRail.addEventListener('mouseenter', handleMouseEnter)
    techRail.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      techRail.removeEventListener('mouseenter', handleMouseEnter)
      techRail.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const techItems = ['React', 'Three.js', 'GLTF/GLB', 'Blender', 'Node.js', 'WebGL', 'Tailwind CSS', 'Vite']

  return (
    <section className="tech-rail" id="tech">
      <div className="section-container">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Powered by Modern Technology</h2>
      </div>
      <div ref={railRef} className="tech-rail-content">
        {techItems.map((tech, index) => (
          <div key={index} className="tech-item">
            <span className="tech-label">{tech}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechRail

