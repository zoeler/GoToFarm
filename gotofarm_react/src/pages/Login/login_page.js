import { useState, useContext, } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LOGIN } from '../../components/api_config'
import AuthContext from '../../contexts/AuthContext'
import '../../css/login-mobile.css'
import '../../css/login-swiper.css'
import '../../css/logon-main.css'
import '../../css/main.css'

function Login() {

  const [myForm, setMyForm] = useState({
    account: '',
    password: '',
  })

  const handleOneClickFill = () => {
    setMyForm({
      ...myForm,
      account: "farmer123@farm.com",
      password: "A123456",
    })
    console.log(myForm)
  }

  const { setMyAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [shownPassword, setHidePassword] = useState(false)
  const { myAuth, logout } = useContext(AuthContext)

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          axios.post(LOGIN, myForm).then((response) => {
            console.log(response.data)
            if (response.data.success) {
              const {
                account,
                accountId,
                token,
                member_name,
                member_nickname,
                member_state_sid,
                member_img,
                member_correct,
              } = response.data
              localStorage.setItem(
                'myAuth',
                JSON.stringify({
                  account,
                  accountId,
                  token,
                  member_name,
                  member_nickname,
                  member_img,
                  member_state_sid,
                  member_correct,
                })
              )
              setMyAuth({
                authorized: true,
                account,
                token,
                sid: accountId,
                member_name: member_name,
                member_nickname: member_nickname,
                member_state_sid: member_state_sid,
                member_correct: member_correct,
                member_img: member_img,
              })
              navigate('/Comfirm')
            } else {
              alert(response.data.error || '帳號或密碼錯誤')
            }
          })
        }}
      >
        <div className="login-session w-100 d-flex m-page-direction">
          <div className="m-session-direction w-100">
            <label
              htmlFor="account"
              className="form-label w-25 d-flex position-absolute"
            >
              <div className='position-absolute ms-5'>
                <button className='login-auto-input2' type='button' onClick={() => { handleOneClickFill() }}>
                  <img src='http://localhost:3000/svg/a-products-title-img.png'></img>
                </button>
              </div>
            </label>
            <div className="login-main-full col-12 d-flex  justify-content-center  mt-3">
              <div className="log-join-card2 login-hiddend-card col-5  ">
                <div className="swiper-wrapper ">
                  <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-left col-12">
                    <div className="mt-4 w-75">
                      <div className="input-group-1 d-block justify-content-center h-100 mt-5 ms-4">
                        <span className="login-span join-manin-head fs-2 mb-5 mt-5 ">
                          登入
                        </span>
                        <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-warning">
                          小農遊
                        </span>
                        <div className="login-input-contain w-100">

                          <div className="login-input-area text-start">
                            <div className="login-text">帳號</div>
                            <input
                              type="text"
                              id="account"
                              name="account"
                              value={myForm.account}
                              className="sing-up-input input-email login-input"
                              onChange={(e) => {
                                setMyForm((prev) => ({
                                  ...myForm,
                                  account: e.target.value,
                                }))
                              }}
                              placeholder="小農遊帳號就是您的Email喔！"
                            ></input>
                            <div className="sign-up-hint">請輸入您的Email喔！</div>
                          </div>
                          <div className="login-input-area text-start">
                            <div className="login-text">密碼*</div>
                            <input
                              id="password"
                              name="password"
                              minlength=""
                              maxlength="10"
                              value={myForm.password}
                              type={shownPassword ? 'text' : 'password'}
                              onChange={(e) => {
                                setMyForm((prev) => ({
                                  ...myForm,
                                  password: e.target.value,
                                }))
                              }}
                              className="sing-up-input demo_input input-email"
                            ></input>
                            <div className="sign-up-hint">
                              請輸入至少6~12位數字＋英文密碼
                            </div>
                            <div
                              className="login-text mt-0 d-flex align-items-center me-4 mm-pointer"
                              onClick={() => setHidePassword(!shownPassword)}
                            >
                              <img
                                className="me-2 show_password_img"
                                src={
                                  shownPassword
                                    ? '/Icons/IconProduct.png'
                                    : '/Icons/invisiable_password.png'
                                }
                                onChange={() => { }}
                                alt=""
                              ></img>
                              顯示密碼
                            </div>
                            <div className="login-text mt-3 d-flex justify-content-center align-items-center me-4">
                              <a className="ａ-inline" href="#/">
                                忘記密碼了嗎？
                              </a>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="mt-0 w-75">
                              <div className="btn-area w-100 d-flex ">
                                <button
                                  href=""
                                  className="buttonY  border-0 bg-transparent login-btfont"
                                >
                                  登入
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="log-join-card3 login-hiddend-card col-3 mt-5 ms-5">
                <div className="swiper-wrapper">
                  <div className="swiper-slide slide-change d-flex justify-content-center align-items-start mt-5 login-right">
                    <div className="mt-5 flex-column justify-content-center align-items-center">
                      <div className="d-block justify-content-center align-items-center h-100 mt-3">
                        <span className="login-span join-manin-head fs-2 mb-5  text-warning ">
                          加入
                        </span>
                        <span className="login-span join-manin-head fs-2 mb-5 mt-5 text-success">
                          小農大家庭
                        </span>
                        <div className="login-input-contain text-success w-100 d-flex justify-content-center mt-5">
                          <div className="login-span flex-column w-100 text-start login-text-sapce">
                            <div>
                              <span>還沒成為小農嗎?加入我們，</span>
                            </div>
                            <div>
                              <span>走入田園開啟你的美好生活~</span>
                            </div>
                          </div>
                        </div>
                        <div className="login-input-contain text-success w-100 d-flex flex-column justify-content-center mt-5">
                          <div className=" flex-column w-100 text-start mb-5 ms-4 login-text-sapce">
                            <div className="btn-area w-100 d-flex ">
                              <a
                                href="/register"
                                className="buttonGS  login-btfont"
                              >
                                會員註冊
                              </a>
                            </div>
                          </div>
                          <div className=" flex-column w-100 text-start mt-2 ms-4 login-text-sapce">
                            <div className="btn-area w-100 d-flex ">
                              <a
                                href="/GoogleR"
                                className="buttonGS  login-btfont fs-6"
                              >
                                Google快速註冊
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="log-join-card4 log-join-show col-10 mt-3 d-block mt-5">
                <div className="d-flex flex-row w-100 justify-content-center mt-3">
                  <ul
                    className="nav nav-pills flex-row flex-nowrap col-12 justify-content-center gap-1 "
                    id="pills-tab"
                    role="tablist"
                  >
                    <li
                      className="nav-item col-5 text-center d-flex justify-content-center log-tab-bg"
                      role="presentation"
                    >
                      <button
                        className="nav-link active col-12 log-tab-bg "
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="false"
                      >
                        會員登入
                      </button>
                    </li>
                    <li
                      className="nav-item col-5 text-center d-flex justify-content-center log-tab-bg"
                      role="presentation"
                    >
                      <button
                        className="nav-link col-12 log-tab-bg"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="true"
                      >
                        註冊會員
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="swiper-wrapper log-join-card4  w-100">
                  <div className="swiper-slide slide-change d-flex justify-content-center align-items-start w-100">
                    <div className="flex-column justify-content-center align-items-center col-11">
                      <div id="pills-tabContent" className="tab-content w-100">
                        <div
                          className="tab-pane fade show active login-mobile-card2 "
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="swiper-slide slide-change d-flex justify-content-center align-items-start w-100">
                            <div className="login-span w-100 ms-3">
                              <div className="input-group-1 d-block justify-content-center mt-5 h-100">
                                <span className="join-manin-head fs-1 ">
                                  登入
                                </span>
                                <span className="join-manin-head fs-1 text-warning">
                                  小農遊
                                </span>
                                <form action="">
                                  <div className="login-input-contain w-100">
                                    <div>
                                      <div className="login-input-area text-start w-100">
                                        <div className="login-text fs-6">
                                          帳號
                                        </div>
                                        <input
                                          type="text"

                                          name="account"
                                          className="sing-up-input input-email"
                                          placeholder="請輸入您的Email"
                                          onChange={(e) => {
                                            setMyForm((prev) => ({
                                              ...myForm,
                                              account: e.target.value,
                                            }))
                                          }}
                                        ></input>
                                        <div className="sign-up-hint">
                                          請輸入您的Email喔！

                                        </div>
                                      </div>
                                      <div className="login-input-area text-start w-100">
                                        <div className="login-text">密碼*</div>
                                        <input
                                          minlength="6"

                                          maxlength="10"
                                          name="password"
                                          type="password"
                                          onChange={(e) => {
                                            setMyForm((prev) => ({
                                              ...myForm,
                                              password: e.target.value,
                                            }))
                                          }}
                                          className="sing-up-input demo_input input-email"
                                        ></input>
                                        <div className="sign-up-hint">
                                          請輸入6~12位數字＋英文密碼
                                        </div>
                                        <div className="login-text d-flex justify-content-end align-items-center">
                                          <a className="ａ-inline fs-6" href="#/">
                                            忘記密碼了嗎？
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-center w-100">
                                      <div className="w-100">
                                        <div className="btn-area w-100 d-flex ">
                                          <button
                                            href=""
                                            className="buttonS  login-btfont"
                                          >
                                            登入
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="login-span tab-pane fade login-mobile-card "
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          <div className="d-block justify-content-center align-items-center h-100 mt-5">
                            <span className="join-manin-head fs-1 mb-2 mt-3 text-warning ">
                              加入
                            </span>
                            <span className="join-manin-head fs-1 mb-2 mt-3 text-success">
                              小農大家庭
                            </span>
                            <div className="login-input-contain text-success w-100 d-flex justify-content-center mt-4">
                              <div className="d-flex flex-column w-100 text-center login-text-sapce">
                                <div>
                                  <span>還沒成為小農嗎?</span>
                                </div>
                                <div>
                                  <span>加入我們，走入田園~</span>
                                </div>
                                <div>
                                  <span>開啟你的美好生活~</span>
                                </div>
                              </div>
                            </div>
                            <div className="login-input-contain text-success w-100 d-flex flex-column justify-content-center mt-5 ms-3">
                              <div className=" flex-column w-100 text-start mb-5 ms-4 login-text-sapce">
                                <div className="btn-area w-100 d-flex ">
                                  <a
                                    href="/register"
                                    className="buttonGS  login-btfont"
                                  >
                                    會員註冊
                                  </a>
                                </div>
                              </div>
                              <div className=" flex-column w-100 text-start mt-2 ms-4 login-text-sapce">
                                <div className="btn-area w-100 d-flex ">
                                  <a
                                    href="#/"
                                    className="buttonGS  login-btfont fs-6"
                                  >
                                    Google快速註冊
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="member-wave-side-botton"></div>
      </form>
    </>
  )
}

export default Login
