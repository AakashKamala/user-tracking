import React, { useEffect, useState } from 'react'
import MediaTrack from './components/MediaTrack'
import ActionTrack from './components/ActionTrack'
import SystemTrack from './components/SystemTrack'
import axios from 'axios' // Don't forget to import axios

const App = () => {
  const [ip, setIp] = useState("")
  const [details, setDetails]=useState("")

  useEffect(() => {
    // Define and immediately execute the async function
    const fetchIp = async () => {
      try {
        // const response = await axios("http://localhost:8000/api/getip")
        const response = await axios("https://user-tracking-iisg.onrender.com/api/getip")
        console.log(response)
        console.log(response.data.ip)
        setIp(response.data.ip)
        setDetails(response.data.geoDetails)
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
      <p>{details}</p>
      <ActionTrack />
      <MediaTrack />
      <SystemTrack />
    </div>
  )
}

export default App