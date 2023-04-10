import { useState, useEffect } from 'react'
import MemberRight from './MemberRight'
import MyCommentLeft from './MyCommentLeft'

import axios from 'axios'

function MyComment() {
  return (
    <>
      <div className="m-session container-fluid mt-3">
        {/* <!-- 會員頁面版面 --> */}
        <div className="container-xl">
          <div className="grid-main">
            {/* <!-- 卡片左半 --> */}
            <div className="g-left m-left-side d-flex flex-column justify-content-start align-items-center ">
              <MyCommentLeft />
            </div>

            {/* <!-- 卡片右半 --> */}
            <div className="g-right m-right-side d-flex flex-row">
              <MemberRight />
            </div>
          </div>
          {/* <!-- 會員頁面版結束 --> */}
        </div>
      </div>
    </>
  )
}

export default MyComment
