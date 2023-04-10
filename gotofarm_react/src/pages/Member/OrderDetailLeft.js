import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { MY_ORDER_DETAILS } from '../../components/api_config'
import { useParams } from 'react-router-dom'

function OrderDetailLeft() {
  const [orderDetailsL, setorderDetailsL] = useState([])
  const [orderDetailsP, setorderDetailsP] = useState([])
  const [coupon, setCoupon] = useState()
  const [sumprice, setSumprice] = useState([])
  const [remark, setRemark] = useState([])

  console.log('L', orderDetailsL)
  console.log('P', orderDetailsP)
  console.log('C', coupon)
  console.log('S', sumprice)

  const { uuid } = useParams()
  useEffect(() => {
    // 設定功能
    console.log('useEffect--')
    getOrderListData(uuid)

    return () => {
      // 解除功能
      console.log('unmount AbList--')
    }
  }, [])
  const getOrderListData = async (uuid = 0) => {
    axios
      .get(`${MY_ORDER_DETAILS}/${uuid}`, {
        params: { uuid },
      })
      .then((response) => {
        // 在此處處理回應
        setorderDetailsL(response.data.order_lesson_details)
        setorderDetailsP(response.data.order_product_details)
        setCoupon(response.data.r_sql_coupon)
        setSumprice(response.data.sumprice)
        setRemark(response.data.remark)
      })
      .catch((error) => {
        // 在此處處理錯誤
        console.error(error)
      })
  }

  return (
    <>
      <div className="C-Order w-100 backgound-w rounded-20 mb-4 shadow-1 p-5 f-B">
        <h4 className="C-paytitle">訂單明細</h4>
        <div className="C-underline"></div>
        {orderDetailsP.map((c) => {
          return (
            <div className="C-Item pt-4" key={c.sid}>
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-7 d-flex gap-2 align-items-center">
                  <img
                    src={`http://localhost:3033/images/product/${c.product_img}`}
                    className="img-fluid rounded-20"
                    alt="Cotton T-shirt"
                  />
                  <p className="f-20 mt-3 f-Brown">{c.product_name}</p>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <div className="C-quantity">
                    <span className="f-20 f-DarkGreen sp-1">
                      {c.product_quantity}
                    </span>
                    <span className="f-16 f-Gray">份</span>
                  </div>
                  <div className="C-price text-end">
                    <span className="f-20 f-DarkGreen sp-1">
                      {c.product_price}
                    </span>
                    <span className="f-16 f-Gray">NTD</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {orderDetailsL.map((c) => {
          return (
            <div className="C-Item pt-4" key={c.sid}>
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-7 d-flex gap-2 align-items-center">
                  <img
                    src={`http://localhost:3033/images/lesson/${c.lesson_img}`}
                    className="img-fluid rounded-20"
                    alt="Cotton T-shirt"
                  />
                  <p className="f-20 mt-3 f-Brown">{c.lesson_name}</p>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <div className="C-quantity">
                    <span className="f-20 f-DarkGreen sp-1">
                      {c.lesson_quantity}
                    </span>
                    <span className="f-16 f-Gray">份</span>
                  </div>
                  <div className="C-price text-end">
                    <span className="f-20 f-DarkGreen sp-1">
                      {c.lesson_price}
                    </span>
                    <span className="f-16 f-Gray">NTD</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="C-underline"></div>
        <div className="C-Sum text-end f-20 sp-2 mt-4">
          <span className="f-16 f-Yellow me-3">
            套用折扣:{' '}
            {coupon
              ? coupon[0].coupon_quota +
                (coupon[0].coupon_category === 1 ? 'NTD' : '%')
              : '無'}
          </span>
          <span className="f-16 f-Yellow me-3"></span>
          <span className="f-Brown ">合計:{sumprice}</span>
          <span className="f-DarkGreen"></span>
          <span className="f-Brown">NTD</span>
        </div>
        <h4 className="C-paytitle mt-5">訂單備註</h4>
        <div className="M-underline mt-3"></div>
        <div className="M-remark py-3 f-DarkGreen">
          {remark ? remark : '無備註'}
        </div>
        <div className="M-underline"></div>
      </div>
    </>
  )
}

export default OrderDetailLeft
