import React, { useEffect, useRef, useState } from 'react'
import "./styles/actionStyles.css"

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
    const [idle, setIdle]=useState(false)

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
        const resetIdle=()=>{
            idleTimeRef.current=0
            setIdle(false)
        }

        const idleInterval = setInterval(()=>{
            idleTimeRef.current++
            if(idleTimeRef.current>7) {
                console.log("user is idle")
                setIdle(true)
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
            {/* {keyD && <div className="titles">key down: <p className='title-value'>{keyD}</p></div>}
            {keyU && <div className="titles">key up: <p className='title-value'>{keyU}</p></div>}
            {mouseMoveX && <div className="titles">mouse move X: <p className='title-value'>{mouseMoveX}</p></div>}
            {mouseMoveY && <div className="titles">mouse move Y: <p className='title-value'>{mouseMoveY}</p></div>}
            {mouseClickX && <div className="titles">mouse click X: <p className='title-value'>{mouseClickX}</p></div>}
            {mouseClickY && <div className="titles">mouse click Y: <p className='title-value'>{mouseClickY}</p></div>}
            {rightCl>0 && <div className="titles">right Click: <p className='title-value'>{rightCl}</p></div>}
            {cpy>0 && <div className="titles">content copied: <p className='title-value'>{cpy}</p></div>}
            {pst>0 && <div className="titles">content pasted: <p className='title-value'>{pst}</p></div>}
            {blrcnt>0 && <div className="titles">window out of focus count: <p className='title-value'>{blrcnt}</p></div>}
            {blr && <div className="titles">window out of focus<p className='title-value'>{blr}</p></div>}
            {fcs && <div className="titles">window in focus<p className='title-value'>{fcs}</p></div>}
            {docHidden && <div className="titles">document visibility hidden count: <p className='title-value'>{docHidden}</p></div>}
            {vsblty && <div className="titles">document visibility: <p className='title-value'>{vsblty}</p></div>}
            {idle && <div className="titles">user is idle</div>} */}

            {<div className="titles">key down: <p className='title-value'>{keyD}</p></div>}
            {<div className="titles">key up: <p className='title-value'>{keyU}</p></div>}
            {<div className="titles">mouse move X: <p className='title-value'>{mouseMoveX}</p></div>}
            {<div className="titles">mouse move Y: <p className='title-value'>{mouseMoveY}</p></div>}
            {<div className="titles">mouse click X: <p className='title-value'>{mouseClickX}</p></div>}
            {<div className="titles">mouse click Y: <p className='title-value'>{mouseClickY}</p></div>}
            {<div className="titles">right Click: <p className='title-value'>{rightCl}</p></div>}
            {<div className="titles">content copied: <p className='title-value'>{cpy}</p></div>}
            {<div className="titles">content pasted: <p className='title-value'>{pst}</p></div>}
            {<div className="titles">window out of focus count: <p className='title-value'>{blrcnt}</p></div>}
            {<div className="titles">window out of focus<p className='title-value'>{blr}</p></div>}
            {<div className="titles">window in focus<p className='title-value'>{fcs}</p></div>}
            {<div className="titles">document visibility hidden count: <p className='title-value'>{docHidden}</p></div>}
            {<div className="titles">document visibility: <p className='title-value'>{vsblty}</p></div>}
            {<div className="titles">user is idle</div>}
        </div>
    </div>
  )
}

export default ActionTrack