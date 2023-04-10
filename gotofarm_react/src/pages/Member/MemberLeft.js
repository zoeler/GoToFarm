import React from 'react'
import WeekCalendar from '../../components/WeekCalender'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function MemberLeft() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [isLoading])

  const loader = (
    <div>
      <div>ISLODING</div>
    </div>
  )

  return (
    <>
      <div className="M-title f-24 f-B f-LightGreen">
        <span>哈囉！小農</span>
      </div>
      <div className="M-record d-flex flex-row">
        <a href="/#" className="col-12 col-md-4 d-flex justify-content-center">
          <div className="M-member-btn">
            <div className="M-circle">
              <img src="./Icons/m-articale.png" alt="m-articale.png" />
            </div>
            <span className="M-btn-p fw-bold">我的文章</span>
          </div>
        </a>
        <Link
          to="/MyMember/MyComment"
          className="col-12 col-md-4 d-flex justify-content-center"
        >
          <div className="M-member-btn">
            <div className="M-circle">
              <img src="./Icons/m-command.png" alt="m-command.png" />
            </div>
            <span className="M-btn-p fw-bold">我的評論</span>
          </div>
        </Link>
        <Link
          to="/MyMember/MyBookmark"
          className="col-12 col-md-4 d-flex justify-content-center"
        >
          <div className="M-member-btn">
            <div className="M-circle">
              <img src="./Icons/m-bookmarks.png" alt="m-bookmarks.png" />
            </div>
            <span className="M-btn-p fw-bold">我的收藏</span>
          </div>
        </Link>
      </div>
      <div className="d-flex align-items-center M-subtitle">
        <span className="f-Khaki">會員記錄</span>
        <div className="M-hr"></div>
      </div>
      <div className="M-record d-flex flex-row">
        <Link to="/MyMember/MyOrder" className="col-12 col-md-4">
          <div className="M-member-btn2 d-flex justify-content-center align-items-center">
            <div className="M-circle">
              <img src="./Icons/m-orderdetals.png" alt="m-orderdetals.png" />
            </div>
            <span>
              <p className="M-btn-p fw-bold">
                我的
                <br />
                消費記錄
              </p>
            </span>
          </div>
        </Link>
        <Link to="/MyMember/MyCoupon" className="col-12 col-md-4">
          <div className="M-member-btn2 d-flex justify-content-center align-items-center">
            <div className="M-circle">
              <img src="./Icons/m-cuppon.png" alt="m-cuppon.png" />
            </div>
            <span>
              <p className="M-btn-p fw-bold">
                我的
                <br />
                優惠券
              </p>
            </span>
          </div>
        </Link>
        <div
          className="col-12 col-md-4"
          onClick={() => {
            navigate('/MyMember/MyAwards')
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="M-member-btn2 d-flex justify-content-center align-items-center">
            <div className="M-circle">
              <img src="./Icons/m-awards.png" alt="m-awards.png" />
            </div>
            <span>
              <p className="M-btn-p fw-bold">
                我的
                <br />
                會員成就
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center M-subtitle">
        <span className="f-Khaki">我的課程日歷</span>
        <div className="M-hr"></div>
      </div>
      <WeekCalendar></WeekCalendar>
    </>
  )
}

export default MemberLeft
