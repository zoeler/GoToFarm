import React from 'react'
import LinePayConfirm from '../../components/LinePayConfirm'
import { useState } from 'react'
import { useCart } from '../../components/utils/useCart'
import axios from 'axios'
function LinePay(props) {
  const { sendCartData } = props
  const { clearCart } = useCart()

  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const [order, setOrder] = useState({})

  // 用useCart抓
  const myCart = useCart().cart.items
  console.log(myCart)
  //分課程跟產品
  const lessonCart = myCart.filter((value) => value.id.indexOf('lesson') !== -1)
  const productCart = myCart.filter(
    (value) => value.id.indexOf('product') !== -1
  )
  console.log(lessonCart)
  console.log(productCart)

  const sumPrice = useCart().cart.cartTotal

  const createOrder = async () => {
    // 送至server建立訂單，packages與order id由server產生
    // products將會組合在packages屬性之下
    const response = await axios.post(`/api/pay/create-order`, {
      amount: sumPrice,
      products: myCart,
    })

    // TODO: try-catch錯誤處理
    setOrder(response.data)
    console.log('order', order)
  }
  return (
    <>
      <LinePayConfirm
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        order={order}
      ></LinePayConfirm>
      {/* <div className="d-flex flex-column C-Payheight mt-3">
        <div className="C-Linepay-2 mb-3">
          <img src="./../../Images/Line-Pay.png" alt="Line-Pay.png" />
        </div>
        <div className="f-Brown sp-1 mb-3">
          歡迎使用LinePay支付，點選按鈕將會導向LinePay支付
        </div> */}
      <button
        className="C-cartbutton f-24 sp-3 f-Brown"
        onClick={() => {
          setDeleteConfirm(true)
          createOrder()
          sendCartData()
          clearCart()
          localStorage.removeItem('usecoupon')
        }}
      >
        前往付款
      </button>
      {/* </div> */}
    </>
  )
}

export default LinePay
