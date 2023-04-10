import { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import axios from 'axios'
import { COUPON_RABBIT, DONE_RABBIT } from '../../components/api_config'
import NewAwardsR from '../../components/NewAwardsR'
import ProgressBar from 'react-bootstrap/ProgressBar'

import './../../css/rabbit.css'
function Rabbit() {
  const navigate = useNavigate()
  const { myAuth } = useContext(AuthContext)

  const wrapRef = useRef(null)
  const rabbitRef = useRef(null)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [face, setFace] = useState(false)
  const [carrot, setCarrot] = useState(10)
  const [food, setFood] = useState('RA-carrot')
  const movement = 30

  // 登入狀態判斷
  const isLogin = () => {
    if (!myAuth.authorized) {
      navigate('/')
    }
  }
  // 獲得勳章動畫
  const [isNew, setIsNew] = useState(false)
  const [myNewAward, setMyNewAward] = useState({})

  // 已領取過提示
  const [doneAlert, setDoneAlert] = useState(false)

  // 左右移動
  const moveX = (direction) => {
    const maxLeft =
      wrapRef.current.clientWidth - rabbitRef.current.clientWidth - movement
    if (carrot > 0) {
      if (direction === 'right') {
        setFace(false)
        if (left <= maxLeft) {
          rabbitRef.current.style.left = `${left + movement}px`
          setLeft(left + movement)
        }
      } else {
        setFace(true)
        if (left >= movement) {
          rabbitRef.current.style.left = `${left - movement}px`
          setLeft(left - movement)
        }
      }
    }
  }

  // 上下移動
  const moveY = (direction) => {
    const maxTop =
      wrapRef.current.clientHeight - rabbitRef.current.clientHeight - movement
    if (carrot > 0) {
      if (direction === 'top') {
        if (top >= movement) {
          rabbitRef.current.style.top = `${top - movement}px`
          setTop(top - movement)
        }
      } else {
        if (top <= maxTop) {
          rabbitRef.current.style.top = `${top + movement}px`
          setTop(top + movement)
        }
      }
    }
  }

  // 鍵盤事件
  const handleKeydown = (key) => {
    switch (key) {
      case 'ArrowRight':
      default:
        moveX('right')
        break
      case 'ArrowLeft':
        moveX('left')
        break
      case 'ArrowUp':
        moveY('top')
        break
      case 'ArrowDown':
        moveY('down')
        break
    }
  }
  // 吃吃
  const eatCarrot = () => {
    const carrots = document.querySelectorAll(`.${food}`)
    carrots.forEach((v, i) => {
      if (
        parseInt(top + rabbitRef.current.clientHeight) >
          parseInt(v.style.top) &&
        parseInt(top) < parseInt(v.style.top + v.clientHeight) &&
        parseInt(left + rabbitRef.current.clientWidth) >
          parseInt(v.style.left) &&
        parseInt(left) < parseInt(v.style.left + v.clientWidth)
      ) {
        v.remove()
        setCarrot(carrot - 1)
      }
    })
  }

  // 發送優惠券
  const addCoupon = async () => {
    console.log('he!')
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
      COUPON_RABBIT,
      {},
      {
        headers: { Authorization: 'Bearer ' + myAuth.token },
      }
    )

    if (response.data.done) {
      setDoneAlert(response.data.done)
      return
    }
    setIsNew(response.data.MyNew)
    setMyNewAward(response.data.rabbit_data)
  }

  const doneGame = async () => {
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
      DONE_RABBIT,
      {},
      {
        headers: { Authorization: 'Bearer ' + myAuth.token },
      }
    )
    if (response.data.done) {
      setDoneAlert(response.data.done)
    }
  }

  useEffect(() => {
    isLogin()
    eatCarrot()
  }, [left, top, food])

  // 避免視窗隨著方向鍵滾動
  useEffect(() => {
    doneGame()
    window.addEventListener(
      'keydown',
      function (e) {
        if (
          ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) >
          -1
        ) {
          e.preventDefault()
        }
      },
      false
    )
  }, [])

  return (
    <>
      {isNew && <NewAwardsR setIsNew={setIsNew} myNewAward={myNewAward} />}
      <div id="rabbitgame" className="font-R ">
        {doneAlert ? (
          <div className="RA-info mx-auto text-center">
            <p>{`哈囉～${myAuth.member_nickname}！`}</p>
            <p className="mb-5">
              你已經是幸運兔兔的<span className="green">好朋友</span>
              ，歡迎你隨時來找他玩唷！
            </p>
            {carrot !== 0 ? (
              <>
                <h4 className="text-center mb-2">兔兔飽足感</h4>
                <div className="RA-bar mb-4">
                  <ProgressBar
                    now={((carrot - 10) / 10) * -100}
                    striped
                    variant="warning"
                    animated
                  />
                </div>
              </>
            ) : (
              <>
                <h4 className="text-center mb-4">兔兔吃飽囉！謝謝你！ </h4>
                <button
                  className="RA-again mb-4"
                  onClick={() => {
                    window.location.reload()
                  }}
                >
                  再玩一次
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="RA-info mx-auto text-center">
            <p>
              哇！恭喜你發現了小農遊的<span className="green">隱藏</span>
              小兔兔園！
            </p>
            <p>
              這裡有一隻貪吃的<span className="yellow">幸運</span>小兔兔
              ，據說餵飽他的人都會有<span className="yellow">好事</span>發生！？
            </p>
            <p className="mb-5 ">他現在正好有點餓...</p>
            {carrot !== 0 ? (
              <>
                {/* <h2 className="text-center mb-4">
                兔兔飽足感：<span>{`${((carrot - 10) / 10) * -100}%`}</span>
              </h2> */}
                <h4 className="text-center mb-2">兔兔飽足感</h4>
                <div className="RA-bar mb-4">
                  <ProgressBar
                    now={((carrot - 10) / 10) * -100}
                    striped
                    variant="warning"
                    animated
                  />
                </div>
              </>
            ) : (
              <>
                <h4 className="text-center mb-4">
                  兔兔吃飽囉！恭喜得到一張<span>兔飽飽券</span>！
                </h4>
                <div className="RA-coupon mb-4 mx-auto">
                  <img src="./../../Icons/coupon.svg" alt="coupon" />
                  <span
                    className="ms-1 yellow"
                    onClick={() => {
                      addCoupon()
                    }}
                  >
                    點擊領取優惠券
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        <div
          className="RA-gamebody d-flex justify-content-center align-items-center"
          tabIndex={0}
          onKeyDown={(e) => {
            handleKeydown(e.key)
          }}
        >
          <div className="RA-left">
            {' '}
            {/* 食物選項*/}
            <div className="RA-food d-flex flex-column gap-4">
              <div className="text-center">
                {/* 胡蘿蔔 */}
                <button
                  className=""
                  onClick={() => {
                    setFood('RA-carrot')
                  }}
                >
                  <i class="fa-solid fa-carrot"></i>
                </button>
              </div>
              <div className="text-center">
                {/* 蘋果 */}
                <button
                  className=""
                  onClick={() => {
                    setFood('RA-yuzu')
                  }}
                >
                  <i class="fa-solid fa-apple-whole"></i>
                </button>
              </div>
              <div className="text-center">
                {/* 餅乾 */}
                <button
                  className=""
                  onClick={() => {
                    setFood('RA-cookie')
                  }}
                >
                  <i class="fa-solid fa-cookie"></i>
                </button>
              </div>
            </div>
          </div>
          {/* 草地 */}
          <div className="RA-wrap" ref={wrapRef}>
            <div
              className={
                carrot < 1
                  ? 'RA-rabbit RA-end'
                  : face
                  ? 'RA-rabbit RA-start RA-face'
                  : 'RA-rabbit RA-start'
              }
              ref={rabbitRef}
            ></div>
            {[...Array(10)].map((v, i) => {
              return (
                <div
                  key={i}
                  className={food}
                  style={{
                    // left: `${Math.ceil(Math.random() * 700 + 50)}px`,
                    // top: `${Math.ceil(Math.random() * 300 + 50)}px`,
                    left: `${(i / 10) * 400 + 50}px`,
                    top: `${(i % 2) * 200 + 80}px`,
                  }}
                ></div>
              )
            })}
          </div>
          <div className="RA-right">
            {/* 方向鍵 */}
            <div className="RA-key">
              <div className="text-center">
                {/* 向上 */}
                <button
                  className=""
                  onClick={() => {
                    moveY('top')
                  }}
                >
                  <i className="fa-solid fa-caret-up"></i>
                </button>
              </div>
              <div className="text-center">
                {/* 向左 */}
                <button
                  className=" me-5"
                  onClick={() => {
                    moveX('left')
                  }}
                >
                  <i className="fa-solid fa-caret-left"></i>
                </button>
                {/* 向右 */}
                <button
                  className=""
                  onClick={() => {
                    moveX('right')
                  }}
                >
                  <i className="fa-solid fa-caret-right"></i>
                </button>
              </div>
              <div className="text-center">
                {/* 向下 */}
                <button
                  className=""
                  onClick={() => {
                    moveY('down')
                  }}
                >
                  <i className="fa-solid fa-caret-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rabbit
