// import React, { useEffect, useRef, useState } from 'react';

// const MediaTrack = () => {
//   const [stream, setStream] = useState(null);
//   const [screen, setScreen] = useState(null);
//   const videoRef = useRef(null);
//   const screenRef = useRef(null);

//   // Initialize camera stream
//   useEffect(() => {
//     const initializeMedia = async () => {
//       try {
//         const streamReceived = await navigator.mediaDevices.getUserMedia({ 
//           audio: true, 
//           video: true 
//         });
//         setStream(streamReceived);
//         if (videoRef.current) {
//           videoRef.current.srcObject = streamReceived;
//         }
//       } catch (error) {
//         console.error('Error accessing media devices:', error);
//         alert('Could not access camera/microphone. Please check permissions.');
//       }
//     };

//     initializeMedia();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const startScreenShare = async () => {
//     try {
//       // Stop any existing screen share
//       if (screen) {
//         screen.getTracks().forEach(track => track.stop());
//       }
      
//       const screenReceived = await navigator.mediaDevices.getDisplayMedia();
//       setScreen(screenReceived);
//       if (screenRef.current) {
//         screenRef.current.srcObject = screenReceived;
//       }

//       // Add track ended listener
//       screenReceived.getVideoTracks()[0].addEventListener('ended', () => {
//         setScreen(null);
//         if (screenRef.current) {
//           screenRef.current.srcObject = null;
//         }
//       });
//     } catch (error) {
//       console.error('Error accessing screen sharing:', error);
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (screen) {
//         screen.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [screen]);

//   return (
//     <div>
//       <h1>MediaTrack</h1>
//       <div>
//         <h2>Camera Stream</h2>
//         <video ref={videoRef} width="500" height="300" autoPlay controls></video>
//       </div>
//       <div>
//         <h2>Screen Share Stream</h2>
//         <button onClick={startScreenShare}>
//           {screen ? 'Restart Screen Share' : 'Start Screen Share'}
//         </button>
//         <video ref={screenRef} width="500" height="300" autoPlay controls></video>
//       </div>
//     </div>
//   );
// };

// export default MediaTrack;




















// import React, { useEffect, useRef, useState } from 'react';

// const MediaTrack = () => {
//   const [stream, setStream] = useState(null);
//   const [screen, setScreen] = useState(null);
//   const [location, setLocation] = useState(null);
//   const videoRef = useRef(null);
//   const screenRef = useRef(null);

//   const startWebcam = async () => {
//     try {
//       // Stop any existing stream
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }

//       const streamReceived = await navigator.mediaDevices.getUserMedia({ 
//         audio: true, 
//         video: true 
//       });
//       setStream(streamReceived);
//       if (videoRef.current) {
//         videoRef.current.srcObject = streamReceived;
//       }
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//       alert('Could not access camera/microphone. Please check permissions.');
//     }
//   };

//   const startScreenShare = async () => {
//     try {
//       if (screen) {
//         screen.getTracks().forEach(track => track.stop());
//       }
      
//       const screenReceived = await navigator.mediaDevices.getDisplayMedia();
//       setScreen(screenReceived);
//       if (screenRef.current) {
//         screenRef.current.srcObject = screenReceived;
//       }

//       screenReceived.getVideoTracks()[0].addEventListener('ended', () => {
//         setScreen(null);
//         if (screenRef.current) {
//           screenRef.current.srcObject = null;
//         }
//       });
//     } catch (error) {
//       console.error('Error accessing screen sharing:', error);
//     }
//   };

//   const getLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
//         if (permissionStatus.state === 'denied') {
//           alert('Location permission is blocked. Please enable it in your browser settings:\n\n' +
//                 'Chrome: Click the lock/info icon in the address bar → Site Settings → Location\n' +
//                 'Firefox: Click the lock/shield icon in the address bar → Permissions → Location\n' +
//                 'Safari: Safari Preferences → Websites → Location');
//           return;
//         }
        
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//               accuracy: position.coords.accuracy,
//               timestamp: new Date(position.timestamp).toLocaleString()
//             });
//           },
//           (error) => {
//             let errorMessage = 'Could not access location. ';
            
//             switch(error.code) {
//               case error.PERMISSION_DENIED:
//                 errorMessage += 'Location permission was denied.';
//                 break;
//               case error.POSITION_UNAVAILABLE:
//                 errorMessage += 'Location information is unavailable.';
//                 break;
//               case error.TIMEOUT:
//                 errorMessage += 'Location request timed out.';
//                 break;
//               default:
//                 errorMessage += 'An unknown error occurred.';
//             }
            
