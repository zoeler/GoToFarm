import React from 'react'
import { useState, useEffect } from 'react'
import { useCart } from '../../components/utils/useCart'
import { useNavigate } from 'react-router-dom'

function CartSum(props) {
  const { couponPrice } = props
  const myCart = useCart().cart

  //頁面跳轉
  const navigate = useNavigate()

  //滾動效果
  const [scrollTop, setScrollTop] = useState(false)
  useEffect(() => {
    const handleScroll = (event) => {
      let h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight'
      let percent =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
      if (Math.floor(percent) > 60) {
        setScrollTop(true)
      } else {
        setScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <section className="Sum1 p-4 font-B">
        <div className="container d-flex justify-content-center pb-5 pt-4">
          <div className="flex-row d-flex gap-1 gap-xl-4 offset-lg-3 justify-content-center align-items-center flex-wrap">
            <div>
              <span className="f-16 f-Gray sp-1">總金額</span>
              <span className="f-24 f-LightGreen sp-2 px-2">
                {myCart.cartTotal}
              </span>
              <span className="f-16 f-Gray sp-1">NTD</span>
            </div>
            <button
              className="C-cartbutton f-24 sp-3 f-Brown"
              onClick={() => {
                navigate('/Payment')
              }}
            >
              前往結帳
              <img src="./Buttons/cart-line.svg" alt="cart-line" />
            </button>
          </div>
        </div>
      </section>

      <section className={scrollTop ? 'Sum2 ds-none' : 'Sum2'}>
        <div className="C-Summary backgound-w rounded-20-tl-tr shadow-1 p-5 font-B">
          <div className="container h-100 d-flex justify-content-center">
            <div className="flex-row d-flex me-5 gap-1 gap-xl-4 offset-lg-3 justify-content-center align-items-center flex-wrap">
              {/* <div
                className="d-flex align-items-center C-coupon"
                onClick={() => {
                  setShowSelect(true)
                  console.log(showSelect)
                }}
              >
                <button>
                  <img src="./Icons/coupon.svg" alt="coupon" />
                </button>
                <span className="f-16 f-Yellow ms-2">
                  套用折扣: {couponPrice ? couponPrice + couponStr : '無'}
                </span>
              </div> */}
              <div>
                <span className="f-16 f-Gray sp-1">總金額</span>
                <span className="f-24 f-LightGreen sp-2 px-2">
                  {myCart.cartTotal}
                </span>
                <span className="f-16 f-Gray sp-1">NTD</span>
              </div>
              <button
                className="C-cartbutton f-24 sp-3 f-Brown"
                onClick={() => {
                  navigate('/Payment')
                }}
              >
                前往結帳
                <img src="./Buttons/cart-line.svg" alt="cart-line" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CartSum
