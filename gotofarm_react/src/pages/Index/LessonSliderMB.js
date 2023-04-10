import React, { useEffect, useState } from 'react'
import { LESSON_DATA, HOST } from '../../components/api_config'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import '../../css/index.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwiper } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'
function LessonSliderMB() {
  const [imageIndex, setImageIndex] = useState(0)
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (current, next) => {
      console.log({ current, next, imageIndex })
      if (next == -2) {
        setImageIndex(1)
      } else {
        setImageIndex(next)
      }
    },
  }

  const [lessonData, setLessonData] = useState([])
  const [optionClick, setOptionClick] = useState('農耕')
  const [lessonDataF, setLessonDataF] = useState([])

  // const [lessonIndex, setLessonIndex] = useState(0)
  //課程篩選
  const lessonOptions = ['農耕', '採收', '親子', '生態']
  const [lessonCategoryFilter, setLessonCategoryFilter] = useState('農耕')
  const [leftbtn, setLeftbtn] = useState(0)
  const getLessonData = async () => {
    const res = await axios.get('http://localhost:3033/lesson/lessonList')
    // console.log(res)
    setLessonData(res.data)
  }

  //純函式-傳入資料陣列,以lessonCategory進行過濾=>回傳過濾後的資料陣列
  const filterByCategory = (lessonData, lessonCategoryFilter) => {
    switch (lessonCategoryFilter) {
      case '生態':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 4
        })

      case '親子':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 3
        })
      case '採收':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 2
        })
      case '農耕':
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 1
        })
      default:
        return lessonData.filter((v, i) => {
          return v.lesson_category_sid === 1 && v.lesson_img === 1
        })
    }
  }

  function lessonInfoData() {
    setTimeout(() => {
      const info2 = document.querySelectorAll('.lesson_info2')
      console.log({ info2 })
      const lesson_id = document
        .querySelector('.slick-active img.class-list2')
        ?.getAttribute('data-lid')
      console.log({ lesson_id })
      // console.log(document.querySelector('.slick-active').querySelector('img').getAttribute('data-lid'))
      info2.forEach((div) => {
        if (div.getAttribute('data-lid') === lesson_id) {
          div.style.display = 'block'
        } else {
          div.style.display = 'none'
        }
      })
    }, 500)
  }

  useEffect(() => {
    getLessonData()
    lessonInfoData()
  }, [lessonCategoryFilter])

  // useEffect(() => {

  // }, [])

  const swiper = useSwiper()

  return (
    <>
      <div className="">
        <img
          src="./svg/titleRice.png"
          width="172px"
          className="a-newfarmer-tit d-none d-lg-block"
          alt=""
        />
        <br />
        <div className="">
          <img src="./svg/newfarmer.png" className="a-newfarmer-tit" alt="" />
        </div>
      </div>
      <div className="d-flex a-lesson-btn">
        {lessonOptions.map((v, i) => {
          return (
            <button
              className={
                leftbtn === i
                  ? 'a-lesson-type font-B f-16 f-Gray sp-2 me-1 text-center a-lesson-type-seleted'
                  : 'a-lesson-type font-B f-16 f-Gray sp-2 me-1 text-center'
              }
              key={i}
              onClick={() => {
                setOptionClick(v)
                setLessonCategoryFilter(v)
                setLessonDataF(
                  filterByCategory(lessonData, lessonCategoryFilter)
                )
                setLeftbtn(i)
              }}
            >
              {v}
            </button>
          )
        })}
      </div>
      <div className="a-lesson-btn-right">
        <img
          src="./Buttons/slide-dragMB.png"
          alt=""
          className="position-absolute ps-3"
        />
      </div>
      <Slider
        {...settings}
        onSwipe={(e) => {
          lessonInfoData()
        }}
      >
        {filterByCategory(lessonData, lessonCategoryFilter).map((v, i) => {
          let imgarr = v.lesson_img.split(',')
          return (
            <div
              className={
                i === imageIndex
                  ? 'a-lesson-slide aaa'
                  : 'a-lesson-slide a-lesson-activeSlide'
              }
            >
              <div className="a-slide-drag-main">
                <img
                  className="class-list2"
                  data-lid={v.lesson_id}
                  src={`${HOST}/images/lesson/${imgarr[0]}`}
                  alt={v.lesson_img}
                />
              </div>
            </div>
          )
        })}
      </Slider>
      {filterByCategory(lessonData, lessonCategoryFilter).map((v, i) => {
        return (
          <div
            className="lesson_info2"
            data-lid={v.lesson_id}
            style={{ display: 'none' }}
          >
            <p className="font-B f-24 f-Brown sp-2 mt-4 d-none d-lg-block">
              {v.lesson_name}
            </p>
            <p className="font-B f-20 f-Yellow sp-2 d-none d-lg-block">
              {v.lesson_date}{' '}
            </p>

            <p className="font-R f-20 f-Brown sp-2 a-lesson-paragraph flex-wrap">
              {v.lesson_info2}
            </p>
            <Link
              to={`/lesson/${v.sid}`}
              className="container buttonY font-B f-20 f-Brown sp-1 pt-2 text-center me-sm-0 me-lg-5 m-sm-0 mt-4 mt-lg-0"
            >
              我想瞭解更多
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default LessonSliderMB
