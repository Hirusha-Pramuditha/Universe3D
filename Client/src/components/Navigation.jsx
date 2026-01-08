import React, { useState, useEffect } from 'react'

function Navigation({ openModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#hero">Universe3D</a>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#features" className="nav-link" onClick={handleNavClick}>Features</a>
          <a href="#pricing" className="nav-link" onClick={handleNavClick}>Pricing</a>
          <a href="#team" className="nav-link" onClick={handleNavClick}>Team</a>
          <a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a>
        </div>
        <button className="nav-btn" onClick={() => openModal('contact')}>
          Get Demo
        </button>
        <button 
          className="nav-toggle" 
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen(!isMenuOpen)
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}

export default Navigation

