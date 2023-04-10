import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { HOST, MY_EDIT_MEMBER, MY_MEMBER } from '../../components/api_config'
// import AuthContext from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

function MemberRight() {
  //頁面跳轉
  const myAuth = JSON.parse(localStorage.getItem('myAuth'))
  // const { myAddress, setMyAddress, myAwards, myLevel } = props
  // const { setMyImg } = useContext(AuthContext)

  //取得會員資料
  const [myAddress, setMyAddress] = useState([])
  const [myAwards, setMyAwards] = useState([])
  const [myLevel, setMyLevel] = useState([])

  useEffect(() => {
    getMemberData()
    return () => {
      console.log('unmount')
    }
  }, [])
  const getMemberData = async () => {
    axios
      .post(
        MY_MEMBER,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        setMyAddress(response.data.mymember)
        setMyAwards(response.data.myawards)
        setMyLevel(response.data.mylevel)

        console.log(response.data)
        // 在此處處理回應
      })
      .catch((error) => {
        // 在此處處理錯誤
        console.error(error)
      })
  }

  //修改會員資料
  const editMemberData = async () => {
    console.log('edit')
    axios
      .put(`${MY_EDIT_MEMBER}/${myAuth.accountId}`, {
        headers: {
          Authorization: 'Bearer ' + myAuth.token,
        },
        params: { sid: myAuth.accountId },
        updateData: myAddress,
      })
      .then((response) => {
        setMyAddress(response.data)
        window.location.reload()
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  //不能修改
  const [readOnly, setReadOnly] = useState(true)

  const handleClick = () => {
    // setDisabled(true)
    setReadOnly(false)
  }
  const date = new Date(myAddress.member_birthday)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') //月份需加一，且補齊兩位數
  const day = String(date.getDate()).padStart(2, '0') //日期補齊兩位數
  const formattedDate = `${year}-${month}-${day}`

  const handleInputChange = (event) => {
    console.log(event.target.id, event.target.value)
    setMyAddress((a) => {
      return { ...a, [event.target.id]: event.target.value }
    })
  }

  const handleFileChange = (event) => {
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('sid', myAuth.accountId)
    console.log(event.target.files[0])
    console.log(myAuth.accountId)

    axios
      .post(`${HOST}/memberImg/upload`, formData, {
        headers: {
          Authorization: 'Bearer ' + myAuth.token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setMyAddress(response.data)
        // setMyImg(response.data.member_img)
        window.location.reload()
        console.log('img', response.data.member_img)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      {console.log('MemberRight')}
      <div className="M-right-card col-11">
        {/* <!-- 卡片分區 以下是會員名稱 --> */}
        <div className="M-member-name">
          <div className="M-member-avacircle d-flex justify-content-center align-items-center">
            <div className="M-select-avatar">
              <label for="file-upload" className="custom-file-upload">
                選擇檔案
              </label>
              <input
                type="file"
                onChange={(event) => {
                  handleFileChange(event)
                }}
                id="file-upload"
              />
            </div>
            <img
              src={`http://localhost:3033/images/avatar/${myAddress.member_img}`}
              alt=""
            />
          </div>

          <div className="D-inline mt-4 ms-2">
            {myAddress && (
              <span className="f-Brown">{myAddress.member_name}</span>
            )}
            <span>
              <div className="d-flex">
                <div className="M-Icon-reput">
                  <img
                    src={`http://localhost:3033/images/awards/${myLevel.levelimg}.svg`}
                    alt=""
                  />
                </div>
                <span className="f-20 f-Brown">{myLevel.levelState}</span>
              </div>
            </span>
          </div>
        </div>
        {/* <!-- 卡片分區 以下是會員資訊細節 --> */}
        <div className="M-member-info-detail">
          <div className="M-id w-100">
            <li>
              <label htmlFor="member_name" className="f-Brown f-18 sp-2">
                姓名
              </label>
              {console.log({ myAddress })}
              {myAddress && (
                <div className={readOnly ? 'M-input' : 'M-inputEditable'}>
                  <input
                    type="text"
                    id="member_name"
                    readOnly={readOnly}
                    value={myAddress.member_name}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </li>

            <li>
              <label htmlFor="member_nickname" className="f-Brown f-18 sp-2">
                暱稱
              </label>
              {myAddress && (
                <div className={readOnly ? 'M-input' : 'M-inputEditable'}>
                  <input
                    type="text"
                    id="member_nickname"
                    readOnly={readOnly}
                    value={myAddress.member_nickname}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </li>

            <li>
              <label htmlFor="member_email" className="f-Brown f-18 sp-2">
                帳號
              </label>
              {myAddress && (
                <div className={readOnly ? 'M-input-2' : 'M-inputEditable-2'}>
                  <input
                    type="text"
                    id="member_email"
                    readOnly={readOnly}
                    value={myAddress.member_email}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </li>

            <li>
              <label htmlFor="member_mobile" className="f-Brown f-18 sp-2">
                手機號碼
              </label>
              {myAddress && (
                <div className={readOnly ? 'M-input' : 'M-inputEditable'}>
                  <input
                    type="text"
                    id="member_mobile"
                    readOnly={readOnly}
                    value={myAddress.member_mobile}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </li>

            <li className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <label htmlFor="member_birthday" className="f-Brown f-18 sp-2">
                  生日
                </label>
                {myAddress && (
                  <div
                    className={
                      readOnly
                        ? 'M-input ms-2 ps-2'
                        : 'M-inputEditable ms-2 ps-2'
                    }
                  >
                    <input
                      type="date"
                      id="member_birthday"
                      readOnly={readOnly}
                      value={formattedDate}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex gap-2">
                {readOnly || (
                  <button
                    className="M-EditC"
                    onClick={() => {
                      editMemberData()
                      setReadOnly(true)
                    }}
                  ></button>
                )}

                <button className="M-Editbutton" onClick={handleClick}></button>
              </div>
            </li>
          </div>
        </div>

        <div className="M-hr text-center"></div>
        <div className="M-adward-box d-flex w-100">
          <div className="w-45">
            <div className="h100 d-flex flex-wrap">
              <div className="d-flex justify-content-start align-items-center">
                <div className="M-Icon-band"></div>
                <p className="ms-3 mt-2 f-20 f-B f-Brown">我的成就</p>
              </div>
              <div className="M-band-circle d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column text-center">
                  <span className="f-32 f-B f-LightGreen">{myLevel.level}</span>
                  <span className="fs-3 f-B f-Khaki">Level</span>
                  <span className="fw-bold f-B f-LightGreen">
                    {myLevel.levelState}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-45">
            <div className="h100 d-flex flex-wrap">
              <div className="d-flex justify-content-start align-items-center">
                <div className="M-Icon-band"></div>
                <p className="ms-3 mt-2 f-20 f-B f-Brown">我的勳章</p>
              </div>

              {/* <!-- 以下勳章列表（最後會用迴圈方式呈現） --> */}
              <div className="M-band-square">
                {myAwards.length &&
                  myAwards.slice(0, 3).map((a) => {
                    var red = Math.floor(Math.random() * 100 + 50)
                    var green = Math.floor(Math.random() * 200 + 20)
                    var hex = `rgb(${red}, ${green},2)`
                    const hue = Math.floor(Math.random() * 100 + 10)
                    const bkStyle = {
                      filter: 'hue-rotate(' + hue + 'deg)',
                      color: hex,
                    }
                    return (
                      <div
                        className="M-hovertext"
                        data-hover={a.awards_discription}
                        key={a.sid}
                      >
                        <div className="M-adward-brands" style={bkStyle}>
                          {a.awards_name}
                        </div>
                      </div>
                    )
                  })}
                <div className="w-100 d-flex justify-content-end">
                  <Link to="/MyMember/MyAwards">
                    <button
                      className="M-seemore M-hovertext"
                      data-hover="看更多"
                      onClick={() => {}}
                    ></button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 側標籤(可以再優化) --> */}
      <div className="M-card-label mt-5">
        <li>個人檔案</li>
        <li>付款方式</li>
        <li>送貨資料</li>
        <li>變更密碼</li>
      </div>
      {/* <!-- 側標籤(可以再優化) --> */}
    </>
  )
}

export default MemberRight
