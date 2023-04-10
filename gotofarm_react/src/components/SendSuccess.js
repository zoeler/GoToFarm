import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function SendSuccess(props) {
  const navigate = useNavigate()
  const { sendSuccess } = props
  useEffect(() => {
    if (sendSuccess) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [sendSuccess])
  return (
    <>
      {sendSuccess ? (
        <div className="D-Blur">
          <div className="d-flex justify-content-center w-100 h-100">
            <div className="C-DeleteAlert f-M">
              <span className="f-24 f-Brown">寄送訂單成功</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="C-Blur">
          <div className="d-flex justify-content-center w-100 h-100">
            <div className="C-DeleteAlert f-M">
              <span className="f-24 f-Brown C-fail mb-3">
                寄送訂單失敗，請確認輸入資料或連繫客服
              </span>
              <button
                className="C-DeletebuttonGray f-20 sp-3 f-Brown"
                onClick={() => {
                  navigate('/Cart')
                }}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SendSuccess
