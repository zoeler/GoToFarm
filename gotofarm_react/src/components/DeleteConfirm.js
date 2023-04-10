import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { useCart } from './utils/useCart'
import { useRef, useEffect } from 'react'

function DeleteConfirm(props) {
  // const navigate = useNavigate()
  const { deleteConfirm, setDeleteConfirm, removeItemsID } = props
  const { removeItem, reloadItems } = useCart()

  //點擊選單外的範圍，關閉選單
  const dropdownRefR = useRef(null)
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
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
        <div className="D-Blur">
          <div className="d-flex justify-content-center w-100 h-100">
            <div className="C-DeleteAlert f-M" ref={dropdownRefR}>
              <span className="f-24 f-Brown">確定不購買此項商品嗎?</span>
              <div className="d-flex gap-3 mt-3">
                <button
                  className="C-Deletebutton f-20 sp-3 f-Brown"
                  onClick={() => {
                    removeItem(removeItemsID)
                    reloadItems()
                    setDeleteConfirm(false)
                    console.log(deleteConfirm)
                  }}
                >
                  確定取消
                </button>
                <button
                  className="C-DeletebuttonGray f-20 sp-3 f-Brown"
                  onClick={() => {
                    setDeleteConfirm(false)
                    console.log(deleteConfirm)
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

export default DeleteConfirm
