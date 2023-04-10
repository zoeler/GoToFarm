import React, { useEffect, useState } from 'react'
import { LESSON_DATA, HOST } from '../../components/api_config'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../css/Lesson.css'
import Icon from '../../icon/Icon'

function Lesson() {
  const [lessonData, setLessonData] = useState([])

  //課程篩選
  const lessonOptions = [
    '全部課程',
    '農耕體驗',
    '採收體驗',
    '親子體驗',
    '生態學堂',
  ]

  const [lessonCategoryFilter, setLessonCategoryFilter] = useState('全部課程')

  //串接後端
  const getLessonData = async () => {
    const res = await axios.get(LESSON_DATA)
    // console.log(res)
    setLessonData(res.data)
  }
  //純函式-傳入資料陣列,以lessonCategoryFilter進行過濾=>回傳過濾後的資料陣列
  const filterByCategory = (lessonData, lessonCategoryFilter) => {
    switch (lessonCategoryFilter) {
      case '生態學堂':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 4
        })
      case '親子體驗':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 3
        })
      case '採收體驗':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 2
        })
      case '農耕體驗':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 1
        })
      case '全部課程':
      default:
        return lessonData
    }
  }

  // 串接後端lessonList
  useEffect(() => {
    getLessonData()
  }, [])

  return (
    <>
      <header>
        <img className="header-img" src="/Images/lesson-title.jpg" alt="123" />
      </header>
      <section className="pt-5">
        <div className="container">
          <div className="d-flex justify-content-center align-items-baseline">
            <div className="d-flex justify-content-center align-items-baseline">
              <div className="d-flex flex-column">
                <h1 className="font-B f-Yellow L-title">新小農活</h1>
              </div>
              <h6 className="font-B f-Brown">系列課程</h6>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <button
              className="L-categories-side-btn navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="font-B f-16">全部課程</span>
            </button>
            <div
              className="offcanvas offcanvas-start align-items-center listcolor"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              style={{ width: '300px' }}
            >
              <div className="offcanvas-header align-items-baseline gap-3">
                <h5 className="font-R f-Yellow">新小農活</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              {/* 分類按鈕 */}
              <ul className="navbar-nav L-categories-btn gap-3">
                {lessonOptions.map((v, i) => {
                  return (
                    <li className="nav-item" key={i}>
                      <button
                        className="nav-link font-B"
                        value={v}
                        // checked={lessonCategoryFilter === v}
                        onClick={(e) => {
                          setLessonCategoryFilter(e.target.value)
                        }}
                      >
                        {v}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </nav>

        <div className="container L-categories-btn">
          <div className="row">
            <div className="row row-cols-md-3 g-0">
              {filterByCategory(lessonData, lessonCategoryFilter).map(
                (v, i) => {
                  let imgarr = v.lesson_img.split(',')
                  return (
                    <div className="col" key={v.sid}>
                      <div className="card m-2 L-card-shadow">
                        <img
                          src={`${HOST}/images/lesson/${imgarr[0]}`}
                          className="L-title-img-wrap"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title font-B f-DarkGreen f-32">
                            {v.lesson_name}
                          </h5>
                          <div>
                            <p
                              className="card-text font-R f-Gray"
                              dangerouslySetInnerHTML={{
                                __html: v.lesson_info1,
                              }}
                            ></p>
                            <span className="d-flex justify-content-end mb-3 font-R f-Gray">
                              課程時數: {v.lesson_hours}小時
                            </span>
                          </div>
                          <div className="d-flex justify-content-center align-items-center mb-3">
                            <div className="L-img-wrap">
                              <img
                                src={`${HOST}/images/lesson/${v.teacher_img}`}
                                alt=""
                              />
                            </div>
                            <div className="d-flex flex-column font-R f-Gray">
                              <span>課程老師: {v.name}</span>
                              <span>小農遊專業: {v.slogan}</span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mb-3 font-R f-Gray">
                            <div className="d-flex justify-content-center">
                              <span>評價: </span>
                              {/* {[...Array(v.comment_value)].map((v, i) => {
                                return <Icon.Star key={i} />
                              })} */}
                              <Icon.Star />
                              <Icon.Star />
                              <Icon.Star />
                              <Icon.Star />
                              <Icon.Star />
                            </div>
                            <span>報名人數上限:{v.lesson_uplimit}</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center font-M f-Brown">
                            <span>費用: ${v.lesson_price}元</span>
                            <Link
                              className="btn btn-primary font-B"
                              to={`/lesson/${v.sid}`}
                            >
                              看更多!
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="L-activitycolor pb-3">
        <div className="container mb-2">
          <div className="d-flex justify-content-center align-items-center p-5">
            <img className="L-section2-img" src="/Icons/farm.svg" alt="" />
            <h1 className="font-B f-Yellow">小農</h1>
            <h1 className="font-B f-LightGreen">活動預告</h1>
            <img className="L-section2-img" src="/Icons/farm2.svg" alt="" />
          </div>
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="row mb-5 align-items-center justify-content-center">
              <div className="L-box text-center me-2">
                <p className="font-B f-Brown f-24 m-0 mt-3">4月份</p>
                <p className="font-B f-Brown">每周一三五</p>
              </div>
              <div className="card L-categories-style L-card-shadow pb-2">
                <div className="row g-0 L-categories-img">
                  <div className="col-md-4 L-ImgStyle">
                    <div className="L-ImgStyle2">
                      <img
                        src="/Images/Frame_figma.png"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title text-center L-categories-title-bg">
                        <span className="font-B f-White f-32">農耕體驗</span>
                      </div>
                      <p className="card-text font-R">
                        休閒農業若沒有親身體驗，無法一窺其豐富美麗的內涵，因此活動導入對休閒農業而言，是相當重要的一環。農業資源具有生活、生產以及生態等特色。園區內種植了多樣的花卉與香草植物，不僅美化了環境，更多了植物的芳香。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5 align-items-center justify-content-center">
              <div className="L-box text-center m-2">
                <p className="font-B f-Brown f-24 m-0 mt-3">4月份</p>
                <p className="font-B f-Brown">每周二四</p>
              </div>
              <div className="card L-categories-style L-card-shadow pb-3">
                <div className="row g-0 L-categories-img">
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title text-center L-categories-title-bg">
                        <span className="font-B f-White f-32">採收體驗</span>
                      </div>
                      <p className="card-text font-R">
                        台灣有著「水果王國」美稱，擁有超多品種的水果，不僅深受國人喜愛，外國人也超愛，香甜美味又多汁，脆的、軟的、甜的、酸的應有盡有，滿足我們豐富的味蕾。這篇要來推薦全台灣的觀光果園，讓你體驗當一日農夫，自己的果自己採。
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 L-ImgStyle">
                    <div className="L-ImgStyle2">
                      <img
                        src="/Images/harvest_figma2.png"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5 align-items-center justify-content-center">
              <div className="L-box text-center m-2">
                <p className="font-B f-Brown f-24 m-0 mt-3">4月份</p>
                <p className="font-B f-Brown">每周六日</p>
              </div>
              <div className="card L-categories-style L-card-shadow pb-3">
                <div className="row g-0 L-categories-img">
                  <div className="col-md-4 L-ImgStyle">
                    <div className="L-ImgStyle2">
                      <img
                        src="/Images/made_figma2.png"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title text-center L-categories-title-bg">
                        <span className="font-B f-White f-32">親子體驗</span>
                      </div>
                      <p className="card-text font-R">
                        歡迎來到我們的農場！在這裡，您和您的孩子可以體驗真正的農村生活。我們的農場有各種各樣的動物和植物，可以讓您和您的孩子學習和體驗許多不同的農業活動。還可以讓他們學習到關於農業的知識和技巧。請帶著您的家人來參加我們的活動，讓您的孩子瞭解到農村的生活和農業的重要性！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="L-box text-center m-2">
                <p className="font-B f-Brown f-24 m-0 mt-3">4月份</p>
                <p className="font-B f-Brown">每周六日</p>
              </div>
              <div className="card L-categories-style L-card-shadow pb-3">
                <div className="row g-0 L-categories-img">
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title text-center L-categories-title-bg">
                        <span className="font-B f-White f-32">生態學堂</span>
                      </div>
                      <p className="card-text font-R">
                        生態學堂是一個專門為學生和家庭提供生態學習體驗的場所。我們的生態學堂位於自然風景優美的地方，環境優美、資源豐富，是學生學習生態學的絕佳場所。包括生態解說、生態課程和實地考察等。通過這些活動，學生可以學習到各種關於生態學的知識和技能。
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 L-ImgStyle">
                    <div className="L-ImgStyle2">
                      <img
                        src="/Images/bug_figma2.png"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Lesson
