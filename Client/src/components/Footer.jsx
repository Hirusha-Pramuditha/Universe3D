import React from 'react'

function Footer() {
  return (
    <footer>
      <div className="section-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">Universe3D</div>
            <p className="footer-description">
              Created by TeamExploreX - Bringing immersive 3D experiences to the world. 
              Transform how people explore digital spaces.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" title="Twitter">𝕏</a>
              <a href="#" className="social-link" title="LinkedIn">in</a>
              <a href="#" className="social-link" title="GitHub">⚙️</a>
              <a href="#" className="social-link" title="Discord">◆</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Support</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 Universe3D by TeamExploreX. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

