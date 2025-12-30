import { useState } from 'react'
import Layout from './components/layout/Layout'
import Button from './components/ui/Button'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <NavBar></NavBar>
  )
}

export default App
