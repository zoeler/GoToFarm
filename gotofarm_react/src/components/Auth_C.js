import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../icon/Icon'

function Auth_C({ setLimitAlert }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   const myAuth = localStorage.getItem('myAuth')
  //   setIsLoggedIn(Boolean(myAuth))
  // }, [])

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
              setLimitAlert(false)
            }}
          />
          <span className="f-24 f-Brown mb-3 font-M">報名人數已額滿</span>
        </div>
      </div>
    </div>
  )
}

export default Auth_C
