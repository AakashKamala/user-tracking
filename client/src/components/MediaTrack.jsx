import React, { useEffect, useRef, useState } from 'react';

const MediaTrack = () => {

  const [stream, setStream]=useState(null)
  const videoRef = useRef(null);

  useEffect(() => {
    const media = async () => {
      try {
        const streamReceived = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        console.log('Media stream received:', streamReceived);
        setStream(streamReceived)
        if (videoRef.current) {
          videoRef.current.srcObject = streamReceived;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    media();
  }, []);




  return (<div>
    <h1>MediaTrack</h1>
    <video ref={videoRef} width="500" height="300" autoPlay controls ></video>
  </div>);
};

export default MediaTrack;
