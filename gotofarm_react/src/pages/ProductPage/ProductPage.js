import { useEffect, useState, useContext } from 'react'
import {
  PRODUCT_PAGE_DATA,
  HOST,
  BOOKMARK_ADD,
  BOOKMARK_DELETE,
} from '../../components/api_config'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCart } from '../../components/utils/useCart'
import axios from 'axios'

import './../../css/productpage.css'

//引入元件
import Icon from '../../icon/Icon'
import ProductRiver from './ProductRiver'
import AuthContext from '../../contexts/AuthContext'
import Auth_P from '../../components/Auth_P'

function ProductPage() {
  const { sid } = useParams()
  const location = useLocation()
  const { myAuth } = useContext(AuthContext)

  const ups = new URLSearchParams(location.search)

  // --------狀態及變數區--------
  // 資料
  const [data, setData] = useState({
    rows: [],
    farmers: [],
    comments: [],
    newOthers: [],
    bookmark_member_sid: [],
    product_sid: '',
  })

  // 購物車數量
  const [cartNum, setCartNum] = useState(1)
  // 加進購物車
  const { addItem } = useCart()

  // 標籤
  const [myTag, setMyTag] = useState('產品介紹')
  // 標籤內容
  const tags = ['產品介紹', '產地介紹']

  // 農夫slide
  const [slide, setSlide] = useState(0)
  // 農夫ul的class
  const farmerClass = ['', 'two', 'three']

  // 評論排序
  const [comOrderD, setComOrderD] = useState('')
  const [comOrderS, setComOrderS] = useState('')

  // 顯示登入提醒
  const [alertLogin, setAlertLogin] = useState(false)

  // --------函式區--------
  // 拿資料
  const getListData = async (sid, orderdate, orderscore) => {
    if (orderscore) {
      const response = await axios.get(`${PRODUCT_PAGE_DATA}/${sid}`, {
        params: { orderscore },
      })
      // console.log(response.data)
      setData(response.data)
    } else if (orderdate) {
      const response = await axios.get(`${PRODUCT_PAGE_DATA}/${sid}`, {
        params: { orderdate },
      })
      // console.log(response.data)
      setData(response.data)
    } else {
      const response = await axios.get(`${PRODUCT_PAGE_DATA}/${sid}`)
      // console.log(response.data)
      setData(response.data)
    }
    setCartNum(1)
  }

  // 新增收藏
  const addBookmark = async (productSid = 0) => {
    // console.log('addBookmark')
    if (!+productSid) return
    // 送token給後端
    let myAuth = {
      account: '',
      accountId: '',
      token: '',
    }
    let localAuth = localStorage.getItem('myAuth')
    try {
      if (localAuth) {
        myAuth = JSON.parse(localAuth)
      }
    } catch (ex) {}

    const response = await axios.post(
      `${BOOKMARK_ADD}/product`,
      {
        product_sid: productSid,
      },
      { headers: { Authorization: 'Bearer ' + myAuth.token } }
    )
    // console.log(response.data)
    getListData(sid)
  }

  // 刪除收藏
  const deleteBookmark = async (productSid = 0) => {
    console.log('deBookmark')
    if (!+productSid) return
    // 送token給後端
    let myAuth = {
      account: '',
      accountId: '',
      token: '',
    }
    let localAuth = localStorage.getItem('myAuth')
    try {
      if (localAuth) {
        myAuth = JSON.parse(localAuth)
      }
    } catch (ex) {}

    const response = await axios.delete(
      `${BOOKMARK_DELETE}/product/${productSid}`,
      { headers: { Authorization: 'Bearer ' + myAuth.token } }
    )
    console.log(response.data)
    getListData(sid)
  }

  useEffect(() => {
    getListData(sid, ups.get('orderdate'), ups.get('orderscore'))
  }, [sid, location.search])

  return (
    <>
      {alertLogin ? <Auth_P setAlertLogin={setAlertLogin} /> : <></>}
      <div className="container-md container-fluid">
        <div className="row">
          {/* 商品卡 */}
          {data.rows.map((v, i) => {
            let imgarr = v.product_img.split(',')
            return (
              <div className="col col-12 p-0" key={i}>
                <div className="P-product-main d-flex flex-column flex-md-row gap-md-5 gap-4 mx-auto">
                  <div className="P-product-main-img">
                    <img src={`${HOST}/images/product/${imgarr[0]}`} alt="" />
                  </div>
                  <div className="P-product-main-info d-flex flex-column justify-content-between gap-3 gap-md-0">
                    <h1 className="font-B">{v.product_name}</h1>
                    <div className="font-R">
                      <p>規格：{v.product_spec}</p>
                      <p>產地：{v.brand_name}</p>
                      <div className="d-flex align-items-center">
                        <p className="m-0">評分：</p>
                        {[...Array(v.comment_value)].map((v, i) => {
                          return <Icon.Star key={i} />
                        })}
                      </div>
                    </div>
                    <h2 className="font-B">售價：{v.product_price}</h2>
                    <div className="d-none d-md-flex gap-4 ">
                      <div className="P-counter font-R d-flex">
                        <button
                          onClick={() => {
                            cartNum > 1
                              ? setCartNum(cartNum - 1)
                              : setCartNum(1)
                          }}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <p>{cartNum}</p>
                        <button
                          onClick={() => {
                            setCartNum(cartNum + 1)
                          }}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <div
                        className="P-btn-cart d-none d-md-block"
                        onClick={() => {
                          addItem({
                            id: v.product_id,
                            img: v.product_img.split(',')[0].trim(),
                            name: v.product_name,
                            slogan: v.product_slogan,
                            price: v.product_price,
                            quantity: cartNum,
                          })
                        }}
                      >
                        <img
                          src="./../../../../Buttons/ButtonCart.png"
                          alt=""
                        />
                      </div>
                    </div>
                    {v.bookmark_member_sid.includes(myAuth.sid) ? (
                      <div
                        className="P-btn-fav d-none d-md-block mx-auto"
                        onClick={() => {
                          myAuth.authorized
                            ? setAlertLogin(false)
                            : setAlertLogin(true)
                          v.bookmark_member_sid.includes(myAuth.sid)
                            ? deleteBookmark(v.sid)
                            : addBookmark(v.sid)
                        }}
                      >
                        <img
                          src="./../../../../Buttons/ButtonfavoriteHover.png"
                          alt=""
                        />
                      </div>
                    ) : (
                      <div
                        className="P-btn-fav d-none d-md-block mx-auto"
                        onClick={() => {
                          myAuth.authorized
                            ? setAlertLogin(false)
                            : setAlertLogin(true)
                          v.bookmark_member_sid.includes(myAuth.sid)
                            ? deleteBookmark(v.sid)
                            : addBookmark(v.sid)
                        }}
                      >
                        <img
                          src="./../../../../Buttons/Buttonfavorite.png"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {/* 手機版加入購物車 */}
          <div className="P-mobile-buy d-md-none d-flex justify-content-between align-items-center gap-2">
            <button className="P-addbookmark d-flex justify-content-center align-items-center ">
              {data.bookmark_member_sid.includes(myAuth.sid) ? (
                <Icon.Bookmarked
                  onClick={() => {
                    myAuth.authorized
                      ? setAlertLogin(false)
                      : setAlertLogin(true)
                    data.bookmark_member_sid.includes(myAuth.sid)
                      ? deleteBookmark(data.product_sid)
                      : addBookmark(data.product_sid)
                  }}
                />
              ) : (
                <Icon.Bookmark
                  onClick={() => {
                    myAuth.authorized
                      ? setAlertLogin(false)
                      : setAlertLogin(true)
                    data.bookmark_member_sid.includes(myAuth.sid)
                      ? deleteBookmark(data.product_sid)
                      : addBookmark(data.product_sid)
                  }}
                />
              )}
            </button>
            <div className="P-counter font-R d-flex">
              <button
                onClick={() => {
                  cartNum > 1 ? setCartNum(cartNum - 1) : setCartNum(1)
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <p>{cartNum}</p>
              <button
                onClick={() => {
                  setCartNum(cartNum + 1)
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button className="P-addcart font-R d-flex justify-content-center align-items-center gap-3">
              <Icon.AddCart
                onClick={() => {
                  addItem({
                    id: data.rows[0].product_id,
                    img: data.rows[0].product_img.split(',')[0].trim(),
                    name: data.rows[0].product_name,
                    slogan: data.rows[0].product_slogan,
                    price: data.rows[0].product_price,
                    quantity: cartNum,
                  })
                }}
              />
            </button>
          </div>

          {/* 商品詳細資訊卡 */}
          <div className="col col-12 p-0">
            <div className="P-product-more-wrap d-flex flex-column align-items-center">
              {/* 切換標籤 */}
              <div className="P-product-more-tag d-flex gap-md-5 gap-3 font-B">
                {tags.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className={myTag === v ? 'pop' : ''}
                      onClick={() => {
                        setMyTag(v)
                      }}
                    >
                      {v}
                    </div>
                  )
                })}
              </div>
              {myTag === '產品介紹'
                ? data.rows.map((v, i) => {
                    let imgarr = v.product_img.split(',')
                    return (
                      <div
                        key={i}
                        className="P-product-more d-flex flex-column-reverse flex-md-row gap-md-5 gap-4 mx-auto"
                      >
                        <div className="P-product-more-info font-R d-flex flex-column ">
                          <div>
                            <h1 className="font-M ">{v.product_name}</h1>
                            <h3 className="font-M ">{v.product_slogan}</h3>
                          </div>
                          <div>
                            <p>{v.product_info_1}</p>
                            <p>{v.product_info_2}</p>
                          </div>
                        </div>
                        <div className="P-product-more-img">
                          <img
                            src={`${HOST}/images/product/${imgarr[1]}`}
                            alt=""
                          />
                        </div>
                      </div>
                    )
                  })
                : data.farmers.map((v, i) => {
                    let imgarr = v.brand_img.split(',')
                    return (
                      <div
                        key={i}
                        className="P-product-more d-flex flex-column flex-md-row gap-5 mx-auto"
                      >
                        <div className="P-product-more-img">
                          {/* 輪播牆點點 */}
                          <ul className="P-farmer-dot list-unstyled d-flex gap-2">
                            {[...Array(3)].map((v, i) => {
                              return (
                                <li
                                  key={i}
                                  className={slide === i ? 'active' : ''}
                                ></li>
                              )
                            })}
                          </ul>
                          {/* 輪播牆箭頭 */}
                          <div className="P-farmer-arrow d-flex">
                            <i
                              className="fa-solid fa-chevron-left"
                              onClick={() => {
                                if (slide > 0) {
                                  setSlide(slide - 1)
                                } else {
                                  setSlide(0)
                                }
                              }}
                            ></i>
                            <i
                              className="fa-solid fa-chevron-right ms-auto"
                              onClick={() => {
                                if (slide < 2) {
                                  setSlide(slide + 1)
                                } else {
                                  setSlide(2)
                                }
                              }}
                            ></i>
                          </div>
                          {/* 輪播牆本體 */}
                          <ul
                            className={`P-farmer-ul list-unstyled m-0 p-0 h-100 d-flex ${farmerClass[slide]}`}
                          >
                            <li className="m-0 p-0 h-100">
                              <img
                                src={`${HOST}/images/brand/${imgarr[0]}`}
                                alt=""
                              />
                            </li>
                            <li className="m-0 p-0 h-100">
                              <img
                                src={`${HOST}/images/brand/${imgarr[1]}`}
                                alt=""
                              />
                            </li>
                            <li className="m-0 p-0 h-100">
                              <img
                                src={`${HOST}/images/brand/${imgarr[2]}`}
                                alt=""
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="P-product-more-farmer font-R d-flex flex-column">
                          <div>
                            <h1 className="font-M">{v.brand_name}</h1>
                            <h3 className="font-M ">{v.brand_slogan}</h3>
                          </div>
                          <div>
                            <p>{v.brand_info_1}</p>
                            <p>{v.brand_info_2}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>
        </div>
      </div>
      <ProductRiver
        data={data}
        comOrderD={comOrderD}
        setComOrderD={setComOrderD}
        comOrderS={comOrderS}
        setComOrderS={setComOrderS}
      />
      <div className="container-md container-fluid g-0 mb-5">
        {/* 推薦標題 */}
        <div className="P-commnet-title d-flex justify-content-center align-items-center font-B">
          <img
            src="./../../Images/titlefarm.png"
            alt=""
            width="300"
            className="d-none d-md-block"
          />
          <h1>
            小小農<span>推薦</span>
          </h1>
          <img
            src="./../../Images/titlefarm2.png"
            alt=""
            width="300"
            className="d-none d-md-block"
          />
        </div>
        <div className="P-other row justify-content-center mx-auto mb-5">
          {data.newOthers.map((v, i) => {
            let imgarr = v.product_img.split(',')
            return (
              <div key={i} className="col col-md-3 col-6">
                <div className="PP-product-card">
                  <Link
                    to={`/product/${v.sid}`}
                    onClick={() => {
                      setComOrderD('')
                      setComOrderS('')
                      setMyTag('產品介紹')
                      // document.documentElement.scrollTop = 0
                    }}
                  >
                    <div className="PP-product-card-img">
                      <img
                        src={`${HOST}/images/product/${imgarr[0]}`}
                        alt={v.product_name}
                      />
                    </div>
                    <p className="PP-product-card-title font-R">
                      {v.product_name}
                    </p>
                  </Link>
                  <div className="PP-product-card-price font-R d-flex justify-content-end align-items-center gap-1">
                    {v.bookmark_member_sid.includes(myAuth.sid) ? (
                      <Icon.Bookmarked
                        className="me-auto"
                        onClick={() => {
                          myAuth.authorized
                            ? setAlertLogin(false)
                            : setAlertLogin(true)
                          v.bookmark_member_sid.includes(myAuth.sid)
                            ? deleteBookmark(v.sid)
                            : addBookmark(v.sid)
                        }}
                      />
                    ) : (
                      <Icon.Bookmark
                        className="me-auto"
                        onClick={() => {
                          myAuth.authorized
                            ? setAlertLogin(false)
                            : setAlertLogin(true)
                          v.bookmark_member_sid.includes(myAuth.sid)
                            ? deleteBookmark(v.sid)
                            : addBookmark(v.sid)
                        }}
                      />
                    )}
                    <span>${v.product_price}</span>
                    <Icon.AddCart
                      tabindex="0"
                      onClick={() => {
                        addItem({
                          id: v.product_id,
                          img: v.product_img.split(',')[0].trim(),
                          name: v.product_name,
                          slogan: v.product_slogan,
                          price: v.product_price,
                          quantity: 1,
                        })
                      }}
                    />
                    <div className="P-plus">+1</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProductPage
