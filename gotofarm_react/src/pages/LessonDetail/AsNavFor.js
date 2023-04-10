import React, { useState, useRef, useEffect } from 'react'
import { LESSON_DETAIL_DATA, HOST } from '../../components/api_config'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import axios from 'axios'
import '../../css/carousel.css'

function AsNavFor() {
  //資料
  const [data, setData] = useState({
    rows: [],
    teachers: [],
    comments: [],
  })
  let imgarr = []
  if (data.rows && data.rows.length) {
    imgarr = data.rows[0].lesson_img.split(',')
  }

  const { sid } = useParams()

  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const slider1Ref = useRef(null)
  const slider2Ref = useRef(null)

  const getListData = async () => {
    const res = await axios.get(`${LESSON_DETAIL_DATA}/${sid}`)
    // console.log(res)
    setData(res.data)
  }

  useEffect(() => {
    setNav1(slider1Ref.current)
    setNav2(slider2Ref.current)
  }, [])
  useEffect(() => {
    getListData(sid).then(() => {
      /*
      setTimeout(() => {
        window.scrollTo({
          top: 0,
        })
      }, 500)
     */
      // document.documentElement.scrollTop = 0
    })
  }, [sid])

  return (
    <>
      <div className="col-md-5 p-3">
        <Slider asNavFor={nav2} ref={slider1Ref}>
          <div className="align-items-md-stretch">
            <div className="L-c-test">
              <img
                src={`${HOST}/images/lesson/${imgarr[0]}`}
                className="d-block rounded-3"
                alt="..."
              />
            </div>
          </div>
          <div className="align-items-md-stretch">
            <div className="L-c-test">
              <img
                src={`${HOST}/images/lesson/${imgarr[1]}`}
                className="d-block rounded-3"
                alt="..."
              />
            </div>
          </div>
          <div className="align-items-md-stretch">
            <div className="L-c-test">
              <img
                src={`${HOST}/images/lesson/${imgarr[2]}`}
                className="d-block rounded-3"
                alt="..."
              />
            </div>
          </div>
          <div className="align-items-md-stretch">
            <div className="L-c-test">
              <img
                src={`${HOST}/images/lesson/${imgarr[3]}`}
                className="d-block rounded-3"
                alt="..."
              />
            </div>
          </div>
        </Slider>
        <br />
        <Slider
          asNavFor={nav1}
          ref={slider2Ref}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div className="L-c-test2">
            <img
              src={`${HOST}/images/lesson/${imgarr[0]}`}
              alt=""
              className="rounded-3 pe-1"
            />
          </div>
          <div className="L-c-test2">
            <img
              src={`${HOST}/images/lesson/${imgarr[1]}`}
              alt=""
              className="rounded-3 pe-1"
            />
          </div>
          <div className="L-c-test2">
            <img
              src={`${HOST}/images/lesson/${imgarr[2]}`}
              alt=""
              className="rounded-3 pe-1"
            />
          </div>
          <div className="L-c-test2">
            <img
              src={`${HOST}/images/lesson/${imgarr[3]}`}
              alt=""
              className="rounded-3 pe-1"
            />
          </div>
        </Slider>
      </div>
    </>
  )
}

export default AsNavFor
