import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CountdowntoLogin(props) {
  const { startingMinutes = 111, startingSeconds = '' } = props
  const [mins, setMinutes] = useState(startingMinutes)
  const [secs, setSeconds] = useState(startingSeconds)
  const navigate = useNavigate()
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > -1) {
        setSeconds(secs - 1)
      }
      if (secs <= 1) {
        if (mins === 1) {
          clearInterval(sampleInterval)
        } else {
          setMinutes(mins - 1)
          setSeconds(5)
        }
      }
    }, 1000)
    return () => {
      clearInterval(sampleInterval)
      setTimeout("location.href='/login'", 6000)
    }
  })

  return <div className="login-span text-success fs-1">{secs}</div>
}
