import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Navigate } from 'react-router-dom'
import { HOST } from '../../components/api_config'
import avaUploader from '../../components/avaUploader'
import axios from 'axios'

//引入日期選擇組件
import DateSelector from '../../components/DateSelector'

//引入滑動卡片組件
import { Navigation, Pagination, Scrollbar, A11y, HashNavigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

//引入樣式
import 'swiper/css'
import 'swiper/css/pagination'
import '../../css/login-mobile.css'
import '../../css/login-swiper.css'
import '../../css/logon-main.css'
import '../../css/members.css'
import '../../css/main.css'
import '../../css/register-mobile.css'

function GoogleRegister() {
  //------圖片上傳功能------
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const changeHandler = (e) => {
    const file = e.target.files[0]

    if (file) {
      setIsFilePicked(true)
      setSelectedFile(file)
      setImgServerUrl('')
    } else {
      setIsFilePicked(false)
      setSelectedFile(null)
      setImgServerUrl('')
    }
  }

  useEffect(() => {
    setIsLoading(true)
  }, [GoogleLogout])

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, Math.random() + 6000)
    }
  }, [isLoading])

  const loader = (
    <div className="lds-ripple">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  // const handleSubmit = (e) => {
  //     const formData = new FormData()
  //     formData.append('file', e.target.files[0])
  //     console.log(e.target.files[0])
  //     axios
  //         .post(`${HOST}/img/upload`, formData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //             },
  //         })
  //         .then((response) => {
  //             console.log(response.data)

  //             setPreview(`${HOST}/images/avatar/${response.data}`)

  //             setFields((old) => ({ ...old, ava: response.data }))

  //         })
  //         .catch((error) => {
  //             console.error(error)
  //         })
  // }

  const [fields, setFields] = useState({
    member_name: '',
    member_nickname: '',
    member_email: '',
    password: '',
    matchPassword: '',
    city: '',
    district: '',
    zipcode: '',
    fulladdress: '',
    member_mobile: '',
    ava: '',
    inputText: '',
    keyword: '',
  })

  // const { confirmPassword, ...registerFields } = fields

  const handleFieldsChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }

  //定義表單驗證模式(不為空值且格式正確)
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  const mobileRule = /^09\d{2}-?\d{3}-?\d{3}$/
  const isEmailFormat = (value) => emailRule.test(value)
  const isMobileFormat = (value) => mobileRule.test(value)
  // const isaddressRuleFormat = (value) => addressRule.test(value);
  const [shownPassword, setHidePassword] = useState(false)

  //表單送出
  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('測試')

    const res = await axios.post(
      'http://localhost:3033/register/Googleadd',
      fields,
      profile
    )

    setTimeout("location.href='/'", 1000)
  }

  const [profile, setProfile] = useState([])
  const clientId =   ''
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }
    gapi.load('client:auth2', initClient)
  })

  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log(profile)
  }

  const onFailure = (err) => {
    console.log('failed', err)
  }

  const logOut = () => {
    setProfile(null)
  }

  return (
    <form onSubmit={handleRegister}>
      <>
        <div className="m-session ms w-100 d-flex justify-content-center">
          <Swiper
            cssMode={true}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}
            className="swiper-pagination google-session"
          >
            <SwiperSlide>text-page</SwiperSlide>
            <SwiperSlide></SwiperSlide>
            <SwiperSlide>
              <div>
                <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5">
                  <div className="w-100 login-input-contain mb-5 mt-5">
                    <span class="join-manin-head fs-2">
                      歡迎使用小農遊 Google註冊服務
                    </span>
                  </div>

                  <div className="mb-1">
                    <div className="w-100 d-flex justify-content-center align-items-center gap-5">
                      <img
                        className="google-logo-size"
                        src="../../../icons/Google-circle-logo.png"
                      ></img>
                      <img
                        className="google-logo-size2 animate__rubberBand"
                        src="../../../textures/google-connect.png"
                      ></img>
                      <img
                        className="google-logo-size gotofarm-logo-effect bg-white"
                        src="../../../Icons/gotofarm-logo-big.png"
                      ></img>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="google-connect-span w-100 d-flex flex-column justify-content-center align-items-center gap-1">
                      <span>
                        小農遊將會取得您的"個人姓名"、"電子郵件地址"及"個人大頭貼"等
                      </span>
                      <span>
                        資訊作為建立小農帳戶所需的基本資料來源，基於用戶個資保護原則，
                      </span>
                      <span>
                        本站取得您的個人資料僅會用於站內使用，不會用於站外營利行為喔！
                      </span>
                    </div>
                  </div>
                </div>

                <div class=" btn-area d-flex justify-content-center position-relative m-5 gap-5">
                  <a href="/login">
                    <div className="google-login-button-aria2 google-declind mt-5">
                      <span>
                        <a href="/login">返回登入頁面</a>
                      </span>
                    </div>
                  </a>
                  <div className="google-login-button-aria2 mt-5 swiper-button-next">
                    {profile ? (
                      <GoogleLogout
                        clientId={clientId}
                        buttonText="我同意隱私權政策"
                        onLogoutSuccess={logOut}
                      />
                    ) : (
                      <div className="google-login-button-aria2 google-declind swiper-button-next">
                        <span className="swiper-button-next">
                          <a>
                            {isLoading ? (
                              loader
                            ) : (
                              <span className="swiper-button-next">
                                下一步(1/3)
                              </span>
                            )}
                          </a>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mt-3">
                <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5">
                  <div className="w-100 login-input-contain mb-5 mt-5">
                    <span class="join-manin-head fs-2">
                      歡迎使用小農遊 Google註冊服務
                    </span>
                  </div>

                  <div className="mb-1">
                    <div className="w-100 d-flex justify-content-center align-items-center gap-5">
                      <div className="google-logo-size ">
                        <div className="google-inner-user">
                          {profile ? (
                            <img
                              className="google-inner-user"
                              src={profile.imageUrl}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <img
                        className="google-logo-size2 animate__rubberBand"
                        src="../../../textures/google-connect.png"
                      ></img>
                      <img
                        className="google-logo-size gotofarm-logo-effect bg-white"
                        src="../../../Icons/gotofarm-logo-big.png"
                      ></img>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="google-connect-span w-100 d-flex flex-column justify-content-center align-items-center gap-1">
                      {profile ? (
                        <div className="">
                          <div className="d-flex justify-content-center gap-2 w-100">
                            <h1 className="text-success fw-bolder">哈囉!</h1>
                            <h1 className="text-warning fw-bolder">
                              {profile.name}
                            </h1>
                          </div>

                          <div className="text-success fw-bolder">
                            <h5>已成功使用Google帳號登入了</h5>
                            {/* <p>您的Email: {profile.email}</p> */}
                            <p>繼續下一步完成註冊</p>
                            {/* <p>Addredd : { profile. }</p> */}
                          </div>
                        </div>
                      ) : (
                        <div className="m-3">
                          <span>請點選"連結我的帳戶"進行登入</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class=" btn-area d-flex justify-content-center position-relative mt-5">
                  <a href="/login">
                    <div className="google-login-button-aria2 google-declind mt-5">
                      <span>
                        <a href="/login">返回登入頁面</a>
                      </span>
                    </div>
                  </a>
                  <div className="google-login-button-aria2 mt-5 swiper-button-next m-5">
                    {profile ? (
                      <span className="swiper-button-next">下一步(2/3)</span>
                    ) : (
                      <div className="google-login-button-aria2 google-declind">
                        {isLoading ? (
                          loader
                        ) : (
                          <GoogleLogin
                            clientId={clientId}
                            buttonText="連結我的帳戶"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mt-3">
                <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5">
                  <div className="w-100 login-input-contain mb-5 mt-5">
                    <span class="join-manin-head fs-2">
                      歡迎使用小農遊 Google註冊服務
                    </span>
                  </div>

                  <div className="mb-1">
                    <div className="w-100 d-flex justify-content-center align-items-center gap-5">
                      <div className="google-logo-size ">
                        <div className="google-inner-user">
                          {profile ? (
                            <img
                              className="google-inner-user"
                              src={profile.imageUrl}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <img
                        className="google-logo-size2 animate__rubberBand"
                        src="../../../textures/google-connect.png"
                      ></img>
                      <img
                        className="google-logo-size gotofarm-logo-effect bg-white"
                        src="../../../Icons/gotofarm-logo-big.png"
                      ></img>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="google-connect-span w-100 d-flex flex-column justify-content-center align-items-center gap-1">
                      {profile ? (
                        <div>
                          <div className="d-flex justify-content-center gap-2 w-100">
                            <h1 className="text-success fw-bolder">哈囉!</h1>
                            <h1 className="text-warning fw-bolder">
                              {profile.name}
                            </h1>
                          </div>

                          <div className="text-success fw-bolder">
                            <h5>已成功使用Google帳號登入了</h5>
                            {/* <p>您的Email: {profile.email}</p> */}
                            <p>繼續下一步完成註冊</p>
                            {/* <p>Addredd : { profile. }</p> */}
                          </div>
                        </div>
                      ) : (
                        <div className="m-3">
                          <span>請點選"連結我的帳戶"進行登入</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class=" btn-area d-flex justify-content-center position-relative mt-5">
                  <a href="/login">
                    <div className="google-login-button-aria2 google-declind mt-5">
                      <span>
                        <a href="/login">返回登入頁面</a>
                      </span>
                    </div>
                  </a>
                  <a href="http://localhost:3000/Checked">
                  <div className="google-login-button-aria2 mt-5 swiper-button-next m-5">
                    {profile ? (
                      <span className="swiper-button-next">送出資料</span>
                    ) : (
                      <div className="google-login-button-aria2 google-declind">
                        {isLoading ? (
                          loader
                        ) : (
                          <GoogleLogin
                            clientId={clientId}
                            buttonText="連結我的帳戶"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                          />
                        )}
                      </div>
                    )}
                    </div>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </>
    </form>
  )
}
export default GoogleRegister
