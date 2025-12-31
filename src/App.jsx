import { useState } from 'react'
import Layout from './components/layout/Layout'
import Button from './components/ui/Button'
import NavBar from './components/content/NavBar'
import HeroSection from './components/content/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <HeroSection/>
    </>
  )
}

export default App
