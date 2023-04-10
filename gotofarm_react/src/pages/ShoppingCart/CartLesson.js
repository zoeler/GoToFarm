import React from 'react'
import { useCart } from '../../components/utils/useCart'
import { Link } from 'react-router-dom'
import {
  ListMotionContainer,
  ListMotionItem,
} from '../../components/ListMotion'

function CartLesson(props) {
  const { plusOne, minusOne, reloadItems } = useCart()
  const {
    setDeleteConfirm,
    setRemoveItemsID,
    setShowSelectL,
    couponPrice,
    couponCate,
  } = props
  let cart = []
  let lessonCart = []
  let lessonCartCount = 0
  try {
    cart = JSON.parse(localStorage.getItem('cart'))
    lessonCart = cart.filter((value) => value.id.indexOf('lesson') !== -1)
    lessonCartCount = lessonCart.length
  } catch (ex) {}

  return (
    <>
      {!lessonCart.length ? (
        <div
          className="C-Cart-l backgound-w rounded-20 mb-4 shadow-1 p-2 p-sm-3 p-lg-4 font-B"
          data-count={lessonCartCount}
        >
          <div className="d-flex align-items-center justify-content-center w-100 gap-3">
            <div className="C-notfound">
              <img
                src="./../../Images/notfound.png"
                alt="notfound"
                className="img-fluid"
              />
            </div>
            <span className="C-notext f-Khaki">尚無購買課程唷</span>
            <div className="C-notfound">
              <img
                src="./../../Images/notfound.png"
                alt="notfound"
                className="img-fluid"
              />
            </div>
            <Link to="/lesson">
              <div className="C-gotoshop">
                <img
                  src="./../../Images/findLesson-2.png"
                  alt="notfound"
                  className="img-fluid"
                />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="C-Cart-l backgound-w rounded-20 mb-4 shadow-1 p-2 p-sm-3 p-lg-4"
          data-count={lessonCartCount}
        >
          <div className="C-title px-2 py-2 px-lg-4 pt-lg-4 ">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="C-title-1">
                <span className="f-16 f-Gray sp-1">產品名稱</span>
              </div>
              <div className="C-title-group d-flex flex-row">
                <div className="C-title-2">
                  <span className="f-16 f-Gray sp-1">單件價格</span>
                </div>
                <div className="C-title-3">
                  <span className="f-16 f-Gray sp-1">數量</span>
                </div>
                <div className="C-title-4">
                  <span className="f-16 f-Gray sp-1">小計</span>
                </div>
                <div className="C-title-5"></div>
              </div>
            </div>
            <div className="C-underline"></div>
          </div>
          <ListMotionContainer element="div" className="row ">
            {lessonCart.map((l) => {
              return (
                <ListMotionItem key={l.sid} element="div" noShift>
                  <div className="C-Item px-3 py-3 px-lg-4" key={l.id}>
                    <div className="d-flex flex-row align-items-center flex-wrap">
                      <div className="C-Item-l1 d-flex flex-row align-items-center gap-lg-3 gap-2">
                        <div className="C-productimg">
                          <img
                            src={`http://localhost:3033/images/lesson/${l.img}`}
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div>
                          <p className="f-24 fw-normal mb-1 f-Brown">
                            {l.name}
                          </p>
                        </div>
                        <div className="C-date d-flex flex-row gap-1 ms-auto">
                          <img src="./Icons/calendar.svg" alt="calender" />
                          <div className="d-flex flex-column">
                            <span className="f-16 f-Gray">{l.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="C-Item-l2 d-flex flex-row align-items-center">
                        <div className="C-price-1">
                          <span className="f-20 sp-1 f-Gray">{l.price}</span>
                          <span className="f-16 f-Gray">NTD</span>
                        </div>
                        <div className="C-counter d-flex">
                          <button
                            className="less"
                            onClick={() => {
                              minusOne(l.id)
                              reloadItems()
                            }}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            name="quantity"
                            value={l.quantity}
                            type="number"
                            className="C-counternum no-outline:focus"
                          />

                          <button
                            className="more"
                            onClick={() => {
                              plusOne(l.id)
                              reloadItems()
                            }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="C-price">
                          <span className="f-20 sp-1 f-DarkGreen">
                            {l.itemTotal}
                          </span>
                          <span className="f-Gray">NTD</span>
                        </div>
                        <div
                          className="C-delete"
                          onClick={() => {
                            setDeleteConfirm(true)
                            setRemoveItemsID(l.id)
                          }}
                        >
                          <img
                            src="./Icons/delete.svg"
                            className="img-fluid"
                            alt="delete"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="C-underline"></div>
                  </div>
                </ListMotionItem>
              )
            })}
          </ListMotionContainer>
          <div
            className="d-flex w-100 justify-content-end C-coupon"
            onClick={() => {
              setShowSelectL(true)
            }}
          >
            <button>
              <img src="./Icons/coupon.svg" alt="coupon" />
            </button>
            <span className="f-16 f-Yellow ms-2">
              套用折扣:
              {couponPrice && couponCate === 1 ? couponPrice + 'NTD' : '無'}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default CartLesson
