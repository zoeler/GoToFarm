import React from 'react'
import { useRef, useEffect } from 'react'

function LinePayConfirm(props) {
  const { deleteConfirm, setDeleteConfirm, order } = props
  //點擊選單外的範圍，關閉選單
  const dropdownRefR = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRefR.current &&
        !dropdownRefR.current.contains(event.target)
      ) {
        // alert('You clicked outside of me!')
        setDeleteConfirm(false)
        console.log(deleteConfirm)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRefR])
  return (
    <>
      {deleteConfirm && (
        <div className="C-Blur">
          <div className="d-flex justify-content-center w-100 h-100">
            <div className="C-DeleteAlert f-M" ref={dropdownRefR}>
              <span className="f-24 f-Brown">
                確認要導向至LINE Pay進行付款？
              </span>
              <div className="d-flex gap-3 mt-3">
                <button
                  className="C-Deletebutton f-20 sp-3 f-Brown"
                  onClick={() => {
                    //  在本window直接導至node付款(reverse)url，之後會導向至line pay
                    window.location.href =
                      process.env.REACT_APP_PAYMENT_API_URL +
                      '?orderId=' +
                      order.orderId
                  }}
                >
                  確認付款
                </button>
                <button
                  className="C-DeletebuttonGray f-20 sp-3 f-Brown"
                  onClick={() => {
                    setDeleteConfirm(false)
                  }}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LinePayConfirm
