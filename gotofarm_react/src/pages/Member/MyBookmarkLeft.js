import { useEffect, useState, useContext } from 'react'
import {
  HOST,
  BOOKMARK_DATA,
  BOOKMARK_DELETE,
} from '../../components/api_config'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../contexts/AuthContext'
import {
  ListMotionContainer,
  ListMotionItem,
} from '../../components/ListMotion'

import './../../css/mybookmark.css'
import Icon from '../../icon/Icon'

function MyBookmarkLeft() {
  const location = useLocation()
  const { myAuth } = useContext(AuthContext)
  const [data, setData] = useState({
    page: 0,
    totalPagesP: '',
    totalPagesL: '',
    totalP: '',
    totalL: '',
    bookmark_product: [],
    bookmark_lesson: [],
  })

  // 刪除收藏
  const deleteBookmark = async (sid = 0, type) => {
    console.log('deBookmark')
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
    let response
    if (type === 'product') {
      response = await axios.delete(`${BOOKMARK_DELETE}/${type}/${sid}`, {
        headers: { Authorization: 'Bearer ' + myAuth.token },
      })
    }
    if (type === 'lesson') {
      response = await axios.delete(`${BOOKMARK_DELETE}/${type}/${sid}`, {
        headers: { Authorization: 'Bearer ' + myAuth.token },
      })
    }

    console.log(response.data)
    getListData()
  }

  const getListData = async (page = 1) => {
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

    const response = await axios.get(`${BOOKMARK_DATA}`, {
      headers: { Authorization: 'Bearer ' + myAuth.token },
      params: { page },
    })
    console.log('?', response.data)
    setData(response.data)
  }

  useEffect(() => {
    getListData()
  }, [])

  // 標籤
  const [myTag, setMyTag] = useState('產品收藏')
  // 標籤內容
  const tags = ['產品收藏', '課程收藏']

  return (
    <>
      <div className="w-100">
        {/* 切換標籤 */}
        <div className="MB-tag d-flex gap-md-3 gap-3 font-B">
          <Link to="/MyMember">
            <button className="M-back"></button>
          </Link>
          {tags.map((v, i) => {
            return (
              <div
                key={i}
                className={myTag === v ? 'pop' : ''}
                onClick={() => {
                  setMyTag(v)
                  getListData(1)
                }}
              >
                {`${v}(${v === '產品收藏' ? data.totalP : data.totalL})`}
              </div>
            )
          })}
        </div>
        {/* 白色框框 */}
        <div className="MB-wrap row m-0">
          {myTag === '產品收藏' ? (
            data.bookmark_product.length === 0 ? (
              <div className="MB-notfound font-M mt-5">
                <p className="">還沒收藏產品喔</p>
                <Link to={`/product`}>
                  <img
                    src="./../../Images/findProduct.png"
                    alt=""
                    width={250}
                  />
                </Link>
              </div>
            ) : (
              <ListMotionContainer element="div" className="row">
                {data.bookmark_product.map((v, i) => {
                  let imgarr = v.product_img.split(',')
                  return (
                    <ListMotionItem
                      key={v.sid}
                      element="div"
                      noShift
                      className="col col-md-4 col-12"
                    >
                      <div className="MB-card">
                        <Link to={`/product/${v.product_sid}`}>
                          <div className="MB-card-img">
                            <img
                              src={`${HOST}/images/product/${imgarr[0]}`}
                              alt=""
                            />
                          </div>
                        </Link>
                        <div className="MB-card-info font-R d-flex flex-column justify-content-between">
                          <p>{v.product_name}</p>
                        </div>
                        <div className="MB-card-bottom font-R d-flex ">
                          <p>${v.product_price}</p>
                          <Icon.Bin
                            onClick={() => {
                              deleteBookmark(v.product_sid, 'product')
                            }}
                          />
                        </div>
                      </div>
                    </ListMotionItem>
                  )
                })}
              </ListMotionContainer>
            )
          ) : data.bookmark_lesson.length === 0 ? (
            <div className="MB-notfound font-M mt-5">
              <p className="">還沒收藏課程喔</p>
              <Link to={`/lesson`}>
                <img src="./../../Images/findLesson.png" alt="" width={250} />
              </Link>
            </div>
          ) : (
            <ListMotionContainer element="div" className="row">
              {data.bookmark_lesson.map((v, i) => {
                let imgarr = v.lesson_img.split(',')
                return (
                  <ListMotionItem
                    key={v.sid}
                    element="div"
                    noShift
                    className="col col-md-4 col-12"
                  >
                    <div className="MB-card">
                      <Link to={`/lesson/${v.lesson_sid}`}>
                        <div className="MB-card-img">
                          <img
                            src={`${HOST}/images/lesson/${imgarr[0]}`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="MB-card-info font-R d-flex flex-column justify-content-between">
                        <p>{v.lesson_name}</p>
                      </div>
                      <div className="MB-card-bottom font-R d-flex ">
                        <p>${v.lesson_price}</p>
                        <Icon.Bin
                          onClick={() => {
                            deleteBookmark(v.lesson_sid, 'lesson')
                          }}
                        />
                      </div>
                    </div>
                  </ListMotionItem>
                )
              })}
            </ListMotionContainer>
          )}

          {/* 分頁按鈕 */}
          <ul className="P-page d-flex justify-content-center mt-3 gap-3 list-unstyled font-M">
            <li>
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault()
                  data.page - 1 === 0
                    ? getListData(1)
                    : getListData(`${data.page - 1}`)
                }}
              >
                <i className="fa-solid fa-angle-left"></i>
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault()
                  if (myTag === '產品收藏') {
                    data.page + 1 > data.totalPagesP
                      ? getListData(`${data.totalPagesP}`)
                      : getListData(`${data.page + 1}`)
                  } else {
                    data.page + 1 > data.totalPagesL
                      ? getListData(`${data.totalPagesL}`)
                      : getListData(`${data.page + 1}`)
                  }
                }}
              >
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyBookmarkLeft
