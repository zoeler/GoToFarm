import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LOGIN, HOST } from '../../components/api_config'
import AuthContext from '../../contexts/AuthContext'
import Countdown from '../../components/Countdown'
import '../../css/login-mobile.css'
import '../../css/login-swiper.css'
import '../../css/logon-main.css'
import '../../css/main.css'

function RegisterComfirm() {
  const [myForm, setMyForm] = useState({
    account: '',
    password: '',
  })
  const { setMyAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [shownPassword, setHidePassword] = useState(false)
  const { myAuth, logout } = useContext(AuthContext)

  if (myAuth.authorized) {
    if (myAuth.member_state_sid === 2) {
      return (
        <div className="login-main-full col-12 d-flex  justify-content-center m-session  mt-3 ">
          <div className="log-join-card2 login-hiddend-card col-5  ">
            <div className="swiper-wrapper ">
              <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
                <div className="mt-4 w-75">
                  <div className="input-group-1 d-flex flex-column  justify-content-center h-100  ms-4">
                    <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
                      成功登入小農大家庭！
                    </span>
                    <div className="w-100 d-flex justify-content-center">
                      <img
                        id="ava_output"
                        class=" ava_output_my border w-25 d-flex justify-content-center align-items-center"
                        src={`${HOST}/images/avatar/${myAuth.member_img}`}
                        name="ava_value"
                        alt="..."
                      ></img>
                    </div>
                    <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
                      哈囉！ {myAuth.member_nickname} 很高興見到您
                    </span>
                    <div className="login-input-contain w-100">
                      <div id="123" className="login-span">
                        頁面將在<Countdown></Countdown>秒後自動跳轉到首頁
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="login-main-full col-12 d-flex  justify-content-center m-session  mt-3 ">
          <div className="log-join-card2 login-hiddend-card col-5  ">
            <div className="swiper-wrapper ">
              <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
                <div className="mt-4 w-75">
                  <div className="input-group-1 d-flex flex-column  justify-content-center h-100 ms-4">
                    <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
                      成功登入小農大家庭！
                    </span>
                    <div className="w-100 d-flex justify-content-center">
                      <img
                        id="ava_output"
                        class=" ava_output_my border w-25 d-flex justify-content-center align-items-center"
                        src={`${HOST}/images/avatar/${myAuth.member_img}`}
                        name="ava_value"
                        alt="..."
                      ></img>
                    </div>
                    <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
                      哈囉！新小農 {myAuth.member_nickname} 您好！
                    </span>
                    <div className="login-input-contain w-100">
                      <div id="123" className="login-span">
                        頁面將在<Countdown></Countdown>秒後自動跳轉到首頁
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className="login-main-full col-12 d-flex  justify-content-center m-session  mt-3 ">
        <div className="log-join-card2 login-hiddend-card col-5  ">
          <div className="swiper-wrapper ">
            <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
              <div className="mt-4 w-75">
                <div className="input-group-1 d-flex flex-column  justify-content-center h-100 mt-5 ms-4">
                  <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
                    您已經成功登出囉！
                  </span>
                  <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
                    感謝使用小農遊服務
                  </span>
                  <div className="login-input-contain w-100">
                    <div id="123" className="login-span">
                      頁面將在<Countdown></Countdown>秒後自動跳轉到首頁
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //   if (myAuth.authorized {
  //     if (myAuth.member_state_sid == 1)){
  //       return (
  //         <div className="login-main-full col-12 d-flex  justify-content-center m-session  mt-3 ">
  //           <div className="log-join-card2 login-hiddend-card col-5  ">
  //             <div className="swiper-wrapper ">
  //               <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
  //                 <div className="mt-4 w-75">
  //                   <div className="input-group-1 d-flex flex-column  justify-content-center h-100 mt-5 ms-4">
  //                     <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
  //                       成功登入小農大家庭！
  //                     </span>
  //                     <div className='w-100 d-flex justify-content-center'>
  //                       <img
  //                         id="ava_output"
  //                         class=" border w-25 d-flex justify-content-center align-items-center"
  //                         src={`${HOST}/images/avatar/${myAuth.member_img}`}
  //                         name="ava_value"
  //                       ></img>
  //                     </div>
  //                     <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
  //                       哈囉！ {myAuth.member_nickname} 很高興見到您
  //                     </span>
  //                     <div className="login-input-contain w-100">
  //                       <div id="123" className='login-span'>
  //                         頁面將在<Countdown></Countdown>秒後自動跳轉到首頁
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )
  //     }else{
  //       return (
  //         <div className="login-main-full col-12 d-flex  justify-content-center m-session  mt-3 ">
  //           <div className="log-join-card2 login-hiddend-card col-5  ">
  //             <div className="swiper-wrapper ">
  //               <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
  //                 <div className="mt-4 w-75">
  //                   <div className="input-group-1 d-flex flex-column  justify-content-center h-100 mt-5 ms-4">
  //                     <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
  //                       成功登入小農大家庭！
  //                     </span>
  //                     <div className='w-100 d-flex justify-content-center'>
  //                       <img
  //                         id="ava_output"
  //                         class=" border w-25 d-flex justify-content-center align-items-center"
  //                         src={`${HOST}/images/avatar/${myAuth.member_img}`}
  //                         name="ava_value"
  //                       ></img>
  //                     </div>
  //                     <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
  //                       哈囉！ {myAuth.member_nickname} 很高興見到您
  //                     </span>
  //                     <div className="login-input-contain w-100">
  //                       <div id="123" className='login-span'>
  //                         頁面將在<Countdown></Countdown>秒後自動跳轉到首頁
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //     )} else {
  //     return (
  //       <div className="login-main-full col-12 d-flex  justify-content-center m-session  mt-3 ">
  //         <div className="log-join-card2 login-hiddend-card col-5  ">
  //           <div className="swiper-wrapper ">
  //             <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
  //               <div className="mt-4 w-75">
  //                 <div className="input-group-1 d-flex flex-column  justify-content-center h-100 mt-5 ms-4">
  //                   <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
  //                     您已經成功登出囉！
  //                   </span>
  //                   <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
  //                     感謝使用小農遊服務
  //                   </span>
  //                   <div className="login-input-contain w-100">
  //                     <div id="123" className='login-span'>
  //                       頁面將在<Countdown></Countdown>秒後自動跳轉到首頁
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }
  // }
}

export default RegisterComfirm
