import React, { useEffect, useRef } from 'react'

function Features() {
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

  const features = [
    {
      icon: (
        <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: '3D Building Maps',
      description: 'Interactive, navigable floor plans with real-time rendering.'
    },
    {
      icon: (
        <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM9 20H4v-2a6 6 0 0112 0v2H9z" />
        </svg>
      ),
      title: 'Avatar Navigation',
      description: 'Customizable avatars with outfit validation and dress-code demonstrations.'
    },
    {
      icon: (
        <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Location Search',
      description: 'Instant search with auto-suggest and wayfinding to any room.'
    },
    {
      icon: (
        <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Gamified Activities',
      description: 'Quizzes, mini-games, and interactive onboarding to boost engagement.'
    },
    {
      icon: (
        <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 8.048M12 4.354L7.325 8.677a4 4 0 000 5.646L12 19M12 4.354l4.675 4.323a4 4 0 010 5.646L12 19" />
        </svg>
      ),
      title: 'Staff Directory',
      description: 'Integrated hierarchy, department mapping.'
    },
    {
      icon: (
        <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Staff Directory Control',
      description: 'Manage staff roles and office information.'
    }
  ]

  return (
    <section className="features" id="features">
      <div className="section-container">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need for immersive campus exploration</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" data-animate>
              <div className="feature-card-content">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

