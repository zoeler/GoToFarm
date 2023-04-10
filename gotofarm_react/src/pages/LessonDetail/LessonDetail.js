import React, { useContext, useEffect, useState } from 'react'
import {
  LESSON_DETAIL_DATA,
  HOST,
  BOOKMARK_ADD,
  BOOKMARK_DELETE,
} from '../../components/api_config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../components/utils/useCart'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import dayjs from 'dayjs'
import Weather from '../weather/Weather'
//引入元件
import Icon from '../../icon/Icon'
import AsNavFor from './AsNavFor'
import CalendarNew from './CalendarNew'
import AuthContext from '../../contexts/AuthContext'
import Auth_C from '../../components/Auth_C'

function LessonDetail() {
  const { sid } = useParams()
  const navigate = useNavigate()
  const { myAuth } = useContext(AuthContext)

  // --------狀態及變數區--------
  // 資料
  const [data, setData] = useState({
    rows: [],
    teachers: [],
    comments: [],
    bookmark_member_sid: [],
    lesson_sid: '',
    uplimit1: '',
    uplimit2: '',
  })

  // 標籤
  const [myTag, setMyTag] = useState('課程介紹')
  // 標籤內容
  const tags = ['課程介紹', '老師介紹']

  //購物車
  const { addItem } = useCart()

  //月曆
  const [date, setDate] = useState(new Date())
  // console.log(date)
  const newDate = new Date(date)
  const year = newDate.getFullYear().toString()
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`

  // console.log(formattedDate)

  // 評論排序
  const [comOrderD, setComOrderD] = useState('')
  const [comOrderS, setComOrderS] = useState('')

  //顯示登入提醒
  const [alertLogin, setAlertLogin] = useState(false)

  // 河道動畫
  const [river, setRiver] = useState(false)

  //人數限制
  const [limit, setLimit] = useState(0)

  //人數若已滿
  const [limitAlert, setLimitAlert] = useState(false)

  const getListData = async () => {
    const res = await axios.get(`${LESSON_DETAIL_DATA}/${sid}`)
    // console.log(res)
    setData(res.data)
    // setLimit(res.data.limit[0].lesson_uplimit)
    // console.log('limit', res.data.limit[0].lesson_uplimit)
  }

  // 新增收藏
  const addBookmark = async (lessonSid = 0) => {
    // console.log('addBookmark')
    if (!+lessonSid) return
    console.log('addBookmark')
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
      `${BOOKMARK_ADD}/lesson`,
      {
        lesson_sid: lessonSid,
      },
      { headers: { Authorization: 'Bearer ' + myAuth.token } }
    )
    console.log(response.data)
    getListData(sid)
  }

  // 刪除收藏
  const deleteBookmark = async (lessonSid = 0) => {
    console.log('deBookmark')
    if (!+lessonSid) return
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
      `${BOOKMARK_DELETE}/lesson/${lessonSid}`,

      { headers: { Authorization: 'Bearer ' + myAuth.token } }
    )
    console.log(response.data)
    getListData(sid)
  }

  useEffect(() => {
    getListData(sid).then(() => {})
  }, [sid])
  return (
    <>
      {/* {alertLogin ? <Auth_P setAlertLogin={setAlertLogin} /> : <></>} */}
      {limitAlert ? <Auth_C setLimitAlert={setLimitAlert} /> : <></>}
      <div className="container container-fliud">
        <div className="row">
          {data.rows.map((v, i) => {
            return (
              <div className="col col-12 p-0 mb-5 L-useMargin" key={v.sid}>
                <div className="container card">
                  <div className="row">
                    {/* <!-- 左邊的照片 --> */}
                    <AsNavFor />
                    {/* <!-- 右邊的資訊 --> */}
                    <div className="col">
                      <div className="card-body d-flex flex-column align-items-md-stretch h-100">
                        <h1 className="card-title font-B f-Brown">
                          {v.lesson_name}
                        </h1>
                        <div className="d-flex justify-content-start font-R f-Gray mb-2">
                          {/* <span>評價: </span> */}
                          <img src="/Icons/star_figma.svg" alt="123" />
                          <img src="/Icons/star_figma.svg" alt="123" />
                          <img src="/Icons/star_figma.svg" alt="123" />
                          <img src="/Icons/star_figma.svg" alt="123" />
                          <img src="/Icons/star_figma.svg" alt="123" />
                        </div>
                        <div className="card-text flex-md-grow-1 font-R f-24 f-Gray">
                          {/* 將內容換行,SQL裡面記得下<br> */}
                          <p
                            className="mb-1"
                            dangerouslySetInnerHTML={{ __html: v.lesson_info1 }}
                          ></p>
                          <p className="mb-1">活動日期: {v.lesson_date}</p>
                          <span className="font-R f-Gray">
                            報名人數上限: {v.lesson_uplimit} 人
                          </span>
                          <div className="d-flex justify-content-start f-32 font-R f-WineRed">
                            <span className="mb-1">
                              費用:{v.lesson_price}/個人
                            </span>
                          </div>
                          <div className="d-flex flex-column flex-md-row gap-md-3 mb-3">
                            <CalendarNew
                              date={date}
                              setDate={setDate}
                              setLimit={setLimit}
                            />
                            <Weather />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center gap-md-5 gap-1">
                          {v.bookmark_member_sid.includes(myAuth.sid) ? (
                            <div
                              className="P-btn-fav d-md-block"
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
                              className="P-btn-fav d-md-block"
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

                          <div
                            className="P-btn-cart d-md-block"
                            onClick={() => {
                              if (
                                data.uplimit1 >= 20 &&
                                formattedDate === data.lesson_date.split(',')[0]
                              ) {
                                console.log(data.lesson_date.split(',')[0])
                                setLimitAlert(true)
                                return
                              } else {
                                addItem({
                                  id: v.lesson_id,
                                  img: v.lesson_img.split(',')[0].trim(),
                                  name: v.lesson_name,
                                  date: formattedDate,
                                  price: v.lesson_price,
                                  quantity: 1,
                                })
                              }
                              navigate('/Cart')
                            }}
                          >
                            <img
                              src="./../../../../Buttons/ButtonCart.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="col col-12 p-0">
            {/* 切換標籤 */}
            <div className="P-product-more-wrap d-flex flex-column align-items-center">
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
              {myTag === '課程介紹'
                ? data.rows.map((v, i) => {
                    let imgarr = v.lesson_img.split(',')
                    return (
                      <div
                        key={i}
                        className="P-product-more d-flex flex-column-reverse flex-md-row gap-md-5 gap-4 w-100"
                      >
                        <div className="P-product-more-info font-R d-flex flex-column">
                          <div>
                            <h1 className="font-M ">{v.lesson_name}</h1>
                            <h3 className="font-M ">{v.lesson_category}</h3>
                          </div>
                          <div>
                            <p>{v.lesson_info2}</p>
                          </div>
                        </div>
                        <div className="P-product-more-img">
                          <img
                            src={`${HOST}/images/lesson/${imgarr[0]}`}
                            alt=""
                          />
                        </div>
                      </div>
                    )
                  })
                : data.teachers.map((v, i) => {
                    let imgarr = v.teacher_img.split(',')
                    return (
                      <div
                        key={i}
                        className="P-product-more d-flex flex-column flex-md-row gap-5 w-100"
                      >
                        <div className="P-product-more-img">
                          <img
                            src={`${HOST}/images/lesson/${imgarr[0]}`}
                            alt=""
                          />
                        </div>
                        <div className="P-product-more-farmer font-R d-flex flex-column">
                          <div>
                            <h1 className="font-M">{v.name}</h1>
                            <h3 className="font-M">{v.slogan}</h3>
                          </div>
                          <div>
                            <p>{v.teacher_info}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 留言區 --> */}
      <div className="container-fluid g-0">
        {/* 評論標題 */}
        <div className="P-commnet-title d-flex justify-content-center align-items-center font-B">
          <h1>
            小小農<span>話題</span>
          </h1>
        </div>
        <div className="P-commnet">
          {/* 評論排序 */}
          <div className="PP-product-btn container-fluid d-flex justify-content-end align-items-center gap-3 mt-3 font-M">
            <button
              className={comOrderD !== '' ? 'ms-auto active' : 'ms-auto'}
              onClick={() => {
                setComOrderS('')
                if (comOrderD === '') {
                  setComOrderD('orderdateD')
                  navigate(`?orderdate=desc`)
                  river ? setRiver(false) : setRiver(true)
                } else if (comOrderD === 'orderdateD') {
                  setComOrderD('orderdateA')
                  navigate(`?orderdate=asc`)
                  river ? setRiver(false) : setRiver(true)
                } else {
                  setComOrderD('orderdateD')
                  navigate(`?orderdate=desc`)
                  river ? setRiver(false) : setRiver(true)
                }
              }}
            >
              日期排序
              <i
                className={
                  comOrderD === 'orderdateA'
                    ? 'fa-solid fa-caret-up ms-2 '
                    : 'fa-solid fa-caret-down ms-2 '
                }
              ></i>
            </button>
            <button
              className={comOrderS !== '' ? 'active' : ''}
              onClick={() => {
                setComOrderD('')
                if (comOrderS === '') {
                  setComOrderS('orderscoreD')
                  navigate(`?orderscore=desc`)
                } else if (comOrderS === 'orderscoreD') {
                  setComOrderS('orderscoreA')
                  navigate(`?orderscore=asc`)
                } else {
                  setComOrderS('orderscoreD')
                  navigate(`?orderscore=desc`)
                }
              }}
            >
              評分排序
              <i
                className={
                  comOrderS === 'orderscoreA'
                    ? 'fa-solid fa-caret-up ms-2 '
                    : 'fa-solid fa-caret-down ms-2 '
                }
              ></i>
            </button>
          </div>
          {/* 評論河道 */}
          <img
            className="L-wavetop w-100 d-none d-md-block"
            src="/Images/wavetop.png"
            alt=""
          />
          <img
            className="L-wavebottom w-100 d-none d-md-block"
            src="/Images/wavebottom.png"
            alt=""
          />
          {/* 河道範圍 */}
          <div
            className={
              river ? 'P-commnet-river font-R' : 'P-commnet-river font-R two'
            }
          >
            {/* 評論本體 */}
            {data.comments.map((v, i) => {
              return (
                <div
                  key={v.sid}
                  className="P-commnet-info d-none d-md-flex align-items-center"
                  style={{
                    top: `${((i % 2) + 1) * 50 + (i % 2) * 50}px`,
                    left: `${i * 500}px`,
                  }}
                >
                  <div className="P-commnet-avatar d-flex flex-column align-items-center gap-2">
                    <div>
                      <img
                        src={
                          v.member_nickname
                            ? `${HOST}/images/avatar/${parseInt(
                                Math.random() * 100
                              )}.png`
                            : `${HOST}/images/avatar/none.png`
                        }
                        alt=""
                      />
                    </div>
                    <span>{v.member_nickname || '匿名'}</span>
                  </div>
                  <div className="P-commnet-text d-flex flex-column align-items-center justify-content-between h-100  gap-2">
                    <div className="d-flex gap-1 mt-3">
                      {[...Array(v.comment_value)].map((v, i) => {
                        return <Icon.Star key={i} />
                      })}
                    </div>
                    <p>{v.comment_content}</p>
                    <span>
                      {dayjs(v.comment_publish_date).format('YYYY/MM/DD')}
                    </span>
                  </div>
                </div>
              )
            })}
            {data.comments.map((v, i) => {
              return (
                <div
                  key={v.sid}
                  className="P-commnet-info d-flex d-md-none align-items-center"
                  style={{
                    left: `${i * 385}px`,
                  }}
                >
                  <div className="P-commnet-avatar d-flex flex-column align-items-center gap-2">
                    <div>
                      <img
                        src={
                          v.member_nickname
                            ? `${HOST}/images/avatar/${parseInt(
                                Math.random() * 100
                              )}.png`
                            : `${HOST}/images/avatar/none.png`
                        }
                        alt=""
                      />
                    </div>
                    <span>{v.member_nickname || '匿名'}</span>
                  </div>
                  <div className="P-commnet-text d-flex flex-column align-items-center justify-content-between h-100  gap-2">
                    <div className="d-flex gap-1 mt-3">
                      {[...Array(v.comment_value)].map((v, i) => {
                        return <Icon.Star key={i} />
                      })}
                    </div>
                    <p>{v.comment_content}</p>
                    <span>
                      {dayjs(v.comment_publish_date).format('YYYY/MM/DD')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default LessonDetail
