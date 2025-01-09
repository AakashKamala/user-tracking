import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Track from './pages/Track'
import Home from "./pages/Home"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/track' element={<Track />} />
    </Routes>
  )
}

export default App