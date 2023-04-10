import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  HOST,
  MY_COMMENT_DATA,
  COMMENT_ADD,
  COMMENT_EDIT,
} from '../../components/api_config'
import axios from 'axios'
import dayjs from 'dayjs'
import AuthContext from '../../contexts/AuthContext'
import {
  ListMotionContainer,
  ListMotionItem,
} from '../../components/ListMotion'

import './../../css/mybookmark.css'
import Icon from '../../icon/Icon'

function MyCommentLeft() {
  const { myAuth } = useContext(AuthContext)
  const [data, setData] = useState({
    page: 0,
    totalPagesP: '',
    totalPagesL: '',
    totalPagesPO: '',
    totalPagesLO: '',
    totalP: '',
    totalL: '',
    totalPO: '',
    totalLO: '',
    comment_product: [],
    comment_lesson: [],
    order_product: [],
    order_lesson: [],
  })

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

    const response = await axios.get(`${MY_COMMENT_DATA}`, {
      headers: { Authorization: 'Bearer ' + myAuth.token },
      params: { page },
    })
    console.log('?', response.data)
    setData(response.data)
  }

  useEffect(() => {
    getListData()
  }, [])

  // 新增評論
  const addComment = async (
    order_product_details_sid = 0,
    product_sid = 0,
    order_lesson_details_sid = 0,
    lesson_sid = 0,
    comment_value,
    comment_content
  ) => {
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
    if (comment_content.length === 0 || comment_value === 0) {
      setAlert('請輸入內容及點選星星唷！')
      return
    }
    if (product_sid !== 0) {
      response = await axios.post(
        `${COMMENT_ADD}/product`,
        {
          order_product_details_sid: order_product_details_sid,
          product_sid: product_sid,
          comment_value: comment_value,
          comment_content: comment_content,
        },
        { headers: { Authorization: 'Bearer ' + myAuth.token } }
      )
      console.log(response.data)
    } else {
      response = await axios.post(
        `${COMMENT_ADD}/lesson`,
        {
          order_lesson_details_sid: order_lesson_details_sid,
          lesson_sid: lesson_sid,
          comment_value: comment_value,
          comment_content: comment_content,
        },
        { headers: { Authorization: 'Bearer ' + myAuth.token } }
      )
      console.log(response.data)
    }

    getListData()
  }

  // 修改評論
  const editComment = async (type, sid, comment_value, comment_content) => {
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
    if (comment_content.length === 0 || comment_value === 0) {
      setAlert('請輸入內容及點選星星唷！')
      return
    }
    if (type === 'product') {
      response = await axios.post(
        `${COMMENT_EDIT}/product`,
        {
          sid: sid,
          comment_value: comment_value,
          comment_content: comment_content,
        },
        { headers: { Authorization: 'Bearer ' + myAuth.token } }
      )
      console.log(response.data)
    } else {
      response = await axios.post(
        `${COMMENT_EDIT}/lesson`,
        {
          sid: sid,
          comment_value: comment_value,
          comment_content: comment_content,
        },
        { headers: { Authorization: 'Bearer ' + myAuth.token } }
      )
      console.log(response.data)
    }

    getListData()
  }

  // 標籤
  const [myTag, setMyTag] = useState('產品評價')
  const [type, setType] = useState('已評價')

  // 標籤內容
  const tags = ['產品評價', '課程評價']
  const types = ['已評價', '未評價']

  // 評價星星
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  // 評價內容
  const [myinput, setMyinput] = useState('')

  // 進入編輯狀態
  const edit = (arr, sid) => {
    return arr.map((v, i) => {
      return v.sid === sid
        ? // 點擊到的進入編輯
          { ...v, edit: !v.edit }
        : //沒點到的無法編輯
          { ...v, edit: false }
    })
  }

  // 提示文字
  const [alert, setAlert] = useState('')

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
                  setType('已評價')
                  setRating(0)
                  setHover(0)
                  setMyinput('')
                  setAlert('')
                  getListData()
                }}
              >
                {`${v}`}
              </div>
            )
          })}
        </div>
        {/* 白色框框 */}
        <div className="MC-wrap">
          {myTag === '產品評價' ? (
            <>
              <div className="MB-type-btn d-flex gap-3 font-R mb-2 ">
                {types.map((v, i) => {
                  return (
                    <button
                      key={i}
                      className={type === v ? 'pop' : ''}
                      data-num={v === '未評價' ? data.totalPO : ''}
                      onClick={() => {
                        setType(v)
                        getListData()
                        setRating(0)
                        setHover(0)
                        setMyinput('')
                        setAlert('')
                      }}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              {type === '已評價' ? (
                data.comment_product.length === 0 ? (
                  <div className="MB-notfound font-M mt-5">
                    <p className="mb-5">還沒寫過產品評價喔</p>
                  </div>
                ) : (
                  <table className="MB-table font-B">
                    <thead>
                      <tr>
                        <th colSpan="2">產品資訊</th>
                        <th>評價內容</th>
                        <th></th>
                      </tr>
                    </thead>
                    <ListMotionContainer element="tbody" className="font-R">
                      {data.comment_product.map((v, i) => {
                        let imgarr = v.product_img.split(',')
                        return (
                          <ListMotionItem element="tr" key={v.sid}>
                            <td>
                              <div className="MB-img">
                                <img
                                  src={`${HOST}/images/product/${imgarr[0]}`}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <p>{v.product_name}</p>
                              <p>{`評價日期：${dayjs(
                                v.comment_publish_date
                              ).format('YYYY/MM/DD')}`}</p>
                              <span>
                                {[...Array(v.comment_value)].map((v, i) => {
                                  return <Icon.Star key={i} />
                                })}
                              </span>
                            </td>
                            <td>
                              {v.edit ? (
                                <>
                                  <textarea
                                    name="comment"
                                    rows="3"
                                    value={myinput}
                                    onChange={(e) => {
                                      setMyinput(e.target.value)
                                    }}
                                  />
                                  <div className="d-flex align-items-center">
                                    <div className="MB-star ms-md-3 d-flex gap-md-1 gap-0 ">
                                      {[...Array(5)].map((v, i) => {
                                        i += 1
                                        return (
                                          <button
                                            type="button"
                                            key={i}
                                            onClick={() => {
                                              setRating(i)
                                            }}
                                            onMouseEnter={() => {
                                              setHover(i)
                                            }}
                                            onMouseLeave={() => {
                                              setHover(rating)
                                            }}
                                          >
                                            {i <= (hover || rating) ? (
                                              <Icon.Star />
                                            ) : (
                                              <Icon.StarG />
                                            )}
                                          </button>
                                        )
                                      })}
                                    </div>
                                    <span className="ms-auto me-md-3 d-none d-md-block">
                                      {alert}
                                    </span>
                                    <button
                                      className="MB-table-btn me-md-3 ms-auto ms-md-0"
                                      onClick={() => {
                                        editComment(
                                          'product',
                                          v.sid,
                                          rating,
                                          myinput
                                        )
                                        setRating(0)
                                        setHover(0)
                                        setMyinput('')
                                      }}
                                    >
                                      <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                v.comment_content
                              )}
                            </td>
                            <td>
                              {v.edit ? (
                                ''
                              ) : (
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={() => {
                                    const new_comment_product = edit(
                                      data.comment_product,
                                      v.sid
                                    )
                                    setData({
                                      ...data,
                                      comment_product: new_comment_product,
                                    })
                                    setAlert('')
                                    setHover(0)
                                    setRating(0)
                                    setMyinput(v.comment_content)
                                  }}
                                ></i>
                              )}
                            </td>
                          </ListMotionItem>
                        )
                      })}
                    </ListMotionContainer>
                  </table>
                )
              ) : (
                <table className="MB-table font-B">
                  <thead>
                    <tr>
                      <th colSpan="2">產品資訊</th>
                      <th colSpan="1">評價內容</th>
                    </tr>
                  </thead>
                  <ListMotionContainer element="tbody" className="font-R">
                    {data.order_product.map((v, i) => {
                      return (
                        <ListMotionItem element="tr" key={v.sid}>
                          <td>
                            <div className="MB-img">
                              <img
                                src={`${HOST}/images/product/${v.product_img}`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <p>{v.product_name}</p>
                            <p>{`購買日期：${dayjs(v.order_sdate).format(
                              'YYYY/MM/DD'
                            )}`}</p>
                          </td>
                          <td>
                            {v.edit ? (
                              <>
                                <textarea
                                  name="comment"
                                  rows="3"
                                  value={myinput}
                                  onChange={(e) => {
                                    setMyinput(e.target.value)
                                  }}
                                />
                                <div className="d-flex align-items-center">
                                  <div className="MB-star ms-md-3 d-flex gap-md-1 gap-0">
                                    {[...Array(5)].map((v, i) => {
                                      i += 1
                                      return (
                                        <button
                                          type="button"
                                          key={i}
                                          onClick={() => {
                                            setRating(i)
                                          }}
                                          onMouseEnter={() => {
                                            setHover(i)
                                          }}
                                          onMouseLeave={() => {
                                            setHover(rating)
                                          }}
                                        >
                                          {i <= (hover || rating) ? (
                                            <Icon.Star />
                                          ) : (
                                            <Icon.StarG />
                                          )}
                                        </button>
                                      )
                                    })}
                                  </div>
                                  <span className="ms-auto me-md-3 d-none d-md-block">
                                    {alert}
                                  </span>
                                  <button
                                    className="MB-table-btn me-md-3 ms-auto ms-md-0"
                                    onClick={() => {
                                      const product_sid = parseInt(
                                        v.product_id.substr(8)
                                      )
                                      addComment(
                                        v.sid,
                                        product_sid,
                                        0,
                                        0,
                                        rating,
                                        myinput
                                      )
                                      setRating(0)
                                      setHover(0)
                                      setMyinput('')
                                    }}
                                  >
                                    <i className="fa-solid fa-paper-plane"></i>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div
                                className="MB-table-editbtn"
                                onClick={() => {
                                  const new_order_product = edit(
                                    data.order_product,
                                    v.sid
                                  )
                                  setData({
                                    ...data,
                                    order_product: new_order_product,
                                  })
                                  setAlert('')
                                  setHover(0)
                                  setRating(0)
                                  setMyinput('')
                                }}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </div>
                            )}
                          </td>
                        </ListMotionItem>
                      )
                    })}
                  </ListMotionContainer>
                </table>
              )}
            </>
          ) : (
            <>
              <div className="MB-type-btn d-flex gap-3 font-R mb-2">
                {types.map((v, i) => {
                  return (
                    <button
                      key={i}
                      className={type === v ? 'pop' : ''}
                      data-num={v === '未評價' ? data.totalLO : ''}
                      onClick={() => {
                        setType(v)
                        getListData(1)
                      }}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              {type === '已評價' ? (
                data.comment_lesson.length === 0 ? (
                  <div className="MB-notfound font-M mt-5">
                    <p className="mb-5">還沒寫過課程評價喔</p>
                  </div>
                ) : (
                  <table className="MB-table font-B">
                    <thead>
                      <tr>
                        <th colSpan="2">課程資訊</th>
                        <th>評價內容</th>
                        <th></th>
                      </tr>
                    </thead>
                    <ListMotionContainer element="tbody" className="font-R">
                      {data.comment_lesson.map((v, i) => {
                        let imgarr = v.lesson_img.split(',')
                        return (
                          <ListMotionItem element="tr" key={v.sid}>
                            <td>
                              <div className="MB-img">
                                <img
                                  src={`${HOST}/images/lesson/${imgarr[0]}`}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <p>{v.lesson_name}</p>
                              <p>{`評價日期：${dayjs(
                                v.comment_publish_date
                              ).format('YYYY/MM/DD')}`}</p>
                              <span>
                                {[...Array(v.comment_value)].map((v, i) => {
                                  return <Icon.Star key={i} />
                                })}
                              </span>
                            </td>
                            <td>
                              {v.edit ? (
                                <>
                                  <textarea
                                    name="comment"
                                    rows="3"
                                    value={myinput}
                                    onChange={(e) => {
                                      setMyinput(e.target.value)
                                    }}
                                  />
                                  <div className="d-flex align-items-center">
                                    <div className="MB-star ms-md-3 d-flex gap-md-1 gap-0">
                                      {[...Array(5)].map((v, i) => {
                                        i += 1
                                        return (
                                          <button
                                            type="button"
                                            key={i}
                                            onClick={() => {
                                              setRating(i)
                                            }}
                                            onMouseEnter={() => {
                                              setHover(i)
                                            }}
                                            onMouseLeave={() => {
                                              setHover(rating)
                                            }}
                                          >
                                            {i <= (hover || rating) ? (
                                              <Icon.Star />
                                            ) : (
                                              <Icon.StarG />
                                            )}
                                          </button>
                                        )
                                      })}
                                    </div>
                                    <span className="ms-auto me-md-3 d-none d-md-block">
                                      {alert}
                                    </span>
                                    <button
                                      className="MB-table-btn me-md-3 ms-auto ms-md-0"
                                      onClick={() => {
                                        console.log('he')
                                        editComment(
                                          'lesson',
                                          v.sid,
                                          rating,
                                          myinput
                                        )
                                        setRating(0)
                                        setHover(0)
                                        setMyinput('')
                                      }}
                                    >
                                      <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                v.comment_content
                              )}
                            </td>
                            <td>
                              {v.edit ? (
                                ''
                              ) : (
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={() => {
                                    const new_comment_lesson = edit(
                                      data.comment_lesson,
                                      v.sid
                                    )
                                    setData({
                                      ...data,
                                      comment_lesson: new_comment_lesson,
                                    })
                                    setAlert('')
                                    setHover(0)
                                    setRating(0)
                                    setMyinput(v.comment_content)
                                  }}
                                ></i>
                              )}
                            </td>
                          </ListMotionItem>
                        )
                      })}
                    </ListMotionContainer>
                  </table>
                )
              ) : (
                <table className="MB-table font-B">
                  <thead>
                    <tr>
                      <th colSpan="2">課程資訊</th>
                      <th colSpan="1">評價內容</th>
                    </tr>
                  </thead>
                  <ListMotionContainer element="tbody" className="font-R">
                    {data.order_lesson.map((v, i) => {
                      return (
                        <ListMotionItem element="tr" key={v.sid}>
                          <td>
                            <div className="MB-img">
                              <img
                                src={`${HOST}/images/lesson/${v.lesson_img}`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <p>{v.lesson_name}</p>
                            <p>{`購買日期：${dayjs(v.order_sdate).format(
                              'YYYY/MM/DD'
                            )}`}</p>
                          </td>
                          <td>
                            {v.edit ? (
                              <>
                                <textarea
                                  name="comment"
                                  rows="3"
                                  value={myinput}
                                  onChange={(e) => {
                                    setMyinput(e.target.value)
                                  }}
                                />
                                <div className="d-flex align-items-center">
                                  <div className="MB-star ms-md-3 d-flex gap-md-1 gap-0">
                                    {[...Array(5)].map((v, i) => {
                                      i += 1
                                      return (
                                        <button
                                          type="button"
                                          key={i}
                                          onClick={() => {
                                            setRating(i)
                                          }}
                                          onMouseEnter={() => {
                                            setHover(i)
                                          }}
                                          onMouseLeave={() => {
                                            setHover(rating)
                                          }}
                                        >
                                          {i <= (hover || rating) ? (
                                            <Icon.Star />
                                          ) : (
                                            <Icon.StarG />
                                          )}
                                        </button>
                                      )
                                    })}
                                  </div>
                                  <span className="ms-auto me-md-3 d-none d-md-block">
                                    {alert}
                                  </span>
                                  <button
                                    className="MB-table-btn me-md-3 ms-auto ms-md-0"
                                    onClick={() => {
                                      const lesson_sid = parseInt(
                                        v.lesson_id.substr(8)
                                      )
                                      addComment(
                                        0,
                                        0,
                                        v.sid,
                                        lesson_sid,
                                        rating,
                                        myinput
                                      )
                                      setRating(0)
                                      setHover(0)
                                      setMyinput('')
                                    }}
                                  >
                                    <i className="fa-solid fa-paper-plane"></i>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div
                                className="MB-table-editbtn"
                                onClick={() => {
                                  const new_order_lesson = edit(
                                    data.order_lesson,
                                    v.sid
                                  )
                                  setData({
                                    ...data,
                                    order_lesson: new_order_lesson,
                                  })
                                  setAlert('')
                                  setHover(0)
                                  setRating(0)
                                  setMyinput('')
                                }}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </div>
                            )}
                          </td>
                        </ListMotionItem>
                      )
                    })}
                  </ListMotionContainer>
                </table>
              )}
            </>
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
                  switch (myTag) {
                    case '產品評價':
                    default:
                      switch (type) {
                        case '未評價':
                          data.page + 1 > data.totalPagesPO
                            ? getListData(`${data.totalPagesPO}`)
                            : getListData(`${data.page + 1}`)
                          break
                        case '已評價':
                        default:
                          data.page + 1 > data.totalPagesP
                            ? getListData(`${data.totalPagesP}`)
                            : getListData(`${data.page + 1}`)
                      }
                      break
                    case '課程評價':
                      switch (type) {
                        case '未評價':
                          data.page + 1 > data.totalPagesLO
                            ? getListData(`${data.totalPagesLO}`)
                            : getListData(`${data.page + 1}`)
                          break
                        case '已評價':
                        default:
                          data.page + 1 > data.totalPagesL
                            ? getListData(`${data.totalPagesL}`)
                            : getListData(`${data.page + 1}`)
                      }
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

export default MyCommentLeft
