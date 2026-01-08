import React from 'react'

function FooterCTA({ openModal }) {
  return (
    <section className="footer-cta" id="contact">
      <div className="footer-cta-container">
        <div className="footer-cta-text">
          <h3>Ready to explore new digital dimensions?</h3>
          <p>Let TeamExploreX bring your vision to life with Universe3D</p>
        </div>
        <div className="footer-cta-buttons">
          <button className="btn btn-primary" onClick={() => openModal('contact')}>
            Schedule Demo
          </button>
          <button className="btn btn-secondary" onClick={() => openModal('contact')}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default FooterCTA

