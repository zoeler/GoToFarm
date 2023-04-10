import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const myAuth = localStorage.getItem('myAuth')
    setIsLoggedIn(Boolean(myAuth))
  }, [])

  if (isLoggedIn) {
    return ''
  }

  return (
    <div className="C-Blur">
      <div className="d-flex justify-content-center w-100 h-100 align-items-center">
        <div className="C-LoginAlert">
          <span className="f-24 f-Brown f-M mb-2">請先登入小農遊網站唷!</span>
          <button
            className="C-cartbutton f-24 sp-3 f-Brown f-M"
            onClick={() => navigate('/Login')}
          >
            點我登入
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