//             console.error('Geolocation error:', error);
//             alert(errorMessage);
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000, // Increased timeout to 10 seconds
//             maximumAge: 0
//           }
//         );
//       });
//     } else {
//       alert('Geolocation is not supported by your browser');
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//       if (screen) {
//         screen.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [stream, screen]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">MediaTrack</h1>
      
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Camera Stream</h2>
//         <button 
//           onClick={startWebcam}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
//         >
//           {stream ? 'Restart Webcam' : 'Start Webcam'}
//         </button>
//         <video 
//           ref={videoRef} 
//           width="500" 
//           height="300" 
//           autoPlay 
//           controls
//           className="border border-gray-300 rounded"
//         ></video>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Screen Share Stream</h2>
//         <button 
//           onClick={startScreenShare}
//           className="bg-green-500 text-white px-4 py-2 rounded mb-2 hover:bg-green-600"
//         >
//           {screen ? 'Restart Screen Share' : 'Start Screen Share'}
//         </button>
//         <video 
//           ref={screenRef} 
//           width="500" 
//           height="300" 
//           autoPlay 
//           controls
//           className="border border-gray-300 rounded"
//         ></video>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Location Information</h2>
//         <button 
//           onClick={getLocation}
//           className="bg-purple-500 text-white px-4 py-2 rounded mb-2 hover:bg-purple-600"
//         >
//           Get Location
//         </button>
//         {location && (
//           <div className="bg-gray-100 p-4 rounded">
//             <p><strong>Latitude:</strong> {location.latitude}</p>
//             <p><strong>Longitude:</strong> {location.longitude}</p>
//             <p><strong>Accuracy:</strong> {location.accuracy} meters</p>
//             <p><strong>Timestamp:</strong> {location.timestamp}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MediaTrack;





































import React, { useEffect, useRef, useState } from 'react';

const MediaTrack = () => {
  const [stream, setStream] = useState(null);
  const [screen, setScreen] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const videoRef = useRef(null);
  const screenRef = useRef(null);

  // Check location permission status on mount
  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((permissionStatus) => {
          setLocationPermission(permissionStatus.state);
          
          // Listen for permission changes
          permissionStatus.addEventListener('change', (e) => {
            setLocationPermission(e.target.state);
          });
        });
    }

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (screen) {
        screen.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream, screen]);

  const startWebcam = async () => {
    try {
      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const streamReceived = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      setStream(streamReceived);
      if (videoRef.current) {
        videoRef.current.srcObject = streamReceived;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  };

  const startScreenShare = async () => {
    try {
      if (screen) {
        screen.getTracks().forEach(track => track.stop());
      }
      
      const screenReceived = await navigator.mediaDevices.getDisplayMedia();
      setScreen(screenReceived);
      if (screenRef.current) {
        screenRef.current.srcObject = screenReceived;
      }

      screenReceived.getVideoTracks()[0].addEventListener('ended', () => {
        setScreen(null);
        if (screenRef.current) {
          screenRef.current.srcObject = null;
        }
      });
    } catch (error) {
      console.error('Error accessing screen sharing:', error);
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        setLocationPermission(permissionStatus.state);
        
        if (permissionStatus.state === 'denied') {
          alert('Location permission is blocked. Please enable it in your browser settings:\n\n' +
                'Chrome: Click the lock/info icon in the address bar → Site Settings → Location\n' +
                'Firefox: Click the lock/shield icon in the address bar → Permissions → Location\n' +
                'Safari: Safari Preferences → Websites → Location');
          return;
        }
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: new Date(position.timestamp).toLocaleString()
            });
          },
          (error) => {
            let errorMessage = 'Could not access location. ';
            
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage += 'Location permission was denied.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage += 'Location information is unavailable.';
                break;
              case error.TIMEOUT:
                errorMessage += 'Location request timed out.';
                break;
              default:
                errorMessage += 'An unknown error occurred.';
            }
            
            console.error('Geolocation error:', error);
            alert(errorMessage);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MediaTrack</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Camera Stream</h2>
        <button 
          onClick={startWebcam}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
        >
          {stream ? 'Restart Webcam' : 'Start Webcam'}
        </button>
        <video 
          ref={videoRef} 
          width="500" 
          height="300" 
          autoPlay 
          controls
          className="border border-gray-300 rounded"
        ></video>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Screen Share Stream</h2>
        <button 
          onClick={startScreenShare}
          className="bg-green-500 text-white px-4 py-2 rounded mb-2 hover:bg-green-600"
        >
          {screen ? 'Restart Screen Share' : 'Start Screen Share'}
        </button>
        <video 
          ref={screenRef} 
          width="500" 
          height="300" 
          autoPlay 
          controls
          className="border border-gray-300 rounded"
        ></video>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Location Information</h2>
        
        <div className="mb-2">
          <span className="mr-2">Permission Status:</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${locationPermission === 'granted' ? 'bg-green-100 text-green-800' : 
              locationPermission === 'denied' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'}`}>
            {locationPermission === 'granted' ? '✓ Allowed' :
             locationPermission === 'denied' ? '✗ Blocked' :
             '? Not set'}
          </span>
        </div>

        {locationPermission === 'denied' && (
          <div className="mb-2 p-3 bg-red-50 text-red-700 rounded">
            Location access is blocked. Please enable it in your browser settings by clicking the 
            lock/shield icon in the address bar and allowing location access.
          </div>
        )}
        
        <button 
          onClick={getLocation}
          className={`px-4 py-2 rounded mb-2 text-white
            ${locationPermission === 'denied' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-500 hover:bg-purple-600'}`}
          disabled={locationPermission === 'denied'}
        >
          Get Location
        </button>

        {location && (
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Latitude:</strong> {location.latitude}</p>
            <p><strong>Longitude:</strong> {location.longitude}</p>
            <p><strong>Accuracy:</strong> {location.accuracy} meters</p>
            <p><strong>Timestamp:</strong> {location.timestamp}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaTrack;