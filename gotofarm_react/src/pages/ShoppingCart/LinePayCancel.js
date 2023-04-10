import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LinePayCancel(props) {
  const [countdown, setCountdown] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(countdown - 1)
    }, 1000)
    if (countdown === 0) {
      clearInterval(timer)
      navigate('/Cart')
    }
    return () => clearInterval(timer)
  }, [countdown])
  return (
    <>
      <div className="w-100 d-flex justify-content-center align-item-center">
        <div className="d-flex flex-column C-LineCancel justify-content-center">
          <div className="d-flex">
            <div className="C-notfound">
              <img
                src="./../../Images/notfound.png"
                alt="notfound"
                className="img-fluid"
              />
            </div>
            <h2 className="f-B f-Brown">已取消付款</h2>
            <div className="C-notfound">
              <img
                src="./../../Images/notfound.png"
                alt="notfound"
                className="img-fluid"
              />
            </div>
          </div>
          <div>
            {countdown > 0 && (
              <div className=" f-20 w-100 d-flex justify-content-center f-M">
                <span className="f-LightGreen">{countdown}</span>
                <span className="f-Brown">秒後將跳轉至購物車</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LinePayCancel
