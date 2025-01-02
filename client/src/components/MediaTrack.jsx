import React, { useEffect, useRef, useState } from 'react';

const MediaTrack = () => {

  const [stream, setStream]=useState(null)
  const videoRef = useRef(null);
  const [screen, setScreen]=useState(null)
  const screenRef = useRef(null);

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


  useEffect(() => {
    const screen = async () => {
      try {
        const screenReceived = await navigator.mediaDevices.getDisplayMedia();
        console.log('Screen stream received:', streamReceived);
        setScreen(screenReceived)
        if (screenRef.current) {
          screenRef.current.srcObject = screenReceived;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    screen();
  }, []);




  return (<div>
    <h1>MediaTrack</h1>
    <video ref={videoRef} width="500" height="300" autoPlay controls ></video>
    <video ref={screenRef} width="500" height="300" autoPlay controls ></video>
  </div>);
};

export default MediaTrack;
