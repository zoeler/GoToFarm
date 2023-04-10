import { useState, useEffect } from 'react'
import { useCart } from '../../components/utils/useCart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SendSuccess from '../../components/SendSuccess'
import { MY_ADDRESS_DATA } from '../../components/api_config'
import LinePayButton from './LinePayButton'
import Auth from '../../components/Auth'

function ShoppingConfirm() {
  //判定是LinePay還是信用卡
  const { myPayment } = useCart()

  // 用useCart抓購物資料
  const myCart = useCart().cart.items
  const { clearCart } = useCart()
  //分產品跟課程
  const lessonCart = myCart.filter((value) => value.id.indexOf('lesson') !== -1)
  const productCart = myCart.filter(
    (value) => value.id.indexOf('product') !== -1
  )
  const sumPrice = useCart().cart.cartTotal
  const Payment = useCart().myPayment

  //頁面跳轉
  const navigate = useNavigate()

  //傳送localStorage中的ID給後端
  const cart = JSON.parse(localStorage.getItem('cart'))

  //傳送localStorage中的member給後端
  let member = {}
  try {
    member = JSON.parse(localStorage.getItem('myAuth')).accountId
  } catch (ex) {}
  console.log('member', member)

  //傳送localStorage中的coupon給後端
  let couponSid = 0
  try {
    couponSid = JSON.parse(localStorage.getItem('usecoupon')).sid
  } catch (ex) {}
  console.log('coupon', couponSid)

  let orderRemark = ''
  try {
    orderRemark = JSON.parse(localStorage.getItem('orderPayment')).remark
  } catch (ex) {}
  console.log(orderRemark)

  const [myAddress, setMyAddress] = useState([])
  const myAuth = JSON.parse(localStorage.getItem('myAuth'))
  useEffect(() => {
    // 設定功能
    console.log('useEffect--')
    getMemberData()

    return () => {
      // 解除功能
      console.log('unmount')
    }
  }, [])
  const getMemberData = async () => {
    axios
      .post(
        MY_ADDRESS_DATA,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        setMyAddress(response.data)
        console.log(response.data)
        // 在此處處理回應
      })
      .catch((error) => {
        // 在此處處理錯誤
        console.error(error)
      })
  }

  const sendCartData = async () => {
    axios
      .post('http://localhost:3033/shoppingcart', {
        cart: cart,
        coupon: couponSid,
        member: member,
        orderRemark: orderRemark,
      })
      .then((response) => {
        console.log(response.data)
        console.log(response.data.success)
        setSendSuccess(response.data.success)
        // 在此處處理回應
      })
      .catch((error) => {
        // 在此處處理錯誤
        console.error(error)
      })
  }
  const [showSend, setShowSend] = useState(false)
  //送出訂單有無成功
  const [sendSuccess, setSendSuccess] = useState(false)
  //給前端渲染用
  let coupon = {}
  try {
    coupon = JSON.parse(localStorage.getItem('usecoupon'))
  } catch (ex) {}
  console.log('coupon', coupon)

  return (
    <>
      <Auth></Auth>
      {showSend && <SendSuccess sendSuccess={sendSuccess}></SendSuccess>}
      <section>
        <div className="container h-100 py-5 font-B">
          <div className="C-Cartcontainer d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="row d-flex justify-content-between align-items-center mb-4">
                <h3 className="col-lg-4 col-md-12 col-sm-12 col-12 f-32 sp-3 mb-3 f-LightGreen">
                  小農購物車
                </h3>

                <div className="col-lg-8 col-md-12 col-sm-12 col-12 d-flex justify-content-end align-items-center flex-row gap-2 ms-0">
                  <div className="C-step f-16 f-Gray sp-2">
                    <button
                      className="C-circle"
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
                    <button
                      className="C-circle"
                      onClick={() => {
                        navigate('/Payment')
                      }}
                    >
                      02
                    </button>
                    <span>填寫資料</span>
                  </div>
                  <div className="C-dash"></div>
                  <div className="C-step f-16 f-Gray sp-2">
                    <button className="C-circle C-active">03</button>
                    <span>完成訂單</span>
                  </div>
                </div>
              </div>
              <div className="C-Order backgound-w rounded-20 mb-4 shadow-1 p-5">
                <h4 className="C-paytitle">訂單明細</h4>
                <div className="C-underline"></div>
                {productCart.map((c) => {
                  return (
                    <div className="C-Item pt-4" key={c.id}>
                      <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-12 col-md-5 d-flex gap-3">
                          <div className="C-productimg">
                            <img
                              src={`http://localhost:3033/images/product/${c.img}`}
                              className="img-fluid rounded-20"
                              alt="Cotton T-shirt"
                            />
                          </div>
                          <p className="f-20 mt-3 f-Brown">{c.name}</p>
                        </div>
                        <div className="col-12 col-md-3 d-flex justify-content-between me-5">
                          <div className="C-quantity">
                            <span className="f-20 f-DarkGreen sp-1">
                              {c.quantity}
                            </span>
                            <span className="f-16 f-Gray">份</span>
                          </div>
                          <div className="text-end">
                            <span className="f-20 f-DarkGreen sp-1">
                              {c.price}
                            </span>
                            <span className="f-16 f-Gray">NTD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {lessonCart.map((c) => {
                  return (
                    <div className="C-Item pt-4" key={c.id}>
                      <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-12 col-md-5 d-flex gap-3">
                          <div className="C-productimg">
                            <img
                              src={`http://localhost:3033/images/lesson/${c.img}`}
                              className="img-fluid rounded-20"
                              alt="Cotton T-shirt"
                            />
                          </div>
                          <p className="f-20 mt-3 f-Brown">{c.name}</p>
                        </div>
                        <div className="col-12 col-md-3 d-flex justify-content-between me-5">
                          <div className="C-quantity">
                            <span className="f-20 f-DarkGreen sp-1">
                              {c.quantity}
                            </span>
                            <span className="f-16 f-Gray">份</span>
                          </div>
                          <div className="text-end">
                            <span className="f-20 f-DarkGreen sp-1">
                              {c.price}
                            </span>
                            <span className="f-16 f-Gray">NTD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="C-underline"></div>
                <div className="C-Sum text-end f-20 sp-2 mt-4 me-3 d-flex justify-content-end flex-wrap">
                  <div>
                    <span className="f-16 f-Yellow text-end">
                      套用折扣:
                      {coupon
                        ? coupon.quota + (coupon.cate === 1 ? 'NTD' : '%')
                        : '無'}
                    </span>
                  </div>
                  <div>
                    <span className="f-Brown ">合計:</span>
                    <span className="f-DarkGreen">{sumPrice}</span>
                    <span className="f-Brown">NTD</span>
                  </div>
                </div>
              </div>
              <div className="C-Order backgound-w rounded-20 mb-4 shadow-1 p-5">
                <h4 className="C-paytitle">付款方式</h4>
                <div className="C-underline"></div>
                {Payment === '信用卡' ? (
                  <div className="d-flex flex-row px-3 pt-4 align-items-center gap-4 flex-wrap">
                    <div className="C-o-pay px-4 p-2 text-center">
                      <span className="f-Brown">信用卡/金融卡</span>
                    </div>
                    <div className="C-o-bankname">
                      <span className="f-Gray">台灣第一銀行</span>
                    </div>
                    <div className="C-o-cardnum f-Brown">
                      <span className="f-Brown">**** **** ****</span>
                      <span className="f-Brown">1120</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-row px-3 pt-4 align-items-center gap-4 flex-wrap">
                    <div className="C-o-pay px-4 p-2 text-center">
                      <span className="f-Brown">LinePay</span>
                    </div>
                    <div className="C-Linepay">
                      <img
                        src="./../../Images/Line-Pay-row.png"
                        alt="Line-Pay-row.png"
                      />
                    </div>
                    {/* <div className="C-o-change ms-auto">
                      <span className="f-Yellow sp-1">未付款</span>
                    </div> */}
                  </div>
                )}
                <div className="C-underline"></div>
              </div>
              <div className="C-Order backgound-w rounded-20 mb-4 shadow-1 p-5">
                <h4 className="C-paytitle">送貨地址</h4>
                <div className="C-underline"></div>
                <div className="d-flex flex-row px-3 pt-4 align-items-center gap-4 flex-wrap">
                  <div className="C-o-pay px-4 p-2 text-center">
                    <span className="f-Brown">宅配</span>
                  </div>
                  <div className="C-o-address">
                    <span className="f-Brown">
                      {myAddress.member_address_1 +
                        myAddress.member_address_2 +
                        myAddress.member_address_3}
                    </span>
                  </div>
                  <div
                    className="C-o-change ms-auto"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/Payment')
                    }}
                  >
                    <span className="f-LightGreen">變更</span>
                  </div>
                </div>
                <div className="C-underline"></div>
              </div>
              <div className="C-submit d-flex">
                {myPayment === 'LinePay' ? (
                  <LinePayButton sendCartData={sendCartData}></LinePayButton>
                ) : (
                  <button
                    className="C-cartbutton f-24 sp-3 f-Brown"
                    onClick={() => {
                      sendCartData()
                      setShowSend(true)
                      clearCart()
                      localStorage.removeItem('usecoupon')
                    }}
                  >
                    提交訂單
                    <img src="./Buttons/cart-line.svg" alt="button" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShoppingConfirm
