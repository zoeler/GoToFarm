import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom'
import { HOST } from '../../components/api_config'
import avaUploader from '../../components/avaUploader'
import axios from 'axios'

//引入日期選擇組件
import DateSelector from '../../components/DateSelector'

//引入滑動卡片組件
import { Navigation, Pagination, Scrollbar, A11y, HashNavigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

//------比對註冊資料---------
import EmailCompare from '../../components/EmailCompare'

//引用密碼驗證組件
//哇哈哈我不需要了～自己寫比較快

//引入表單註冊&驗證組件(hooks)
import useInputValidate from '../../components/utils/useInputValidate'

//引入樣式
import 'swiper/css'
import 'swiper/css/pagination'
import '../../css/login-mobile.css'
import '../../css/login-swiper.css'
import '../../css/logon-main.css'
import '../../css/members.css'
import '../../css/main.css'
import '../../css/register-mobile.css'

const Register = () => {
  const member_emailRef = useRef(null)
  const member_passwordRef = useRef(null)
  const member_nicknameRef = useRef(null)
  const member_nameRef = useRef(null)
  const member_matchPasswordRef = useRef(null)
  const member_addressRef = useRef(null)
  const member_mobileRef = useRef(null)


  //表單欄位驗證相關
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [mbirthday, setMbirthday] = useState('')
  const [ava_value, Setava_value] = useState('')
  const [dates, SetDates] = useState('')
  const [selectYear, setSelectYear] = useState('1992')
  const [selectMonth, setSelectMonth] = useState('04')
  const [selectDay, setSelectDay] = useState('01')

  //------圖片上傳功能------
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('')

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('../../../images/ava-upload.png')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    console.log(objectUrl)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

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






  const handleSubmit = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    console.log(e.target.files[0])
    axios
      .post(`${HOST}/img/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)

        setPreview(`${HOST}/images/avatar/${response.data}`)

        setFields((old) => ({ ...old, ava: response.data }))
      })
      .catch((error) => {
        console.error(error)
      })
  }

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
    selectDay: selectDay,
    selectMonth: selectMonth,
    selectYear: selectYear,
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

  //一件輸入功能：
  const handleOneClickFill = () => {

    member_emailRef.current.value = 'farmerwww33@gmail.com';
    member_nameRef.current.value = '王曉農';
    member_nicknameRef.current.value = '曉曉農';
    member_passwordRef.current.value = 'A123456';
    member_matchPasswordRef.current.value = 'A123456'
    setFields({
      ...fields,
      member_email: "farmerwww33@gmail.com",
      member_name: "王曉農",
      member_nickname:"曉曉農",
      member_password:"A123456",
      member_matchPassword:"A123456",
    })
  }

  const handleOneClickOkmail = () => {

    member_emailRef.current.value = 'farmer123@farm.com';
    setFields({
      ...fields,
      member_email: "farmer123@farm.com",
    })
  }

  const handleOneClickOkAddress = () => {
    member_addressRef.current.value = '光明六路東一段265號';
    member_mobileRef.current.value = '0222331245';
    setFields({
      ...fields,
      member_address: "光明六路東一段265號",
      member_mobile: "0222331245"
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

    const res = await axios.post('http://localhost:3033/register/add', fields)

    // 測試寄送郵件功能
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'farmerwww33@gmail.com',
    //     pass: '33farmerwww'
    //   }
    // });

    // // 寄信的內容
    // const message = {
    //   from: 'farmerwww33@gmail.com',
    //   to: fields.member_email,
    //   subject: '[註冊通知] 小農遊會員註冊成功',
    //   html: `<p><strong>哈囉！</strong> ${fields.member_nickname}
    //   </p><p><strong>Email:</strong> ${fields.member_email}</p>
    //   <p>您已經成功註冊小農遊帳號囉！</p>
    //   <p>歡迎您盡情體驗優質農業課程及商品喔！</p>
    //   <p><strong>Message:</strong> ${message}</p>`
    // };

    // try {
    //   // Send the email using the Nodemailer transporter object
    //   await transporter.sendMail(message);
    //   alert('Email sent successfully!');
    // } catch (error) {
    //   console.error(error);
    //   alert('Failed to send email.');
    // }

    if (res.data.message = 'success') {
      setTimeout("location.href='/Checked'", 100)
    } else {
      alert('註冊失敗')
      // location.href = '/login'
    }
  }

  return (
    <form onSubmit={handleRegister} className="">
      
      <div
        className="m-session ms w-100 d-flex justify-content-center "
        style={{ marginTop: '-225px', paddingBottom: '980px' }}
      >
        <>
          <Swiper
            cssMode={true}
            spaceBetween={50}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'disable',
            }}
            pagination={{
              disabledClass: 'disable',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            modules={[Pagination, Navigation, Scrollbar, HashNavigation]}
            className="swiper-pagination msww"
          >
            <SwiperSlide>
              {/* <!-- First-Card --> */}

              {/* <!-- First-Card 結束 --> */}
            </SwiperSlide>
            <SwiperSlide>
              {/* <!-- First-Card --> */}
              {/* <!-- First-Card 結束 --> */}
            </SwiperSlide>

            <SwiperSlide style={{ marginTop: '0px' }}>
              {/* <!-- First-Card --> */}
              <div className="swiper-slide msss slide-change d-flex justify-content-center  align-items-start">
                <div class="login-span mt-3">
                  <div class="re-card d-block justify-content-center h-100 mt-5">
                    <span class="join-manin-head fs-2 mb-3">
                      加入成為小農吧!
                    </span>
                    <div className='position-absolute'>
                      <button className='login-auto-input' type='button' onClick={() => { handleOneClickFill() }}>
                        <img src='http://localhost:3000/Icons/IconMember.png'></img>
                      </button>
                      <button type='button' className='login-auto-input' onClick={() => { handleOneClickOkmail() }}>
                        <img src='http://localhost:3000/Icons/IconNews.png'></img>
                      </button>
                    </div>
                    {/* <!-- 填入資料表單 --> */}
                    <div class="login-input-contain">
                      <span class="login-text fs-6">
                        加入小農大家庭，享受優質課程及商品優惠
                      </span>
                      <div class="d-flex re-input">
                        <div class="login-input-area text-start mr">
                          <div class="login-text">姓名*</div>
                          <input
                            type="text"
                            id="member_name"
                            name="member_name"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            maxlength="15"
                            minLength="2"
                            class="sing-up-input"
                            ref={member_nameRef}
                            resetName
                          ></input>

                          {fields.member_name.length < 2 ? (
                            <div class="sign-up-hint">請輸入完整的姓名</div>
                          ) : fields.member_name > 2 ? (
                            <div class="sign-up-hint-checked text-danger fw-bolder">
                              請將資料填寫完成
                            </div>
                          ) : (
                            <div class="sign-up-hint-checked d-flex align-items-center">
                              <img
                                className="sign-up-hint-checked-img"
                                src="/Icons/input-checked.png"
                              />
                              OK!
                            </div>
                          )}

                          {/* <div class="sign-up-hint">請輸入完整的姓名</div>
                                         
                                                    <div class="sign-up-hint-checked d-flex align-items-center">
                                                        <img className='sign-up-hint-checked-img' src='/Icons/input-checked.png' />OK!
                                                    </div>  */}

                          {/* {nameError && <div class="sign-up-hint-checked text-danger">請輸入完整的姓名</div>} */}
                        </div>
                        <div class="login-input-area text-start">
                          <div class="login-text">暱稱*</div>
                          <input
                            type="text"
                            name="member_nickname"
                            id="member_nickname"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            minlength="1"
                            maxlength="8"
                            class="sing-up-input"
                            ref={member_nicknameRef}
                            reseNickName
                          ></input>

                          {fields.member_nickname.length <= 0 ? (
                            <div class="sign-up-hint">
                              可以自由發揮，最多只能輸入8個字元喔！
                            </div>
                          ) : fields.member_nickname.length >= 2 ? (
                            <div class="sign-up-hint-checked d-flex align-items-center">
                              <img
                                className="sign-up-hint-checked-img"
                                src="/Icons/input-checked.png"
                              />
                              OK!
                            </div>
                          ) : (
                            <div class="sign-up-hint-checked text-danger fw-bolder">
                              請將資料填寫完成
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div class="login-input-area text-start input-email-height">
                          <div class="login-text w-100">Email*</div>
                          <input
                            type="email"
                            name="member_email"
                            id="member_email"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            className="sing-up-input input-email"
                            placeholder="填入的Email會作為小農遊帳號使用喔！"
                            ref={member_emailRef}
                          ></input>
                          {fields.member_email.length >= 3 ? (
                            emailRule.test(fields.member_email) ?
                              fields.member_email == 'farmerwww33@gmail.com' ?
                                (
                                  <div class="sign-up-hint-checked d-flex align-items-center text-danger">
                                    此帳號已經被註冊過了喔！
                                  </div>
                                )
                                :
                                (
                                  <div class="sign-up-hint-checked d-flex align-items-center">
                                    <img
                                      className="sign-up-hint-checked-img"
                                      src="/Icons/input-checked.png"
                                    />
                                    OK!
                                  </div>
                                )

                              : (
                                <div className="text-danger fs-6">
                                  格式輸入錯誤囉! 範例:farmerwww@go.com
                                </div>
                              )
                          ) : (
                            <div className="sign-up-hint">
                              請輸入註冊用的Email帳戶
                            </div>
                          )}

                          {/* {row.member_email === fields.member_email} */}
                        </div>
                      </div>
                      <div>
                        <div class="d-flex re-input">
                          <div className="login-input-area text-start">
                            <div className="login-text">密碼*</div>
                            <input
                              id="password"
                              name="password"
                              minlength="6"
                              maxlength="10"
                              onChange={handleFieldsChange}
                              value={fields.name}
                              ref={member_passwordRef}
                              type={shownPassword ? 'text' : 'password'}
                              className="sing-up-input demo_input "
                            ></input>

                            {fields.password.length <= 0 ? (
                              <div className="sign-up-hint">
                                請輸入至少6~10位數字＋英文密碼
                              </div>
                            ) : fields.password.length < 6 &&
                              fields.password.length > 0 ? (
                              <div class="sign-up-hint-checked text-danger fw-bolder">
                                請將密碼填寫完成
                              </div>
                            ) : (
                              <div class="sign-up-hint-checked d-flex align-items-center">
                                <img
                                  className="sign-up-hint-checked-img"
                                  src="/Icons/input-checked.png"
                                />
                                OK!
                              </div>
                            )}

                            <div
                              className="login-text mm-pointer mt-0 d-flex align-items-center me-4"
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
                              ></img>
                              顯示密碼
                            </div>
                          </div>
                          <div class="login-input-area text-start m-s-match">
                            <div class="login-text">確認密碼*</div>
                            <input
                              id="matchPassword"
                              name="matchPassword"
                              type="password"
                              onChange={handleFieldsChange}
                              value={fields.name}
                              minlength="6"
                              maxlength="10"
                              ref={member_matchPasswordRef}
                              class="sing-up-input"
                            ></input>

                            {/* {/* {matchPassword > 5 && password == matchPassword ?
                                                            <div class="sign-up-hint-checked d-flex align-items-center">
                                                                <img className='sign-up-hint-checked-img' src='/Icons/input-checked.png' />OK!
                                                            </div>
                                                            :
                                                            ""
                                                        } */}

                            {fields.matchPassword.length > 0 ? (
                              fields.matchPassword.length < 5 ? (
                                <div className="sign-up-hint-checked">
                                  請繼續輸入....
                                </div>
                              ) : fields.password === fields.matchPassword ? (
                                <div class="sign-up-hint-checked d-flex align-items-center">
                                  <img
                                    className="sign-up-hint-checked-img"
                                    src="/Icons/input-checked.png"
                                  />
                                  OK!
                                </div>
                              ) : (
                                <div className="sign-up-hint-checked text-danger fw-bolder">
                                  與輸入的密碼不符合，請再檢查一次
                                </div>
                              )
                            ) : (
                              <div className="sign-up-hint">
                                請填寫與輸入相符的密碼喔!
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ms-5 d-flex  justify-content-center mt-2 swiper-button-next mhb">
                          <div class="btn-area w-25 d-flex justify-content-center vb"></div>

                          {/* {member_name && member_nickname && emailRule.test(member_email) && password.length >=6 && password === matchPassword ?
                                                        <div class=" btn-area d-flex justify-content-center swiper-button-next">
                                                            <a href="#/"
                                                                className="buttonG swiper-button-next login-btfont">下一步(1/3)</a>
                                                        </div> :
                                                        <div class=" btn-area d-flex justify-content-center swiper-button-disabled">
                                                            <div
                                                                className="buttonG login-btfont register-disabled"
                                                            >請先將資料填妥喔</div>
                                                        </div>
                                                    } */}

                          {fields.password == fields.matchPassword &&
                            fields.password.length > 5 &&
                            emailRule.test(fields.member_email) &&
                            fields.member_nickname.length > 1 && fields.member_email !== "farmerwww33@gmail.com" ? (
                            <div class=" btn-area d-flex justify-content-center swiper-button-next mhb">
                              <a
                                href="#/"
                                className="buttonG swiper-button-next login-btfont"
                              >
                                下一步(1/3)
                              </a>
                            </div>
                          ) : (
                            <div class=" btn-area d-flex justify-content-center disabled register-disabled mhb">
                              <div className="buttonG login-btfont disabled ">
                                請填寫全部欄位
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- First-Card 結束 --> */}
            </SwiperSlide>
            <SwiperSlide style={{ marginTop: '200px' }}>
              {/* <!-- Scend-Card --> */}
              <div class="swiper-slide slide-change d-flex justify-content-center  align-items-start">
                <div class="w-75 mt-5">
                  <div class="d-block justify-content-center h-75 mt-2">
                    <span class="join-manin-head fs-2">加入成為小農吧!</span>
                    {/* <!-- 填入資料表單 --> */}

                    <div class="login-input-contain">
                      <button type='button' className='login-auto-input' onClick={() => { handleOneClickOkAddress() }}>
                        <img src='http://localhost:3000/Icons/IconNews.png'></img>
                      </button>
                      <span class="login-text fs-6">
                        輸入居住地資料會成為預設的小農Ｇo物送貨地址喔！
                      </span>
                      <div class="d-flex flex-grow-1 mt-2 msa">
                        <div class="login-input-area text-start">
                          <div class="login-text me-4 w-50">居住城市*</div>
                          <select
                            id="city5"
                            class="sing-up-input"
                            name="city"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            placeholder="請選擇縣市"
                          ></select>
                          <div class="sign-up-hint">
                            下拉選單會幫助您選擇居住城市及地區喔！
                          </div>
                        </div>
                        <div class="login-input-area text-start">
                          <div class="login-text w-50">居住地區*</div>
                          <select
                            id="dist5"
                            class="sing-up-input"
                            name="district"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            placeholder="請選擇鄉鎮區"
                          ></select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div class="login-text text-start">詳細地址*</div>
                        <div class="login-input-area  text-start d-flex w-100">
                          <input
                            id="zip-code"
                            data-exclude="澎湖縣,929,綠島鄉"
                            class="me-3 w-25 js-demeter-tw-zipcode-selector sing-up-input input-email"
                            name="zipcode"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            data-city="#city5"
                            data-dist="#dist5"
                            placeholder="郵遞區號"
                          />
                          <input
                            id="full-address"
                            type="text"
                            maxlength="20"
                            class="sing-up-input input-email"
                            name="fulladdress"
                            onChange={handleFieldsChange}
                            value={fields.name}
                            ref={member_addressRef}
                            placeholder="點此輸入完整地址"
                          ></input>
                        </div>
                      </div>
                      <div>
                        <div class="login-text text-start d-flex me-3">
                          <div class="login-input-area text-start">
                            <div class="login-text">聯絡電話(手機)*</div>
                            <input
                              className="sing-up-input"
                              type="tel"
                              id="member_mobile"
                              name="member_mobile"
                              onChange={handleFieldsChange}
                              value={fields.name}
                              ref={member_mobileRef}
                              minlength="10"
                              maxlength="10"
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            ></input>
                            {fields.member_mobile ? (
                              fields.member_mobile[0] == '0' ? (
                                fields.member_mobile.length > 9 ||
                                  fields.member_mobile[1] !== '9' ? (
                                  mobileRule.test(fields.member_mobile) ? (
                                    <div class="sign-up-hint-checked d-flex align-items-center">
                                      <img
                                        className="sign-up-hint-checked-img"
                                        src="/Icons/input-checked.png"
                                      />
                                      OK!
                                    </div>
                                  ) : (
                                    <div class="sign-up-hint-checked text-danger">
                                      填寫的號碼格式有錯喔! 請再檢查
                                    </div>
                                  )
                                ) : (
                                  <div class="sign-up-hint-checked">
                                    請繼續填寫資料...
                                  </div>
                                )
                              ) : (
                                <div class="sign-up-hint-checked text-danger">
                                  請填寫以"09"開頭的手機號碼喔!
                                </div>
                              )
                            ) : (
                              <div class="sign-up-hint">
                                請填寫臺灣通用的手機號碼
                              </div>
                            )}

                            {/* <div class="sign-up-hint-checked text-danger fw-bolder">手機格式錯誤囉!</div> */}

                            {/* {mobileRule.test(fields.member_mobile) ?
                                                                <div class="sign-up-hint-checked d-flex align-items-center">
                                                                    <img className='sign-up-hint-checked-img' src='/Icons/input-checked.png' />OK!
                                                                </div>
                                                                :
                                                                <div class="sign-up-hint-checked text-danger fw-bolder">手機的格式錯誤囉!</div>
                                                            } */}
                          </div>
                          <div class="login-input-area text-start">
                            <div class="login-text">簽收人姓名</div>
                            <input
                              type="text"
                              placeholder="預設與會員姓名相同"
                              class="sing-up-input"
                            ></input>
                            <div class="sign-up-hint">
                              可以輸入簽收人姓名資料
                            </div>
                          </div>
                        </div>

                        <div class="w-100 d-flex justify-content-center mt-4 gap-2">
                          <div class="me-5 btn-area w-50 d-flex justify-content-stat">
                            <a
                              href="#/"
                              className="buttonYL login-btfont swiper-button-prev"
                            >
                              上一步
                            </a>
                          </div>
                          <div className="swiper-button-next w-50">
                            {/* {mobileRule.test(mobile) && address.length > 8 ?
                                                            <div class=" btn-area d-flex justify-content-center">
                                                                <a href="#/"
                                                                    className="buttonG swiper-button-next login-btfont ms-2">下一步(2/3)</a>
                                                            </div> :
                                                            <div class=" btn-area d-flex justify-content-center">
                                                                <div
                                                                    className="buttonG login-btfont register-disabled ms-2"
                                                                >請先將資料填妥喔</div>
                                                            </div>
                                                        } */}

                            {mobileRule.test(fields.member_mobile) &&
                              fields.fulladdress.length > 5 &&
                              fields.district &&
                              fields.city ? (
                              <div class=" btn-area d-flex justify-content-center swiper-button-next">
                                <a
                                  href="#/"
                                  className="buttonG swiper-button-next login-btfont"
                                >
                                  下一步(1/3)
                                </a>
                              </div>
                            ) : (
                              <div class="btn-area d-flex justify-content-center disabled register-disabled">
                                <div className="buttonG login-btfont disabled">
                                  請檢查全部欄位喔!
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Scend-Card End --> */}
            </SwiperSlide>
            <SwiperSlide style={{ marginTop: '200px' }}>
              {/* <!-- Third-Card --> */}
              <div class="swiper-slide slide-change d-flex justify-content-center  align-items-start">
                <div class="w-75 mt-5">
                  <div class="h-75 w-100 mt-2  d-flex flex-column justify-content-center">
                    <span class="join-manin-head fs-2">
                      加油！下一步就要完成了
                    </span>

                    <span class="login-text fs-6">
                      上傳大頭貼及會員生日登記，完成註冊即享有小農Go優惠
                    </span>

                    {/* <avaUploader/> */}

                    <div class="ava-ara d-flex justify-content-center align-items-center mt-1">
                      <div class=" accordion-collapse m-member-avacircle2 d-flex flex-column justify-content-center align-content-center">
                        <input
                          type="file"
                          class="ava_upload position-absolute bg-white w-100"
                          accept="image/*"
                          value={ava_value}
                          onChange={(e) => {
                            e.preventDefault()
                            // changeHandler(e)
                            handleSubmit(e)
                          }}
                          name="ava_value"
                        ></input>
                        <img
                          id="ava_output"
                          class="ava-upload-img  d-flex justify-content-center align-items-center"
                          src={preview}
                          value={fields.name}
                          name="ava_value"
                          alt="點此上傳大頭貼"
                        ></img>
                      </div>
                    </div>
                    {/* <!-- 填入資料表單 --> */}

                    <div class="login-input-contain d-block justify-content-center w-100 ">
                      <div class="d-flex justify-content-center ssb">
                        <div class="login-input-area text-start mbc ssb">
                          <div class="login-text">會員生日*</div>
                          {/* <div class="login-text d-flex align-items-center me-5">
                                                            <div
                                                                class="singn-in-hide-day d-flex justify-content-center align-items-center me-2">
                                                                <select id="selYear" class="sing-in-select"
                                                                    name="members_year">
                                                                </select>
                                                            </div>
                                                            <div
                                                                class="singn-in-hide-day d-flex justify-content-center align-items-center me-2">
                                                                <select id="selMonth" class="sing-in-select"
                                                                    name="members_month"></select>月</div>
                                                            <div
                                                                class="singn-in-hide-day d-flex justify-content-center align-items-center text-start me-2">
                                                                <select id="selDay" class="sing-in-select"
                                                                    name="members_day"></select>日</div>
                                                       
                                                        </div> */}
                          <p></p>
                          <DateSelector
                            selectYear={selectYear}
                            setSelectYear={setSelectYear}
                            selectMonth={selectMonth}
                            setSelectMonth={setSelectMonth}
                            selectDay={selectDay}
                            setSelectDay={setSelectDay}
                          ></DateSelector>
                        </div>
                      </div>

                      <div class="w-100 d-flex justify-content-center mt-4 ssb">
                        <div class="me-5 btn-area w-100 d-flex justify-content-stat">
                          <a
                            href="#/"
                            class="buttonYL login-btfont swiper-button-prev"
                          >
                            上一步
                          </a>
                        </div>

                        {/* {mobileRule.test(mobile) && member_email && ava_value ? */}
                        {/* {mobileRule.test(mobile)  ?
                                                    <div class=" btn-area ms-5 d-flex justify-content-center">
                                                        <button
                                                            type='submit'
                                                            class=" ms-3 buttonG swiper-button-next login-btfont">完成！發送認證信</button>
                                                    </div>
                                                    :
                                                    <div class=" btn-area d-flex justify-content-center">
                                                        <div
                                                            className="buttonG login-btfont register-disabled ms-2"
                                                        >請先將資料填妥喔</div>
                                                    </div>
                                                } */}

                        {mobileRule.test(fields.member_mobile) &&
                          emailRule.test(fields.member_email) &&
                          fields.password === fields.matchPassword ? (
                          <div class=" btn-area ms-5 d-flex justify-content-center">
                            <button
                              type="submit"
                              class=" ms-3 buttonG login-btfont"
                            >
                              完成！發送認證信
                            </button>
                          </div>
                        ) : (
                          <div class="btn-area d-flex justify-content-center disabled register-disabled mhb">
                            <div className="buttonG login-btfont disabled">
                              請檢查全部欄位喔!
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      </div>
    </form>
  )
}
export default Register
