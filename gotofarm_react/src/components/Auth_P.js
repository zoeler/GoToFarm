import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../icon/Icon'

function Auth_P({ setAlertLogin }) {
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
    <div className="D-Blur">
      <div className="d-flex justify-content-center w-100 h-100">
        <div className="P-LoginAlert">
          <Icon.Delete
            style={{
              position: 'absolute',
              top: '10%',
              left: '90%',
              cursor: 'pointer',
            }}
            onClick={() => {
              setAlertLogin(false)
            }}
          />
          <span className="f-24 f-Brown mb-3 font-M">
            請先登入小農遊網站唷!
          </span>
          <button
            className="C-cartbutton f-24 sp-3 f-Brown font-M"
            onClick={() => navigate('/Login')}
          >
            點我登入
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth_P
