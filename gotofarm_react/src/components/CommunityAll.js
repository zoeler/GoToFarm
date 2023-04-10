import React, { useEffect } from 'react'
import { HOST } from '../../components/api_config'
import { LOGIN } from '../../components/api_config'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from "dayjs";
import AuthContext from '../../contexts/AuthContext'

//引入樣式
import '../../css/members.css'
import '../../css/community.css'

function CommunityAll() {
  const [myForm, setMyForm] = useState({
    account: '',
    password: '',
  })
  const { setMyAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([]) //要保持此狀態一直是陣列！
  const [shownPassword, setHidePassword] = useState(false)
  const { myAuth, logout } = useContext(AuthContext)

  const names = ['Alice', 'Bob', 'Charlie', 'David'];

  const [cmmData, setCmmData] = useState({ totalRows: 0, CMA: [] });

  useEffect(() => {
    // 在component mount時從API獲取數據
    async function fetchData() {
      const response = await fetch('http://localhost:3033/community/api');
      const data = await response.json();
      setCmmData(data);
    }
    fetchData();
  }, []);



  
  return (
    <div className='cm-artical-session d-flex justify-content-center align-items-start  col-12 h-100 mt-5 gap-4'>
      {communityA.map((communityA) => {
        return (
          <div key={communityA.sid} className='cm-artical-card mt-1'>
            <div className='cm-artical-innerimg' >
              <img src={`${HOST}/images/community/1.jpg`}></img>
            </div>
            <div className='cm-member-info w-100 d-flex align-items-end ms-3'>
              <div className='cm-member-ava'>
                <img src='/images/teacher04.png'></img>
              </div>
              <div className='d-flex flex-column ms-2 '>
                <div className='cm-member-detail'>
                  <span className='fs-6'>BY {communityA.member_name}</span>
                  <span className='fs-6'> 發表於:{dayjs(communityA.member_publish_date).format("YYYY-MM-DD")}</span>
                </div>
              </div>
            </div>

            {/* 點讚區 */}

            <div className='d-flex justify-content-around cm-like-area'>
              <div className='cm-like-comments w-50 m-4 d-flex gap-3'>
                <div className='d-flex gap-2 align-items-center'>
                  <img src='/icons/like.png'></img>
                  <div className='cm-like-span text-success fs-6'>(23)</div>
                </div>

                <div className='d-flex gap-2 align-items-center'>
                  <img src='/icons/comment.png'></img>
                  <div className='cm-like-span  fs-6'>(20)</div>
                </div>
              </div>


              <div className='cm-like-comments w-50 m-4 d-flex align-items-center justify-content-end gap-3'>
                <div className='d-flex gap-2 align-items-center'>
                  <img src='/icons/instagram.png'></img>
                </div>

                <div className='d-flex gap-2 align-items-center'>
                  <img src='/icons/facebook.png'></img>
                </div>
              </div>
            </div>

            {/* 文章 */}
            <div className='cm-arti-show d-flex justify-content-around w-100 h-100 bg-white'>
              <div className='cm-artical-contain-area w-100 h-100 bg-white d-flex'>
                <div className='cm-artical ms-5 me-5 mt-4 w-100'>
                  <h3>{r.community_header}</h3>
                  <span className='fs-6'>{r.community_contain}</span>
                  <span className='fs-5 text-warning'>....[點我看更多]</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
      )}
    </div>
  )
}

export default CommunityAll
