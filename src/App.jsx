import { useState } from 'react'
import Layout from './components/layout/Layout'
import Button from './components/ui/Button'
import NavBar from './components/contents/NavBar'
import HeroSection from './components/contents/HeroSection'
import Footer from './components/contents/Footer'
import ArticleSection from './components/contents/ArticleSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <HeroSection/>
    <ArticleSection/>
    <Footer/>
    </>
  )
}

export default App
