import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { HOST } from '../../components/api_config'
import { LOGIN } from '../../components/api_config'
import AuthContext from '../../contexts/AuthContext'

function AddArtical() {
  const [myForm, setMyForm] = useState({
    account: '',
    password: '',
  })
  const { setMyAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [shownPassword, setHidePassword] = useState(false)
  const { myAuth, logout } = useContext(AuthContext)

  return (
    <div className='m-session d-flex justify-content-center pb-5'>
      {/* 功能列 */}
      <div className='cm-container d-flex flex-column  col-10 mt-2'>
        <div className='w-100 d-flex justify-content-between'>
          <div className='cm-select-bar d-flex justify-align-content-between align-items-center gap-2 mt-3 ms-2 me-2 text-center '>
            <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
              <p className='cm-pbt'>發表新文章</p>
            </div>
            <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
              <p className='cm-pbt'>我的文章</p>
            </div>
          </div>
          <div className='cm-select-bar  d-flex justify-align-content-between align-items-center gap-2 mt-3 ms-2 me-2 text-center '>
            <div className='cm-select-bar-btn  d-flex justify-content-center align-items-center'>
              <p>文章排列方式:</p>
            </div>
            <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
              <p className='cm-pbt'>發文時間</p>
            </div>
            <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
              <p className='cm-pbt'>熱門迴響</p>
            </div>
          </div>
        </div>
        {/* 功能列 結束*/}

        {/* 文章卡片區域 */}
        {/* 擺放卡片位置的地方vvvv */}
        <div className='cm-artical-session d-flex flex-column justify-content-center align-items-center col-12 mt-5'>

          {/* 可以用迴圈生出來的卡片vvv */}
          <div className='cm-artical-card2 position-relative mt-1'>
            <div className='w-100'>
              <div className='cm-img-area d-flex justify-content-center align-items-center'>
              <div className='cm-artical-innerimg-add d-flex justify-content-center align-items-center' >
                  <img className='cn-addp' src='http://localhost:3000/Icons/add.png'></img>
                </div>
              </div>
              <div className='cm-member-info w-100 d-flex align-items-end ms-3'>
              </div>
            </div>


            {/* 文章 */}
            <div className='cm-arti-show d-flex justify-content-around w-100 bg-white'>
              <div className='cm-artical-contain-area2 w-100 bg-white d-flex'>
                <div className='cm-artical ms-5 me-5 mt-4 w-100'>
                  <div className='cm-headder-input ps-4 pt-2 pe-2'>
                    <h4>點此輸入文章標題</h4>
                  </div>
                  <div className='cm-headder-input cm-comment-area ps-4 pt-2 pe-2'>
                    <span>輸入文章內容(最多可輸入300字)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-100 mt-2 d-flex w-100 justify-content-center align-items-center gap-3'>
              <div className='cm-summit-area'>
                <img src='http://localhost:3000/Buttons/addA.png'></img>
              </div>
              <a href='/Community'>
              <div className='cm-summit-area'>
               <img src='http://localhost:3000/Buttons/cancelA.png'></img>
                </div>
              </a>
            </div>
          </div>
      
          
          
        </div>
        <a className='cm-card-close position-absolute' href='/communicate'>
          <img src='http://localhost:3000/Icons/close.png'></img>
        </a>
        {/* 文章卡片區域 */}
      </div>
    </div>



  )
}

export default AddArtical