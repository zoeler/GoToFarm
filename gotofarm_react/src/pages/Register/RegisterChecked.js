import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LOGIN, HOST } from '../../components/api_config'
import AuthContext from '../../contexts/AuthContext'
import Countdown from '../../components/Countdown'
import '../../css/login-mobile.css'
import '../../css/login-swiper.css'
import '../../css/logon-main.css'
import '../../css/main.css'
import CountdowntoLogin from '../../components/CountdowntoLogin'

function RegisterChecked() {
  const [myForm, setMyForm] = useState({
    account: '',
    password: '',
  })
  const { setMyAuth } = useContext(AuthContext)
  const { myAuth, logout } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1800)
    }
  })
  
  const loader = (
    <img
      id="ava_output"
      class=" ava_output_my border w-25 d-flex justify-content-center align-items-center"
      src="../../../svg/check_OK.gif"
      name="ava_value"
      alt="..."
    ></img>
  )

      return (
        <div className="login-main-full col-12 d-flex  justify-content-center m-session"
          style={{ marginTop: '-180px', paddingTop: '140px' }}
        >
          <div className="log-join-card2 login-hiddend-card col-5  ">
            <div className="swiper-wrapper ">
              <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
                <div className="mt-4 w-75">
                  <div className="input-group-1 d-flex flex-column  justify-content-center h-100  ms-4">
                    <span className="login-span join-manin-head fs-2 mb-4 mt-5 login-effect ">
                    註冊成功！！
                    </span>
                    <span className="login-span join-manin-head fs-2 login-effect">
                      感謝您成為小農大家庭的一份子
                    </span>
                    <span className="login-span text-warning mb-5 login-effect">重新登入即可使用小農遊所有貼心服務喔！</span>
                    <div className="w-100 d-flex justify-content-center ">
                      
                      {isLoading == true ? loader :
                        <img
                        id="ava_output"
                        class=" ava_output_my border w-25 d-flex justify-content-center align-items-center"
                        src="../../../svg/check_OK.png"
                        name="ava_value"
                        alt="..."
                        ></img>
                      }
                    </div>
                    <div className="login-input-contain w-100 mt-3 login-effect">
                      <div id="123" className="login-span">
                        頁面將在
                        <CountdowntoLogin></CountdowntoLogin>
                        秒後自動跳轉到登入頁面
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

export default RegisterChecked
