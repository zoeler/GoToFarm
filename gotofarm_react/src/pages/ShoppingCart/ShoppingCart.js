import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COUPON_DATA } from '../../components/api_config'
import CartProduct from './CartProduct'
import CartLesson from './CartLesson'
import CartSum from './CartSum'
import CouponSelectP from './CouponSelectP'
import CouponSelectL from './CouponSelectL'
import DeleteConfirm from '../../components/DeleteConfirm'
import '../../css/shoppingcart.css'
import { useCart } from '../../components/utils/useCart'

function ShoppingCart() {
  //頁面跳轉
  const navigate = useNavigate()

  //抓取資料庫優惠卷
  const [coupondataP, setCouponDataP] = useState([])
  const [coupondataL, setCouponDataL] = useState([])

  useEffect(() => {
    // 設定功能
    console.log('useEffect--')
    getCouponP()
    getCouponL()

    return () => {
      // 解除功能
      console.log('unmount AbList--')
    }
  }, [])

  const myAuth = JSON.parse(localStorage.getItem('myAuth'))

  //抓取資料庫優惠卷
  const getCouponP = async () => {
    axios
      .post(
        `${COUPON_DATA}/p`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        setCouponDataP(response.data)
        console.log('p', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getCouponL = async () => {
    axios
      .post(
        `${COUPON_DATA}/l`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        setCouponDataL(response.data)
        console.log('l', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  //顯示優惠卷選擇框
  const [showSelectP, setShowSelectP] = useState(false)
  const [showSelectL, setShowSelectL] = useState(false)

  //選擇哪個優惠卷checkbox
  const [usecoupon, setUsecoupon] = useState(null)
  const { myCoupon, setMyCoupon } = useCart()

  //選擇的優惠卷的價格
  let initCouponPrice = 0
  try {
    initCouponPrice = JSON.parse(localStorage.getItem('usecoupon')).quota
    console.log('localinitCouponPrice', initCouponPrice)
  } catch (ex) {}
  const [couponPrice, setcouponPrice] = useState(initCouponPrice)

  const [couponCate, setCouponCate] = useState(0)
  console.log(couponCate)

  //確認刪除
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [removeItemsID, setRemoveItemsID] = useState('')

  return (
    <>
      <CouponSelectP
        coupondataP={coupondataP}
        showSelectP={showSelectP}
        setShowSelectP={setShowSelectP}
        usecoupon={usecoupon}
        setUsecoupon={setUsecoupon}
        couponPrice={couponPrice}
        setcouponPrice={setcouponPrice}
        setCouponCate={setCouponCate}
      ></CouponSelectP>
      <CouponSelectL
        coupondataL={coupondataL}
        showSelectL={showSelectL}
        setShowSelectL={setShowSelectL}
        usecoupon={usecoupon}
        setUsecoupon={setUsecoupon}
        couponPrice={couponPrice}
        setcouponPrice={setcouponPrice}
        setCouponCate={setCouponCate}
      ></CouponSelectL>
      <DeleteConfirm
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        removeItemsID={removeItemsID}
      ></DeleteConfirm>
      <div className="container h-100 py-5 font-B">
        <div className="C-Cartcontainer row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="row d-flex justify-content-between align-items-center mb-4 ">
              <h3 className="col-lg-4 col-md-12 col-sm-12 col-12 f-32 sp-3 mb-3 f-LightGreen">
                小農購物車
              </h3>

              <div className="col-lg-8 col-md-12 col-sm-12 col-12 d-flex justify-content-end align-items-center flex-row gap-2 ms-0">
                <div className="C-step f-16 f-Gray sp-2">
                  <button
                    className="C-circle C-active"
                    onClick={() => {
                      navigate('/Cart')
                    }}
                  >
                    01
                  </button>
                  <span>放入購物車</span>
                </div>
                <div className="C-dash"></div>
                <div className="C-step f-16 f-Gray sp-2">
                  <button className="C-circle">02</button>
                  <span>填寫資料</span>
                </div>
                <div className="C-dash"></div>
                <div className="C-step f-16 f-Gray sp-2">
                  <button className="C-circle">03</button>
                  <span>完成訂單</span>
                </div>
              </div>
            </div>
            <CartProduct
              setDeleteConfirm={setDeleteConfirm}
              setRemoveItemsID={setRemoveItemsID}
              setShowSelectP={setShowSelectP}
              showSelectP={showSelectP}
              setUsecoupon={setUsecoupon}
              couponPrice={couponPrice}
              setcouponPrice={setcouponPrice}
              couponCate={couponCate}
            ></CartProduct>
            <CartLesson
              setDeleteConfirm={setDeleteConfirm}
              setRemoveItemsID={setRemoveItemsID}
              setShowSelectL={setShowSelectL}
              showSelectL={showSelectL}
              setUsecoupon={setUsecoupon}
              couponPrice={couponPrice}
              setcouponPrice={setcouponPrice}
              couponCate={couponCate}
            ></CartLesson>
          </div>
        </div>
      </div>
      <CartSum
        coupondataP={coupondataP}
        coupondataL={coupondataL}
        setUsecoupon={setUsecoupon}
        couponPrice={couponPrice}
        setcouponPrice={setcouponPrice}
        couponCate={couponCate}
        setCouponCate={setCouponCate}
      ></CartSum>
    </>
  )
}

export default ShoppingCart
