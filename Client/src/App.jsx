import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Features from './components/Features'
import TechRail from './components/TechRail'
import Pricing from './components/Pricing'
import Team from './components/Team'
import FooterCTA from './components/FooterCTA'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import DemoModal from './components/modals/DemoModal'
import VideoModal from './components/modals/VideoModal'
import ContactModal from './components/modals/ContactModal'
import PricingModal from './components/modals/PricingModal'
import AuthModal from './components/modals/AuthModal'
import Game from './pages/Game'

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [pricingData, setPricingData] = useState({ planName: '', planPrice: '' })

  // Simple client-side routing
  const path = window.location.pathname
  if (path === '/game') {
    return <Game />
  }

  const openModal = (modalName) => {
    setActiveModal(modalName)
    document.body.style.overflow = 'hidden'
  }

  const openPricingModal = (planName, planPrice) => {
    setPricingData({ planName, planPrice })
    setActiveModal('pricing')
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <Navigation openModal={openModal} />
      <Hero openModal={openModal} />
      <AboutUs />
      <Features />
      <TechRail />
      <Pricing openPricingModal={openPricingModal} />
      <FooterCTA openModal={openModal} />
      <Team />
      <Footer />
      <ScrollToTop />
      
      {activeModal === 'demo' && <DemoModal closeModal={closeModal} />}
      {activeModal === 'video' && <VideoModal closeModal={closeModal} />}
      {activeModal === 'contact' && <ContactModal closeModal={closeModal} />}
      {activeModal === 'pricing' && <PricingModal closeModal={closeModal} planName={pricingData.planName} planPrice={pricingData.planPrice} />}
      {activeModal === 'auth' && <AuthModal closeModal={closeModal} />}
    </>
  )
}

export default App
