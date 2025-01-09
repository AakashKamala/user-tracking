import React, { useEffect, useState } from 'react'
import MediaTrack from '../components/MediaTrack'
import ActionTrack from '../components/ActionTrack'
import SystemTrack from '../components/SystemTrack'
import axios from 'axios'

const Track = () => {
  const [ip, setIp] = useState("")
  const [details, setDetails] = useState(null) // Start with null for clarity

  useEffect(() => {
    const fetchIp = async () => {
      try {
        // const response = await axios("http://localhost:8000/api/getip")
        const response = await axios.get("https://user-tracking-iisg.onrender.com/api/getip")
        console.log(response.data)
        setIp(response.data.ip || "IP not available")
        setDetails(response.data.geoDetails || {})
      } catch (error) {
        console.error('Error fetching IP:', error)
        setIp("Error fetching IP")
        setDetails({})
      }
    }

    fetchIp()
  }, [])

  return (
    <div>
      <h1>User information</h1>
      <p>IP: {ip}</p>
      <div>
        <h2>Geo Details:</h2>
        {details && Object.entries(details).length > 0 ? (
          <ul>
            {Object.entries(details).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No details available</p>
        )}
      </div>
      <ActionTrack />
      <MediaTrack />
      <SystemTrack />
    </div>
  )
}

export default Track