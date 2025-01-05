import React, { useEffect, useState } from 'react'
import MediaTrack from './components/MediaTrack'
import ActionTrack from './components/ActionTrack'
import SystemTrack from './components/SystemTrack'
import axios from 'axios' // Don't forget to import axios

const App = () => {
  const [ip, setIp] = useState("")

  useEffect(() => {
    // Define and immediately execute the async function
    const fetchIp = async () => {
      try {
        const response = await axios("http://localhost:8000/api/getip")
        console.log(response)
        console.log(response.data.ip)
        setIp(response.data.ip)
      } catch (error) {
        console.error('Error fetching IP:', error)
      }
    }

    fetchIp() // Execute the function
  }, [])

  return (
    <div>
      <h1>app</h1>
      <p>{ip}</p>
      <ActionTrack />
      <MediaTrack />
      <SystemTrack />
    </div>
  )
}

export default App