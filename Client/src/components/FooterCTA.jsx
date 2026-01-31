import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function FooterCTA({ openModal }) {
  const { ref, visible } = useScrollReveal()

  return (
    <section className="footer-cta" id="contact">
      <div ref={ref} className={`footer-cta-inner reveal-up ${visible ? 'visible' : ''}`}>
        <div className="footer-cta-text">
          <h3>Ready to explore new digital dimensions?</h3>
          <p>Let TeamExploreX bring your vision to life with Universe3D</p>
        </div>
        <div className="footer-cta-buttons">
          <button className="btn btn-primary" onClick={() => openModal('contact')}>Talk with us</button>
          <button className="btn btn-secondary" onClick={() => openModal('contact')}>Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default FooterCTA
