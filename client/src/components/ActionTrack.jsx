import React, { useEffect, useRef, useState } from 'react'

const ActionTrack = () => {

    const [keyD, setKeyD]=useState("")
    const [keyU, setKeyU]=useState("")
    const [mouseMoveX,setMouseMoveX]=useState("")
    const [mouseMoveY,setMouseMoveY]=useState("")
    const [mouseClickX,setMouseClickX]=useState("")
    const [mouseClickY,setMouseClickY]=useState("")
    const [rightCl, setRightCl]=useState(0)
    const [cpy, setCpy]=useState(0)
    const [pst, setPst]=useState(0)
    const [blr, setBlr]=useState(false)
    const [blrcnt, setBlrcnt]=useState(0)
    const [fcs, setFcs]=useState(true)
    const [vsblty, setVsblty]=useState("")
    const [docHidden, setDocHidden]=useState(0)

    const idleTimeRef=useRef(0)

    useEffect(()=>{

        const originalFetch=window.fetch
        window.fetch=(...args)=>{
            console.log("network request detected", args)
            return originalFetch(...args)
        }

        const handleKeyDown=(e)=>{
            console.log(`Key Down: ${e.key}`)
            setKeyD(e.key)
        }

        const handleKeyUp=(e)=>{
            console.log(`Key Up: ${e.key}`)
            setKeyU(e.key)
        }

        const handleMouseMove=(e)=>{
            console.log(`Mouse moved to: X=${e.clientX}, Y=${e.clientY}`)
            setMouseMoveX(e.clientX)
            setMouseMoveY(e.clientY)
        }

        const handleClick=(e)=>{
            console.log(`Mouse clicked at: X=${e.clientX}, Y=${e.clientY}`)
            setMouseClickX(e.clientX)
            setMouseClickY(e.clientY)
        }

        const handleContextMenu=(e)=>{
            // e.preventDefault()
            console.log("right click detected")
            setRightCl(prevRightCl => prevRightCl + 1)
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
            setBlr(true)
            setFcs(false)
            setBlrcnt(prev=>prev+1)
        }

        const handleFocus=()=>{
            console.log("window back in focus")
            setBlr(false)
            setFcs(true)
        }

        const handleVisibilityChange=()=>{
            console.log(`Document visibility: ${document.visibilityState}`)
            setVsblty(document.visibilityState)
            if(document.visibilityState=="hidden")
            {
                setDocHidden(prev=>prev+1)
            }
        }

        const handleCopy=()=>{
            console.log("content copied")
            setCpy(prev=>prev+1)
        }

        const handlePaste=()=>{
            console.log("content pasted")
            setPst(prev=>prev+1)
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
            {keyD && <div>key down: {keyD}</div>}
            {keyU && <div>key up: {keyU}</div>}
            {mouseMoveX && <div>mouse move X: {mouseMoveX}</div>}
            {mouseMoveY && <div>mouse move Y: {mouseMoveY}</div>}
            {mouseClickX && <div>mouse click X: {mouseClickX}</div>}
            {mouseClickY && <div>mouse click Y: {mouseClickY}</div>}
            {rightCl>0 && <div>right Click: {rightCl}</div>}
            {cpy>0 && <div>content copied: {cpy}</div>}
            {pst>0 && <div>content pasted: {pst}</div>}
            {blrcnt>0 && <div>window out of focus count: {blrcnt}</div>}
            {blr && <div>window out of focus{blr}</div>}
            {fcs && <div>window in focus{fcs}</div>}
            {docHidden && <div>document visibility hidden count: {docHidden}</div>}
            {vsblty && <div>document visibility: {vsblty}</div>}
        </div>
    </div>
  )
}

export default ActionTrack