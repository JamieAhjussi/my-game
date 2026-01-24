import HomePage from './components/Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewPostPage from './components/Pages/ViewPostPage'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/blog/:id" element={<ViewPostPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
