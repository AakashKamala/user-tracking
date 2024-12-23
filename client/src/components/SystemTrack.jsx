// import React from 'react'

// const SystemTrack = () => {

//     const handleClipboard=async()=>{
//         try {
//             const text = await navigator.clipboard.readText();
//             console.log('Clipboard content:', text);
//           } catch (err) {
//             console.error('Failed to read clipboard:', err);
//           }
//     }
//   return (
//     <div>
//         <h1>SystemTrack</h1>
//         <button onClick={handleClipboard}>Clipboard contents(sensitive)</button>
//     </div>
//   )
// }

// export default SystemTrack



import React from 'react'
import ClipboardReader from './ClipboardReader'

const SystemTrack = () => {
  return (
    <div>
        <ClipboardReader />
    </div>
  )
}

export default SystemTrack