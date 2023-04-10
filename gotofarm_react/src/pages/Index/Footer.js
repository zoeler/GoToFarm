import React from 'react'
import '../../css/main.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
      <section id="Footer">
        <div className="footer-card">
          <div className="d-flex justify-content-center">
            <img
              src="./../../Icons/littlefarmLOGO.png"
              className="footer-logoimg "
              alt=""
            />
          </div>
          <p className="text-center f-Brown f-16 font-R sp-1">
            <img src="./../../Icons/IconPhone.svg" alt="" className="me-1" />
            0921-222-222
          </p>
          <p className="text-center f-Brown f-16 font-R sp-1">
            313新竹縣尖石鄉嘉樂村2鄰70號
          </p>
          <div className="d-flex justify-content-evenly mt-4 mt-md-2">
            <Link to={'/Product?cate=2'}>
              <div className="button-footer ">
                <img
                  src="./../../Icons/icon-cart1.svg"
                  alt=""
                  className="icons justify-content-center align-content-center footer-cart mt-2
                        "
                ></img>
              </div>
            </Link>
            <a href="#/" className="">
              <div className="button-footer">
                <img
                  src="./../../Icons/Icon-ig.svg"
                  alt=""
                  className="justify-content-center align-content-center footer-ig mt-2
                        "
                ></img>
              </div>
            </a>
            <a href="#/" className="">
              <div className="button-footer d-flex justify-content-center">
                <img
                  src="./../../Icons/Icon-FB.svg"
                  alt=""
                  className="justify-content-center align-content-center footer-fb mt-2
                        "
                  width="23px"
                  height="40px"
                />
              </div>
            </a>
          </div>
        </div>
        <div className="footer-img d-sm-none d-md-block">
          <img src="./../../Icons/footer3.svg" alt="" className="float-start" />
          <img src="./../../Icons/footer2.svg" alt="" className="float-end" />
        </div>
      </section>
    </>
  )
}

export default Footer
