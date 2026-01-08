import React, { useEffect, useRef } from 'react'

function Pricing({ openModal }) {
  const observerRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideUp 0.6s ease-out forwards'
          observerRef.current.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => {
      el.style.opacity = '0'
      observerRef.current.observe(el)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const plans = [
    {
      name: 'Starter',
      price: 'LKR 50,000',
      features: [
        'One building (up to 3 floors)',
        'GLTF/GLB model integration',
        'Basic avatar navigation',
        'Clickable info hotspots',
        'Single admin account',
        '30-day deployment support'
      ]
    },
    {
      name: 'Professional',
      price: 'LKR 100,000',
      highlighted: true,
      features: [
        'Up to 3 buildings',
        'Avatar customization',
        'Location search & routing',
        'Interactive quizzes',
        'Multiple admin roles',
        'Performance optimization',
        'Analytics & sessions'
      ]
    },
    {
      name: 'Enterprise',
      price: 'LKR 200,000',
      features: [
        'Full campus digital twin',
        'Multiplayer sessions',
        'Advanced admin CMS',
        'API & SIS integration',
        'Custom gamification',
        'Dedicated SLA',
        'White-glove onboarding'
      ]
    }
  ]

  return (
    <section className="pricing" id="pricing">
      <div className="section-container">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your needs</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
              data-animate
            >
              <h3>{plan.name}</h3>
              <p className="pricing-badge">Contact our team for pricing</p>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature">
                    <div className="pricing-dot"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="pricing-btn" onClick={() => openModal('contact')}>
                {plan.price}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-cta" data-animate>
          <p>Need a custom solution?</p>
          <button className="btn btn-primary" onClick={() => openModal('contact')}>
            Contact Our Team →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing

