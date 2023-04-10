import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Icon from '../../icon/Icon'
import axios from 'axios'
import { COMMENT_DATA, HOST } from '../../components/api_config'

import './../../css/indexriver.css'

function IndexRiver() {
  const [data, setData] = useState({ comments: [] })
  // const [cardhover, setCardhover] = useState(false)

  const getListData = async () => {
    let response = await axios.get(COMMENT_DATA)
    setData(response.data)
    console.log(response.data)
  }
  useEffect(() => {
    getListData()
  }, [])

  return (
    <>
      <div className="container-fluid g-0">
        {/* 評論河道整體 */}
        <div className="IR-commnet">
          {/* 評論標題 */}
          <div className="IR-commnet-title d-flex justify-content-center align-items-center font-B">
            <img
              src="./Images/titlefarm.png"
              alt=""
              width="300"
              className="d-none d-md-block"
            />
            <h1>
              小小農<span>話題</span>
            </h1>
            <img
              src="./Images/titlefarm2.png"
              alt=""
              width="300"
              className="d-none d-md-block"
            />
          </div>
          {/* 評論河道範圍 */}
          <div className="IR-commnet-river font-R">
            {/* 評論本體電腦版 */}
            {data.comments.map((v, i) => {
              let imgP = ''
              let imgL = ''
              if (v.product_img) {
                imgP = v.product_img.split(',')
              }

              if (v.lesson_img) {
                imgL = v.lesson_img.split(',')
              }

              return (
                <div
                  key={i}
                  className="IR-commnet-info d-none d-md-block"
                  style={{
                    top: `${parseInt(Math.random() * 250)}px`,
                    left: `${i * 200}px`,
                  }}
                >
                  <div className="IR-commnet-avatar">
                    <img
                      src={
                        v.member_img
                          ? `${HOST}/images/avatar/${v.member_img}`
                          : `${HOST}/images/avatar/none.png`
                      }
                      alt=""
                    />
                  </div>
                  <p>{v.member_nickname || '匿名'}</p>
                  <div className="IR-commnet-star">
                    {[...Array(v.comment_value)].map((v, i) => {
                      return <Icon.Star key={i} />
                    })}
                  </div>
                  <p>{v.comment_content}</p>
                  <p>{dayjs(v.comment_publish_date).format('YYYY/MM/DD')}</p>
                  <div className="IR-commnet-link-wrap">
                    <Link
                      to={
                        imgP.length === 0
                          ? `/lesson/${v.lesson_sid}`
                          : `/product/${v.product_sid}`
                      }
                    >
                      <div className="IR-commnet-link">
                        <div>
                          <img
                            src={
                              imgP.length === 0
                                ? `${HOST}/images/lesson/${imgL[0]}`
                                : `${HOST}/images/product/${imgP[0]}`
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
            {/* 評論本體手機版 */}
            {data.comments.map((v, i) => {
              let imgP = ''
              let imgL = ''
              if (v.product_img) {
                imgP = v.product_img.split(',')
              }

              if (v.lesson_img) {
                imgL = v.lesson_img.split(',')
              }

              return (
                <div
                  key={i}
                  className="IR-commnet-info d-block d-md-none"
                  style={{
                    left: `${i * 400}px`,
                  }}
                >
                  <div className="IR-commnet-avatar">
                    <img
                      src={
                        v.member_img
                          ? `${HOST}/images/avatar/${v.member_img}`
                          : `${HOST}/images/avatar/none.png`
                      }
                      alt=""
                    />
                  </div>
                  <p>{v.member_nickname || '匿名'}</p>
                  <div className="IR-commnet-star">
                    {[...Array(v.comment_value)].map((v, i) => {
                      return <Icon.Star key={i} />
                    })}
                  </div>
                  <p>{v.comment_content}</p>
                  <p>{dayjs(v.comment_publish_date).format('YYYY/MM/DD')}</p>
                  <div className="IR-commnet-link-wrap">
                    <Link
                      to={
                        imgP.length === 0
                          ? `/lesson/${v.lesson_sid}`
                          : `/product/${v.product_sid}`
                      }
                    >
                      <div className="IR-commnet-link">
                        <div>
                          <img
                            src={
                              imgP.length === 0
                                ? `${HOST}/images/lesson/${imgL[0]}`
                                : `${HOST}/images/product/${imgP[0]}`
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}

            {/* 評論本體未展開 */}
            {/* <div className="IR-commnet-info-s d-flex align-items-center">
              <div>
                <img src="" alt="" />
              </div>
              <span>...</span>
            </div> */}
          </div>

          {/* 風車 */}
          <div className="IR-windmill d-none d-md-block">
            <span className="IR-windmill-body"></span>
            <span className="IR-windmill-fans-left"></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexRiver
