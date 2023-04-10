import React from 'react'
import { useCart } from '../../components/utils/useCart'
import { useRef, useEffect } from 'react'

function CouponSelectL(props) {
  const {
    coupondataL,
    showSelectL,
    setShowSelectL,
    usecoupon,
    setUsecoupon,
    setcouponPrice,
    setCouponCate,
  } = props
  const { reloadItems, myCoupon, setMyCoupon } = useCart()
  console.log('myCoupon', myCoupon)

  //點擊範圍外關閉優惠卷
  const dropdownRefC = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRefC.current &&
        !dropdownRefC.current.contains(event.target)
      ) {
        setShowSelectL(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRefC])
  //選擇優惠卷toggle
  const handleToggle = (Csid) => {
    if (usecoupon === Csid) {
      setUsecoupon(null) // 如果已經選中，則取消選中
    } else {
      setUsecoupon(Csid) // 否則選中它
    }
  }

  return (
    <>
      <section className={showSelectL ? 'C-Blur' : 'C-Blur ds-none'}>
        <div className="row d-flex justify-content-center h-100 font-B">
          <div
            className="C-CouponBody d-flex flex-column col-10 col-md-6 col-lg-3 backgound-w shadow-1 rounded-20 p-4 pt-5"
            ref={dropdownRefC}
          >
            <h3 className="f-24 sp-3 mb-3 f-Yellow">選擇優惠卷</h3>
            {coupondataL.map((c) => {
              return (
                <div
                  className="C-Coupon rounded-1 mb-3 d-flex col-12 "
                  key={c.sid}
                >
                  <div className="C-couponimg col-3 col-md-3 col-lg-3">
                    <img
                      src={`http://localhost:3033/images/coupon/${c.coupon_img}`}
                      alt="couponimg"
                    />
                  </div>
                  <div className="C-Coupon-2 d-flex align-items-center p-md-2">
                    <div className="px-1 px-md-2 C-coupontitle col-8 col-md-8 col-lg-9">
                      <p className="f-18 fw-normal mb-1 f-Brown">
                        {c.coupon_name}
                      </p>
                      <span className="f-13 f-Gray">
                        {c.coupon_discription}
                      </span>
                    </div>
                    <div className="d-flex flex-column align-items-center col-4 col-md-4 col-lg-3">
                      <div className="C-discount pb-2">
                        <span className="f-18 sp-1 f-DarkGreen">
                          {c.coupon_quota}
                        </span>
                        <span className="f-Gray">
                          {c.coupon_category === 1 ? 'NTD' : '%'}
                        </span>
                      </div>
                      <div>
                        <div className="C-toggle-button-cover">
                          <div className="C-button C-r" id="button-1">
                            <input
                              type="checkbox"
                              className="C-checkbox"
                              checked={usecoupon === c.sid}
                              onChange={() => {
                                handleToggle(c.sid)
                                setcouponPrice(c.coupon_quota)
                                setCouponCate(c.coupon_category)
                                setMyCoupon((old) => {
                                  const my = {
                                    sid: c.sid,
                                    quota: c.coupon_quota,
                                    cate: c.coupon_category,
                                  }
                                  localStorage.setItem(
                                    'usecoupon',
                                    JSON.stringify(my)
                                  )
                                  return my
                                })
                                console.log(myCoupon)
                              }}
                            />
                            <div className="C-knobs"></div>
                            <div className="C-layer"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="d-flex justify-content-end gap-2">
              <button
                className="C-couponbuttonGray f-16 sp-3 f-Brown"
                onClick={() => {
                  setShowSelectL(false)
                  reloadItems()
                  localStorage.removeItem('usecoupon')
                  setcouponPrice(0)
                }}
              >
                取消
              </button>
              <button
                className="C-couponbutton f-16 sp-3 f-Brown"
                onClick={() => {
                  setShowSelectL(false)
                  reloadItems()
                }}
              >
                確定使用
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CouponSelectL
