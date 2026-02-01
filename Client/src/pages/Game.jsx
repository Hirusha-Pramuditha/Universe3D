import React, { useEffect, useRef, useState } from 'react'

function Game() {
  const particlesRef = useRef([])
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Particle network on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 55
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * (w / devicePixelRatio),
      y: Math.random() * (h / devicePixelRatio),
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.08,
      hue: Math.random() * 36 + 205,
    }))

    function draw() {
      const W = w / devicePixelRatio
      const H = h / devicePixelRatio
      ctx.clearRect(0, 0, W, H)
      const pts = particlesRef.current

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `hsla(220, 68%, 58%, ${(1 - dist / 100) * 0.15})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 62%, 60%, ${p.opacity})`
        ctx.fill()
      })
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="game-page">
      <canvas ref={canvasRef} className="game-canvas" />

      {/* Top bar */}
      <header className={`game-header ${loaded ? 'visible' : ''}`}>
        <a href="/" className="game-logo">Universe<span>3D</span></a>
        <a href="/" className="game-back-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Back to Home
        </a>
      </header>

      {/* Two-column body */}
      <div className={`game-body ${loaded ? 'visible' : ''}`}>

        {/* LEFT — video + rings */}
        <div className="game-visual">
          <div className="game-ring game-ring-1" />
          <div className="game-ring game-ring-2" />
          <div className="game-ring game-ring-3" />
          <div className="game-video-wrap">
            <dotlottie-wc
              src="https://lottie.host/9af7b4a4-76fe-405b-8725-e23457522d4b/1Wyaz8cbVJ.lottie"
              autoplay
              loop
              background="transparent"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="game-video-glow" />
          </div>
        </div>

        {/* RIGHT — all text & info */}
        <div className="game-content">

          <div className="game-status-badge">
            <span className="game-status-dot" />
            <span>Under Development</span>
          </div>

          <h1 className="game-title">
            Universe<span className="game-title-accent">3D</span> Game
            <span className="game-title-sub">Interactive 3D Experience</span>
          </h1>

          <p className="game-desc">
            An ambitious project to bring fully interactive, browser-based 3D campus
            exploration to life. Powered by real-time WebGL rendering and spatial audio —
            no downloads, no installs.
          </p>

          {/* Progress */}
          <div className="game-progress-wrap">
            <div className="game-progress-head">
              <span className="game-progress-label">Build Progress</span>
              <span className="game-progress-pct">38%</span>
            </div>
            <div className="game-progress-track">
              <div className="game-progress-fill" style={{ width: '38%' }} />
            </div>
          </div>

          {/* Info pills row */}
          <div className="game-pills">
            <div className="game-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Expected Launch — Q2 2026
            </div>
            <div className="game-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              6 Member Team
            </div>
            <div className="game-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Three.js · React · WebGL
            </div>
            <div className="game-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Sri Lanka
            </div>
          </div>

          {/* Bottom credit line */}
          <div className="game-credit">
            Developing by <strong>TeamExploreX</strong> &nbsp;·&nbsp; © 2026 All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
