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
import DemoModal from './components/modals/DemoModal'
import VideoModal from './components/modals/VideoModal'
import ContactModal from './components/modals/ContactModal'

function App() {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalName) => {
    setActiveModal(modalName)
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
      <Pricing openModal={openModal} />
      <FooterCTA openModal={openModal} />
      <Team />
      <Footer />
      
      {activeModal === 'demo' && <DemoModal closeModal={closeModal} />}
      {activeModal === 'video' && <VideoModal closeModal={closeModal} />}
      {activeModal === 'contact' && <ContactModal closeModal={closeModal} />}
    </>
  )
}

export default App

