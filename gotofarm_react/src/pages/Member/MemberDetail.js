import React from 'react'
import MemberRight from './MemberRight'
// import MemberLeft from './MemberLeft'
import { Outlet } from 'react-router-dom'
import '../../css/myorder.css'
import '../../css/main.css'

function MemberDetail() {
  return (
    <>
      <div className="M-session container-fluid">
        {/* <!-- 會員頁面版面 --> */}
        <div className="container">
          <div className="row">
            <div className="grid-main">
              {/* <!-- 卡片左半 --> */}
              <div className="g-left M-left-side d-flex flex-column justify-content-start align-items-center">
                <Outlet />
                {/* <MemberLeft></MemberLeft> */}
              </div>

              {/* <!-- 卡片右半 --> */}
              <div className="g-right M-right-side d-flex flex-row">
                <MemberRight></MemberRight>
              </div>
            </div>
            {/* <!-- 會員頁面版結束 --> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberDetail
