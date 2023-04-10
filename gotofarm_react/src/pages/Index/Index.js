import '../../css/index.css'
// import Navbar from './Navbar'
import Footer from './Footer'
import LessonSlider from './LessonSlider'
import LessonSliderMB from './LessonSliderMB'
// import Footer from './Footer'
import SlideShow from './SlideShow'
import SlideShowMobile from './SlideShowMobile'
import IndexRiver from '../IndexRiver/IndexRiver'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import Auth_P from '../../components/Auth_P'
import AuthContext from '../../contexts/AuthContext'

function Index() {
  const { myAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  // 顯示登入提醒
  const [alertLogin, setAlertLogin] = useState(false)
  return (
    <>
      {/* 登入提醒 */}
      {alertLogin ? <Auth_P setAlertLogin={setAlertLogin} /> : <></>}
      <section id="a-mainslide">
        <div className="a-homeslide d-none d-lg-flex">
          <SlideShow />
        </div>
        <div className="a-homeslide d-flex d-lg-none">
          <SlideShowMobile />
        </div>
      </section>
      <section id="a-top_about">
        <div className="a-slide_img01"></div>
        <div className="a-slide_img02"></div>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h2>
            <img
              src="./svg/a-top_about_tit.png"
              alt="環境與人的永續共存，親子都能放心遨遊在無毒友善的大自然懷抱。"
              className="a-text-tit-img mb-3"
            />
          </h2>

          <div className="btn-area">
            <a
              href="#/"
              className="container buttonY font-B f-20 f-Brown sp-3 pt-md-4"
            >
              關於小農遊
            </a>
          </div>
        </div>
      </section>
      <section id="a-lesson">
        <h2 className="w-50 m-auto">
          <div className="d-flex justify-content-center m-auto align-items-center">
            <img src="./svg/titlefarm.png" alt="" className="a-titlefarm " />
            <img
              src="./svg/fatmergofarm.svg"
              alt=""
              className="a-fatmergofarm"
            />
            <img src="./svg/titlefarm2.png" alt="" className="a-titlefarm2" />
          </div>
        </h2>
        <div className="d-none d-lg-block">
          <LessonSlider />
        </div>
        <div className="d-block d-lg-none">
          <LessonSliderMB />
        </div>
      </section>
      <section
        id="a-products-news-mb"
        className="d-block d-lg-none mt-2 mt-lg-0"
      >
        <div className="m-auto">
          <div className="a-products-img">
            <img src="./svg/a-products-title.png" alt="" />
          </div>
          <div className="a-products-title font-L f-16 f-Brown sp-2">
            最新消息!生態農場所栽種的作物每次活動約可認識與接觸到十種以上小農作物。
          </div>
        </div>
        <div className="px-4">
          <Link to={'/Product?cate=2'}>
            <a className="a-products-mb my-5">
              <img
                src="./Buttons/a-products-vegetable.png"
                width="112px"
                height="127px"
                alt=""
              />
              <img
                src="./svg/indexProduct-M-V.png"
                width="186px"
                height="91px"
                alt=""
              />
            </a>
          </Link>
          <Link to={'/Product?cate=1'}>
            <a className="a-products-mb my-5">
              <img
                src="./svg/indexProduct-M-F.png"
                width="196px"
                height="117px"
                alt=""
              />
              <img
                src="./Buttons/a-products-fruit.png"
                width="112px"
                height="127px"
                alt=""
              />
            </a>
          </Link>
          <Link to={'/Product?cate=3'}>
            <a className="a-products-mb my-5">
              <img
                src="./Buttons/a-products-processed.png"
                width="112px"
                height="127px"
                alt=""
              />
              <img
                src="./svg/indexProduct-M-P.png"
                width="202px"
                height="93px"
                alt=""
              />
            </a>
          </Link>
        </div>
      </section>
      <IndexRiver />
      <section className="d-sm-none d-lg-block" id="a-products-news">
        <div className="a-products-img">
          <div className="a-products-title">
            <div className="a-products-title1">
              <img src="./svg/a-products-title.png" alt="" />
            </div>
            <div className="a-products-title2">
              <img src="./svg/a-products-title-img.png" alt="" />
              <span className="font-R f-24 f-Brown sp-2">
                最新消息!生態農場所栽種的作物約30~40種，每次活動約可認識與接觸到十種以上小農作物。
              </span>
            </div>
          </div>

          <Link to={'/Product?cate=2'}>
            <a href="#/" className="a-products-vegetable"></a>
          </Link>
          <Link to={'/Product?cate=1'}>
            <a href="#/" className="a-products-fruit"></a>
          </Link>
          <Link to={'/Product?cate=3'}>
            <a href="#/" className="a-products-processed"></a>
          </Link>
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault()
              if (myAuth.authorized) {
                navigate('/Rabbit')
              } else {
                setAlertLogin(true)
              }
            }}
          >
            <a href="#/" className="a-products-address"></a>
          </a>
        </div>
      </section>

      <section id="a-address">
        <div className="d-flex justify-content-evenly align-content-center m-auto">
          <div className="a-address-title">
            <img
              src="./svg/a-address-title.png"
              className="a-address-title-img"
              alt=""
            />
            <br />
            <p className="f-Brown f-20 font-R sp-1">
              313新竹縣尖石鄉嘉樂村2鄰70號
            </p>
            <p className="font-R f-20 f-Brown sp-2">
              小農遊在台灣四處踏查，拜訪農友，尋找台灣在地好糧好食好蔬果，搭起產地與餐桌的橋樑。
            </p>
            <div className="btn-area">
              <Link to={'/map'}>
                <a
                  href="#/"
                  className="container buttonY font-B fontmap f f-Brown sp-3 pt-2 text-center m-0 d-flex"
                >
                  小農友地圖
                </a>
              </Link>
            </div>
          </div>
          <div className="">
            <img
              src="./svg/a-address-map.png"
              className="a-address-map"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
