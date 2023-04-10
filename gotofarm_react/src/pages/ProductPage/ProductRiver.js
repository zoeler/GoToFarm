import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import Icon from '../../icon/Icon'
import { HOST } from '../../components/api_config'

function ProductRiver({
  data,
  comOrderD,
  setComOrderD,
  comOrderS,
  setComOrderS,
}) {
  const navigate = useNavigate()
  // 河道Animation用
  const [river, setRiver] = useState(false)

  // 河道拖拉用
  const [xdown, setXdown] = useState(0)
  const [xnow, setXnow] = useState(0)
  const [move, setMove] = useState('')
  const [cursor, setCursor] = useState('grab')

  return (
    <>
      <div className="container-fluid g-0">
        {/* 評論標題 */}
        <div className="P-commnet-title d-flex justify-content-center align-items-center font-B">
          <img
            src="./../../Images/titlefarm.png"
            alt=""
            width="300"
            className="d-none d-md-block"
          />
          <h1>
            小小農<span>話題</span>
          </h1>
          <img
            src="./../../Images/titlefarm2.png"
            alt=""
            width="300"
            className="d-none d-md-block"
          />
        </div>
        <div className="P-commnet">
          {/* 評論排序 */}
          <div className="PP-product-btn container d-flex justify-content-end align-items-center gap-3 mt-3 font-M">
            <button
              className={comOrderD !== '' ? 'ms-auto active' : 'ms-auto'}
              onClick={() => {
                setComOrderS('')
                if (comOrderD === '') {
                  setComOrderD('orderdateD')
                  navigate(`?orderdate=desc`)
                  river ? setRiver(false) : setRiver(true)
                  setMove(0)
                } else if (comOrderD === 'orderdateD') {
                  setComOrderD('orderdateA')
                  navigate(`?orderdate=asc`)
                  river ? setRiver(false) : setRiver(true)
                  setMove(0)
                } else {
                  setComOrderD('orderdateD')
                  navigate(`?orderdate=desc`)
                  river ? setRiver(false) : setRiver(true)
                  setMove(0)
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
                  river ? setRiver(false) : setRiver(true)
                  setMove(0)
                } else if (comOrderS === 'orderscoreD') {
                  setComOrderS('orderscoreA')
                  navigate(`?orderscore=asc`)
                  river ? setRiver(false) : setRiver(true)
                  setMove(0)
                } else {
                  setComOrderS('orderscoreD')
                  navigate(`?orderscore=desc`)
                  river ? setRiver(false) : setRiver(true)
                  setMove(0)
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
          {/* 整個評論區 */}
          <img
            className="P-wavetop w-100 d-none d-md-block"
            src="./../../Images/wavetop.png"
            alt=""
          />
          <img
            className="P-wavebottom w-100 d-none d-md-block"
            src="./../../Images/wavebottom.png"
            alt=""
          />
          {/* 河道範圍 */}
          <div
            className={
              river ? 'P-commnet-river font-R' : 'P-commnet-river font-R two'
            }
            // className="P-commnet-river font-R"
            style={{
              transform: `translateX(${move}px)`,
              cursor: `${cursor}`,
            }}
            onMouseEnter={() => {
              setCursor('grab')
            }}
            onMouseDown={(e) => {
              setXdown(e.nativeEvent.clientX)
              setCursor('grabbing')
            }}
            onMouseUp={(e) => {
              if (xdown > e.nativeEvent.clientX) {
                if (xnow > -8500) {
                  let newMove = xnow - (xdown - e.nativeEvent.clientX)
                  setMove(newMove)
                  setXnow(newMove)
                  setCursor('grab')
                }
              } else {
                if (xnow < 0) {
                  let newMove = xnow + e.nativeEvent.clientX - xdown
                  setMove(newMove)
                  setXnow(newMove)
                  setCursor('grab')
                }
              }
            }}
          >
            {/* 評論本體 */}
            {/* 電腦版評論 */}
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
                          v.member_img
                            ? `${HOST}/images/avatar/${v.member_img}`
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
            {/* 手機板評論 */}
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
                          v.member_img
                            ? `${HOST}/images/avatar/${v.member_img}`
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

export default ProductRiver
