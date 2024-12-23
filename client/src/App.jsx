import React from 'react'
import MediaTrack from './components/MediaTrack'
import ActionTrack from './components/ActionTrack'
import SystemTrack from './components/SystemTrack'

const App = () => {
  return (
    <div>
      <h1>app</h1>
      <ActionTrack />
      <MediaTrack />
      <SystemTrack />
    </div>
  )
}

export default App