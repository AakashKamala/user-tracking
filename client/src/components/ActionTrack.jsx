import React, { useEffect, useRef, useState } from 'react'

const ActionTrack = () => {

    const [keyD, setKeyD]=useState("")
    const [keyU, setKeyU]=useState("")
    const [mouseMoveX,setMouseMoveX]=useState("")
    const [mouseMoveY,setMouseMoveY]=useState("")
    const [mouseClickX,setMouseClickX]=useState("")
    const [mouseClickY,setMouseClickY]=useState("")
    const [rightCl, setRightCl]=useState("")
    const [cpy, setCpy]=useState()
    const [pst, setPst]=useState("")
    const [blr, setBlr]=useState("")
    const [fcs, setFcs]=useState("")
    const [vsblty, setVsblty]=useState("")

    const idleTimeRef=useRef(0)

    useEffect(()=>{

        const originalFetch=window.fetch
        window.fetch=(...args)=>{
            console.log("network request detected", args)
            return originalFetch(...args)
        }

        const handleKeyDown=(e)=>{
            console.log(`Key Down: ${e.key}`)
        }

        const handleKeyUp=(e)=>{
            console.log(`Key Up: ${e.key}`)
        }

        const handleMouseMove=(e)=>{
            console.log(`Mouse moved to: X=${e.clientX}, Y=${e.clientY}`)
        }

        const handleClick=(e)=>{
            console.log(`Mouse clicked at: X=${e.clientX}, Y=${e.clientY}`)
        }

        const handleContextMenu=(e)=>{
            // e.preventDefault()
            console.log("right click detected")
        }

        const handleTouchStart=(e)=>{
            console.log("touch started", e.touches)
        }

        const handleTouchEnd=(e)=>{
            console.log("touch ended")
        }

        const handleTouchMove=(e)=>{
            console.log("touch moved", e.touches)
        }

        const handleBlur=()=>{
            console.log("window out of focus")
        }

        const handleFocus=()=>{
            console.log("window back in focus")
        }

        const handleVisibilityChange=()=>{
            console.log(`Document visibility: ${document.visibilityState}`)
        }

        const handleCopy=()=>{
            console.log("content copied")
        }

        const handlePaste=()=>{
            console.log("content pasted")
        }

        //idle time section
        const resetIdle=()=>{idleTimeRef.current=0}

        const idleInterval = setInterval(()=>{
            idleTimeRef.current++
            if(idleTimeRef.current>7) {
                console.log("user is idle")
            }
        }, 1000)

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("click", handleClick)
        document.addEventListener("contextmenu", handleContextMenu)
        document.addEventListener("touchstart", handleTouchStart)
        document.addEventListener("touchend", handleTouchEnd)
        document.addEventListener("touchmove", handleTouchMove)
        window.addEventListener("blur", handleBlur)
        window.addEventListener("focus", handleFocus)
        window.addEventListener("visibilitychange", handleVisibilityChange)
        document.addEventListener("copy", handleCopy)
        document.addEventListener("paste", handlePaste)

        document.addEventListener("mousemove", resetIdle)
        document.addEventListener("keypress", resetIdle)

        return ()=>{

            window.fetch = originalFetch;

            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("click", handleClick)
            document.removeEventListener("contextmenu", handleContextMenu)
            document.removeEventListener("touchstart", handleTouchStart)
            document.removeEventListener("touchend", handleTouchEnd)
            document.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("blur", handleBlur)
            window.removeEventListener("focus", handleFocus)
            window.removeEventListener("visibilitychange", handleVisibilityChange)
            document.removeEventListener("copy", handleCopy)
            document.removeEventListener("paste", handlePaste)

            clearInterval(idleInterval);
            document.removeEventListener("mousemove", resetIdle)
            document.removeEventListener("keypress", resetIdle)
        }

    },[])

  return (
    <div>
        <div>Track</div>
        <div>
            {keyD && <div>{keyD}</div>}
            {keyU && <div>{keyU}</div>}
            {mouseMoveX && <div>{mouseMoveX}</div>}
            {mouseMoveY && <div>{mouseMoveY}</div>}
            {mouseClickX && <div>{mouseClickX}</div>}
            {mouseClickY && <div>{mouseClickY}</div>}
            {rightCl && <div>{rightCl}</div>}
            {cpy && <div>{cpy}</div>}
            {pst && <div>{pst}</div>}
            {blr && <div>{blr}</div>}
            {fcs && <div>{fcs}</div>}
            {vsblty && <div>{vsblty}</div>}
        </div>
    </div>
  )
}

export default ActionTrack