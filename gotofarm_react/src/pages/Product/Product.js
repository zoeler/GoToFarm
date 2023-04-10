import { useEffect, useState, useContext } from 'react'
import {
  PRODUCT_DATA,
  BOOKMARK_ADD,
  BOOKMARK_DELETE,
  HOST,
} from '../../components/api_config'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { useCart } from '../../components/utils/useCart'
import axios from 'axios'

//引入元件
import Pagination from './Pagination'
import Orderby from './Orderby'
import Farmers from './Farmers'
import Placeholder from './Placeholder'
import Icon from '../../icon/Icon'
import AuthContext from '../../contexts/AuthContext'
import Auth_P from '../../components/Auth_P'
import {
  ListMotionContainer,
  ListMotionItem,
} from '../../components/ListMotion'
import './../../css/product.css'

function Product() {
  const location = useLocation()
  const navigate = useNavigate()
  const ups = new URLSearchParams(location.search)
  const { myAuth } = useContext(AuthContext)

  // --------狀態及變數區--------
  // 資料
  const [data, setData] = useState({
    page: 0,
    newRowsC: [],
    perPage: 0,
    totalPages: 0,
    totalRows: 0,
    queryObj: {},
  })

  // 購物車
  const { addItem } = useCart()

  // loading狀態(placeholder用)
  const [loading, setLoading] = useState(true)

  // 找不到資料用
  const [notfound, setNotFound] = useState(false)

  // 點選的品牌
  const [brandCheck, setBrandCheck] = useState([])

  // 點選的加工品類型
  const [proCheck, setProCheck] = useState([])

  // 點選的蔬菜類型
  const [vegCheck, setVegCheck] = useState([])

  // 篩選詞彙querystring
  const [myQuery, setMyQuery] = useState({})

  // 排序
  const [myOrder, setMyOrder] = useState([])

  // 檢索詞
  const [myInput, setMyinput] = useState('')

  // 品牌
  const brands = [
    '阿瑋農園',
    '彬哥農園',
    '李家果園',
    '美雲蔬果',
    '阿賢農場',
    '洪家農場',
    '陳哥農園',
    '阿邦農園',
    '郭哥農園',
    '芬楊果園',
  ]

  // 蔬菜
  const veges = ['葉菜', '花菜', '瓜果', '根莖', '菌菇']

  // 加工品
  const processeds = ['糕餅', '醃漬', '醬料', '果乾', '飲品']

  // 分類
  const [category, setCategory] = useState('所有商品')

  // 顯示登入提醒
  const [alertLogin, setAlertLogin] = useState(false)

  // 顯示手機板分類篩選
  const [sidepop, setSidepop] = useState(false)

  // --------函式區--------
  // 拿資料
  const getListData = async (
    page = 1,
    cate,
    brand,
    pro,
    veg,
    orderprice,
    search
  ) => {
    let response
    let myParams = { page }

    if (search) {
      myParams = { ...myParams, search }
    }

    if (orderprice) {
      myParams = { ...myParams, orderprice }
    }
    if (cate) {
      myParams = { ...myParams, cate }
    }
    if (pro) {
      myParams = { ...myParams, pro }
    }
    if (veg) {
      myParams = { ...myParams, veg }
    }
    if (brand) {
      myParams = { ...myParams, brand }
    }

    response = await axios.get(PRODUCT_DATA, {
      params: myParams,
    })
    if (response.data.newRowsC.length === 0) {
      setNotFound(true)
      return
    }
    setData(response.data)
    setLoading(false)
    setNotFound(false)
  }

  // 新增收藏
  const addBookmark = async (productSid = 0) => {
    console.log('addBookmark')
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
    console.log(response.data)
    getListData(
      +ups.get('page'),
      +ups.get('cate'),
      +ups.get('brand'),
      +ups.get('pro'),
      +ups.get('veg'),
      ups.get('orderprice'),
      ups.get('search')
    )
    setLoading(true)
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
    getListData(
      +ups.get('page'),
      +ups.get('cate'),
      +ups.get('brand'),
      +ups.get('pro'),
      +ups.get('veg'),
      ups.get('orderprice'),
      ups.get('search')
    )
    setLoading(true)
  }

  // 捲動畫面
  const scrollMe = () => {
    window.scrollTo({
      top: 400,
    })
  }

  // 設定類型狀態
  const myCategory = (cate) => {
    switch (cate) {
      case '1':
        setCategory('水果類')
        setMyQuery({ cate: 1 })
        break
      case '2':
        setCategory('蔬菜類')
        setMyQuery({ cate: 2 })
        break
      case '3':
        setCategory('加工品')
        setMyQuery({ cate: 3 })
        break
      case '4':
        setCategory('其他類')
        setMyQuery({ cate: 4 })
        break
      case '0':
      default:
        setCategory('所有商品')
    }
  }

  // 抓資料用
  useEffect(() => {
    getListData(
      +ups.get('page'),
      +ups.get('cate'),
      +ups.get('brand'),
      +ups.get('pro'),
      +ups.get('veg'),
      ups.get('orderprice'),
      ups.get('search')
    )
    setLoading(true)
    // console.log(+ups.get('cate'))

    // setBrandCheck([...brandCheck, +ups.get('brand')])
  }, [location.search])

  useEffect(() => {
    if (ups.get('cate')) {
      myCategory(ups.get('cate'))
    }
    if (ups.get('brand')) {
      setBrandCheck([+ups.get('brand')])
    }
  }, [])

  return (
    <>
      {/* 登入提醒 */}
      {alertLogin ? <Auth_P setAlertLogin={setAlertLogin} /> : <></>}
      {/* 手機板側邊 */}
      <div className={`P-blur d-block d-md-none ${sidepop ? 'show' : ''}`}>
        <div className={`P-sideM mt-md-3 ${sidepop ? 'show' : ''}`}>
          <div className="P-category-box font-R">
            {/* 叉叉Icons */}
            <Icon.Delete
              className="P-category-box-close ms-auto me-4 mb-4"
              onClick={() => {
                setSidepop(false)
              }}
            />

            {/* 關鍵字檢索 */}
            <div className="P-search m-auto mb-5">
              <form className="d-flex flex-row justify-content-center">
                <input
                  type="text"
                  name="search"
                  placeholder="查詢商品名稱"
                  value={myInput}
                  onChange={(e) => {
                    setMyinput(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setMyOrder([])
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      const newQuery = { search: myInput }
                      setMyQuery(newQuery)
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }
                  }}
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault()
                    setMyOrder([])
                    setBrandCheck([])
                    setProCheck([])
                    setVegCheck([])
                    setMyOrder([])
                    const newQuery = { search: myInput }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            {/* 分類篩選 */}
            <ul className="P-category h-100 list-unstyled d-flex flex-column gap-3">
              <li>
                <Icon.ProductM />
                <a
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollMe()
                    setCategory('所有商品')
                    const newQuery = {}
                    setMyQuery(newQuery)
                    setBrandCheck([])
                    setProCheck([])
                    setVegCheck([])
                    setMyOrder([])
                    setMyinput('')
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                  }}
                >
                  所有商品
                </a>
                <ul className="list-unstyled P-category-farmer">
                  {category === '所有商品' ? (
                    <Farmers
                      brands={brands}
                      brandCheck={brandCheck}
                      setMyOrder={setMyOrder}
                      myQuery={myQuery}
                      setMyQuery={setMyQuery}
                      setBrandCheck={setBrandCheck}
                    />
                  ) : (
                    ''
                  )}
                </ul>
              </li>
              <li>
                <Icon.FruitM />
                <a
                  className={category === '水果類' ? 'categoryActive' : ''}
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollMe()
                    setCategory('水果類')
                    setBrandCheck([])
                    setProCheck([])
                    setVegCheck([])
                    setMyOrder([])
                    setMyinput('')
                    const newQuery = { cate: 1 }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                  }}
                >
                  水果類
                </a>
                <ul className="list-unstyled P-category-farmer">
                  {category === '水果類' ? (
                    <Farmers
                      brands={brands}
                      brandCheck={brandCheck}
                      setMyOrder={setMyOrder}
                      myQuery={myQuery}
                      setMyQuery={setMyQuery}
                      setBrandCheck={setBrandCheck}
                    />
                  ) : (
                    ''
                  )}
                </ul>
              </li>
              <li>
                <Icon.VegetableM />
                <a
                  className={category === '蔬菜類' ? 'categoryActive' : ''}
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollMe()
                    setCategory('蔬菜類')
                    setBrandCheck([])
                    setProCheck([])
                    setVegCheck([])
                    setMyOrder([])
                    setMyinput('')
                    const newQuery = { cate: 2 }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                  }}
                >
                  蔬菜類
                </a>
                {category === '蔬菜類' ? (
                  <>
                    <ul className="list-unstyled P-category-farmer">
                      <li>類型篩選</li>
                      {veges.map((v, i) => {
                        return (
                          <li key={i}>
                            <label>
                              <input
                                type="checkbox"
                                value={v}
                                checked={vegCheck.includes(i + 1)}
                                onChange={() => {
                                  setMyOrder([])
                                  const deQuery = { ...myQuery }
                                  delete deQuery.orderprice
                                  setMyQuery(deQuery)
                                  if (vegCheck.includes(i + 1)) {
                                    const newVeg = vegCheck.filter((v2, i2) => {
                                      return v2 !== i + 1
                                    })
                                    setVegCheck(newVeg)
                                    const newQuery = {
                                      ...deQuery,
                                      veg: newVeg.join(''),
                                    }
                                    setMyQuery(newQuery)
                                    navigate(
                                      `?${new URLSearchParams(
                                        newQuery
                                      ).toString()}`
                                    )
                                  } else {
                                    const newVeg = [...vegCheck, i + 1]
                                    setVegCheck(newVeg)
                                    const newQuery = {
                                      ...deQuery,
                                      veg: newVeg.join(''),
                                    }
                                    setMyQuery(newQuery)
                                    navigate(
                                      `?${new URLSearchParams(
                                        newQuery
                                      ).toString()}`
                                    )
                                  }
                                }}
                              />
                              <span>{v}</span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                    <ul className="list-unstyled P-category-farmer">
                      <Farmers
                        brands={brands}
                        brandCheck={brandCheck}
                        setMyOrder={setMyOrder}
                        myQuery={myQuery}
                        setMyQuery={setMyQuery}
                        setBrandCheck={setBrandCheck}
                      />
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </li>
              <li>
                <Icon.ProcessM />
                <a
                  className={category === '加工品' ? 'categoryActive' : ''}
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollMe()
                    setCategory('加工品')
                    setBrandCheck([])
                    setProCheck([])
                    setVegCheck([])
                    setMyOrder([])
                    setMyinput('')
                    const newQuery = { cate: 3 }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                  }}
                >
                  加工品
                </a>
                {category === '加工品' ? (
                  <>
                    <ul className="list-unstyled P-category-farmer">
                      <li>類型篩選</li>
                      {processeds.map((v, i) => {
                        return (
                          <li key={i}>
                            <label>
                              <input
                                type="checkbox"
                                value={v}
                                checked={proCheck.includes(i + 1)}
                                onChange={() => {
                                  setMyOrder([])
                                  const deQuery = { ...myQuery }
                                  delete deQuery.orderprice
                                  setMyQuery(deQuery)
                                  if (proCheck.includes(i + 1)) {
                                    const newPro = proCheck.filter((v2, i2) => {
                                      return v2 !== i + 1
                                    })
                                    setProCheck(newPro)
                                    const newQuery = {
                                      ...deQuery,
                                      pro: newPro.join(''),
                                    }
                                    setMyQuery(newQuery)
                                    navigate(
                                      `?${new URLSearchParams(
                                        newQuery
                                      ).toString()}`
                                    )
                                  } else {
                                    const newPro = [...proCheck, i + 1]
                                    setProCheck(newPro)
                                    const newQuery = {
                                      ...deQuery,
                                      pro: newPro.join(''),
                                    }
                                    setMyQuery(newQuery)
                                    navigate(
                                      `?${new URLSearchParams(
                                        newQuery
                                      ).toString()}`
                                    )
                                  }
                                }}
                              />
                              <span>{v}</span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                    <ul className="list-unstyled P-category-farmer">
                      <Farmers
                        brands={brands}
                        brandCheck={brandCheck}
                        setMyOrder={setMyOrder}
                        myQuery={myQuery}
                        setMyQuery={setMyQuery}
                        setBrandCheck={setBrandCheck}
                      />
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </li>
              <li>
                <Icon.OthersM />
                <a
                  className={category === '其他類' ? 'categoryActive' : ''}
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollMe()
                    setCategory('其他類')
                    setBrandCheck([])
                    setProCheck([])
                    setVegCheck([])
                    setMyOrder([])
                    setMyinput('')
                    const newQuery = { cate: 4 }
                    setMyQuery(newQuery)
                    navigate(`?${new URLSearchParams(newQuery).toString()}`)
                  }}
                >
                  其他類
                </a>
                {category === '其他類' ? (
                  <>
                    {' '}
                    <ul className="list-unstyled P-category-farmer">
                      <Farmers
                        brands={brands}
                        brandCheck={brandCheck}
                        setMyOrder={setMyOrder}
                        myQuery={myQuery}
                        setMyQuery={setMyQuery}
                        setBrandCheck={setBrandCheck}
                      />
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </li>
            </ul>
          </div>
          <div className="P-rabbit ps-5 d-none d-md-block">
            <img src="./../../Images/ProductRabbit.png" width="200px" alt="" />
          </div>
        </div>
      </div>
      <div className="container-fluid g-0 mb-5">
        {/* 版標 */}
        <header className="P-header-bk">
          <div className="P-bestseller-card">
            <Link to={`/product/21`}>
              <img
                className="P-bestseller-king"
                src="./../../Images/king.png"
                alt=""
              />
              <div className="P-bestseller">
                <img src="./../../Images/orange_005.jpg" alt="本月熱銷" />
              </div>
              <span className="P-bestseller-text">本月熱銷</span>
            </Link>
          </div>
          <img
            className="P-wavebottom w-100 d-none d-md-block"
            src="./../../Images/wavebottom-s.png"
            alt=""
          />
        </header>
        {/* 列表標題 */}
        <div className="P-product-title d-flex justify-content-center align-items-baseline mt-5 font-B">
          <div>
            <img src="./../../Images/titleRice.png" alt="" width="100px" />
          </div>
          <h1>小農商城</h1>
          <span className="ms-3">{category}</span>
        </div>
        {/* 排序按鈕 */}
        <Orderby
          myOrder={myOrder}
          setMyOrder={setMyOrder}
          myQuery={myQuery}
          setMyQuery={setMyQuery}
          setSidepop={setSidepop}
          data={data}
          setData={setData}
        />
        <div className="container-fluid p-0 container-md d-flex flex-column flex-md-row gap-5">
          {/* 側邊 */}
          <div className="P-side mt-md-3 d-none d-md-block">
            <div className="P-category-box font-R">
              {/* 關鍵字檢索 */}
              <div className="P-search m-auto mb-5">
                <form className="d-flex flex-row justify-content-center">
                  <input
                    type="text"
                    name="search"
                    placeholder="查詢商品名稱"
                    value={myInput}
                    onChange={(e) => {
                      setMyinput(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setMyOrder([])
                        setBrandCheck([])
                        setProCheck([])
                        setVegCheck([])
                        setMyOrder([])
                        const newQuery = { search: myInput }
                        setMyQuery(newQuery)
                        navigate(`?${new URLSearchParams(newQuery).toString()}`)
                      }
                    }}
                  />
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      setMyOrder([])
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      const newQuery = { search: myInput }
                      setMyQuery(newQuery)
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
              {/* 分類篩選 */}
              <ul className="P-category h-100 list-unstyled d-flex flex-column gap-3">
                <li>
                  <Icon.Product />
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollMe()
                      setCategory('所有商品')
                      const newQuery = {}
                      setMyQuery(newQuery)
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      setMyinput('')
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }}
                  >
                    所有商品
                  </a>
                  <ul className="list-unstyled P-category-farmer">
                    {category === '所有商品' ? (
                      <Farmers
                        brands={brands}
                        brandCheck={brandCheck}
                        setMyOrder={setMyOrder}
                        myQuery={myQuery}
                        setMyQuery={setMyQuery}
                        setBrandCheck={setBrandCheck}
                      />
                    ) : (
                      ''
                    )}
                  </ul>
                </li>
                <li>
                  <Icon.Fruit />
                  <a
                    className={category === '水果類' ? 'categoryActive' : ''}
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollMe()
                      setCategory('水果類')
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      setMyinput('')
                      const newQuery = { cate: 1 }
                      setMyQuery(newQuery)
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }}
                  >
                    水果類
                  </a>
                  <ul className="list-unstyled P-category-farmer">
                    {category === '水果類' ? (
                      <Farmers
                        brands={brands}
                        brandCheck={brandCheck}
                        setMyOrder={setMyOrder}
                        myQuery={myQuery}
                        setMyQuery={setMyQuery}
                        setBrandCheck={setBrandCheck}
                      />
                    ) : (
                      ''
                    )}
                  </ul>
                </li>
                <li>
                  <Icon.Vegetable />
                  <a
                    className={category === '蔬菜類' ? 'categoryActive' : ''}
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollMe()
                      setCategory('蔬菜類')
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      setMyinput('')
                      const newQuery = { cate: 2 }
                      setMyQuery(newQuery)
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }}
                  >
                    蔬菜類
                  </a>
                  {category === '蔬菜類' ? (
                    <>
                      <ul className="list-unstyled P-category-farmer">
                        <li>類型篩選</li>
                        {veges.map((v, i) => {
                          return (
                            <li key={i}>
                              <label>
                                <input
                                  type="checkbox"
                                  value={v}
                                  checked={vegCheck.includes(i + 1)}
                                  onChange={() => {
                                    setMyOrder([])
                                    const deQuery = { ...myQuery }
                                    delete deQuery.orderprice
                                    setMyQuery(deQuery)
                                    if (vegCheck.includes(i + 1)) {
                                      const newVeg = vegCheck.filter(
                                        (v2, i2) => {
                                          return v2 !== i + 1
                                        }
                                      )
                                      setVegCheck(newVeg)
                                      const newQuery = {
                                        ...deQuery,
                                        veg: newVeg.join(''),
                                      }
                                      setMyQuery(newQuery)
                                      navigate(
                                        `?${new URLSearchParams(
                                          newQuery
                                        ).toString()}`
                                      )
                                    } else {
                                      const newVeg = [...vegCheck, i + 1]
                                      setVegCheck(newVeg)
                                      const newQuery = {
                                        ...deQuery,
                                        veg: newVeg.join(''),
                                      }
                                      setMyQuery(newQuery)
                                      navigate(
                                        `?${new URLSearchParams(
                                          newQuery
                                        ).toString()}`
                                      )
                                    }
                                  }}
                                />
                                <span>{v}</span>
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                      <ul className="list-unstyled P-category-farmer">
                        <Farmers
                          brands={brands}
                          brandCheck={brandCheck}
                          setMyOrder={setMyOrder}
                          myQuery={myQuery}
                          setMyQuery={setMyQuery}
                          setBrandCheck={setBrandCheck}
                        />
                      </ul>
                    </>
                  ) : (
                    ''
                  )}
                </li>
                <li>
                  <Icon.Process />
                  <a
                    className={category === '加工品' ? 'categoryActive' : ''}
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollMe()
                      setCategory('加工品')
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      setMyinput('')
                      const newQuery = { cate: 3 }
                      setMyQuery(newQuery)
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }}
                  >
                    加工品
                  </a>
                  {category === '加工品' ? (
                    <>
                      <ul className="list-unstyled P-category-farmer">
                        <li>類型篩選</li>
                        {processeds.map((v, i) => {
                          return (
                            <li key={i}>
                              <label>
                                <input
                                  type="checkbox"
                                  value={v}
                                  checked={proCheck.includes(i + 1)}
                                  onChange={() => {
                                    setMyOrder([])
                                    const deQuery = { ...myQuery }
                                    delete deQuery.orderprice
                                    setMyQuery(deQuery)
                                    if (proCheck.includes(i + 1)) {
                                      const newPro = proCheck.filter(
                                        (v2, i2) => {
                                          return v2 !== i + 1
                                        }
                                      )
                                      setProCheck(newPro)
                                      const newQuery = {
                                        ...deQuery,
                                        pro: newPro.join(''),
                                      }
                                      setMyQuery(newQuery)
                                      navigate(
                                        `?${new URLSearchParams(
                                          newQuery
                                        ).toString()}`
                                      )
                                    } else {
                                      const newPro = [...proCheck, i + 1]
                                      setProCheck(newPro)
                                      const newQuery = {
                                        ...deQuery,
                                        pro: newPro.join(''),
                                      }
                                      setMyQuery(newQuery)
                                      navigate(
                                        `?${new URLSearchParams(
                                          newQuery
                                        ).toString()}`
                                      )
                                    }
                                  }}
                                />
                                <span>{v}</span>
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                      <ul className="list-unstyled P-category-farmer">
                        <Farmers
                          brands={brands}
                          brandCheck={brandCheck}
                          setMyOrder={setMyOrder}
                          myQuery={myQuery}
                          setMyQuery={setMyQuery}
                          setBrandCheck={setBrandCheck}
                        />
                      </ul>
                    </>
                  ) : (
                    ''
                  )}
                </li>
                <li>
                  <Icon.Others />
                  <a
                    className={category === '其他類' ? 'categoryActive' : ''}
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollMe()
                      setCategory('其他類')
                      setBrandCheck([])
                      setProCheck([])
                      setVegCheck([])
                      setMyOrder([])
                      setMyinput('')
                      const newQuery = { cate: 4 }
                      setMyQuery(newQuery)
                      navigate(`?${new URLSearchParams(newQuery).toString()}`)
                    }}
                  >
                    其他類
                  </a>
                  {category === '其他類' ? (
                    <>
                      {' '}
                      <ul className="list-unstyled P-category-farmer">
                        <Farmers
                          brands={brands}
                          brandCheck={brandCheck}
                          setMyOrder={setMyOrder}
                          myQuery={myQuery}
                          setMyQuery={setMyQuery}
                          setBrandCheck={setBrandCheck}
                        />
                      </ul>
                    </>
                  ) : (
                    ''
                  )}
                </li>
              </ul>
            </div>
            <div className="P-rabbit ps-5 d-none d-md-block">
              <img
                src="./../../Images/ProductRabbit.png"
                width="200px"
                alt=""
              />
            </div>
          </div>
          {/* 商品列表 */}
          {notfound ? (
            <div className="P-main mt-5  d-flex justify-content-center align-items-start gap-5">
              <img
                className="d-none d-md-block"
                src="./../../Images/notFound.png"
                width="200px"
                alt=""
              />
              <div className="mt-5">
                <h2 className="P-notfound font-M">Sorry...</h2>
                <h2 className="P-notfound font-M">找不到商品喔</h2>
              </div>
              <img
                className="d-none d-md-block"
                src="./../../Images/notFound.png"
                width="200px"
                alt=""
              />
            </div>
          ) : (
            <div className="P-main mt-3 container-fluid">
              {/* 商品小卡 */}
              <ListMotionContainer element="div" className="row ">
                {/* <div className="row "> */}
                {data.newRowsC.map((v, i) => {
                  let imgarr = v.product_img.split(',')
                  let shortName = v.product_name.slice(0, 9)
                  return (
                    <ListMotionItem
                      element="div"
                      noShift
                      key={v.sid}
                      className="col col-6 col-md-3"
                    >
                      {/* <div key={v.sid} className="col col-6 col-md-3"> */}
                      <div className="P-product-card">
                        <Link to={`/product/${v.sid}`}>
                          {loading ? (
                            <Placeholder />
                          ) : (
                            <div className="P-product-card-img">
                              <img
                                src={`${HOST}/images/product/${imgarr[0]}`}
                                alt=""
                              />
                            </div>
                          )}

                          <p className="P-product-card-title font-R">
                            {shortName}
                          </p>

                          <p className="P-product-card-info font-L">
                            {v.product_info_2}
                          </p>
                          <div className="P-product-card-star mb-2">
                            {[...Array(v.comment_value)].map((v, i) => {
                              return <Icon.Star key={i} />
                            })}
                          </div>
                        </Link>
                        <div className="P-product-card-price font-M d-flex justify-content-end align-items-center gap-1">
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
                          <span>{v.product_price}</span>
                          <Icon.AddCart
                            tabIndex="0"
                            onClick={(e) => {
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

                          {/* <img src=" ./Icons/addCart.svg" alt="" /> */}
                        </div>
                      </div>
                      {/* </div> */}
                    </ListMotionItem>
                  )
                })}
                {/* </div> */}
              </ListMotionContainer>
            </div>
          )}
        </div>
        {/* 分頁按鈕 */}
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          queryObj={data.queryObj}
        />
      </div>
    </>
  )
}

export default Product
