import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import IsLogIn from './IsLogIn'
import IsLogOut from './IsLogOut'
import CartIcon from '../ShoppingCart/CartIcon'
import '../../css/main.css'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import Index from './Index'

function Navbar() {
  const { myAuth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <div
        className={
          location.pathname === '/Login' ||
          location.pathname === '/login' ||
          location.pathname === '/register' ||
            location.pathname === '/Register' ||
            location.pathname === '/Checked'
            ? 'mb-md-5 mb-2 pb-3 nav-nobg'
            : 'mb-md-5 mb-2 pb-3 nav-bg'
        }
      >
        <header>
          <div className="row p-0 m-0">
            <Link
              className="nav-link d-flex  position-absolute justify-content-evenly"
              aria-current="page"
              to="/"
            >
              <img
                src="./../../Icons/littlefarmLOGO.png"
                className="nav-mb-logoimg"
                width="97.5px"
                alt=""
              />
            </Link>
          </div>
          <div className="row">
            <div className="d-flex  position-absolute justify-content-end mt-4 p-0 nav-title-button gap-3">
              <Link to="/cart" className="me-3">
                <div className="button-cart container">
                  <CartIcon />
                </div>
              </Link>
              {myAuth.authorized ? <IsLogIn /> : <IsLogOut />}
            </div>
          </div>
          <nav className="navbar navbar-expand-md d-flex">
            <div className="hamburger-buttom-mb">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar2"
                aria-controls="offcanvasNavbar2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="offcanvas offcanvas-start align-items-center listcolor"
                tabIndex="-1"
                id="offcanvasNavbar2"
                aria-labelledby="offcanvasNavbarLabel"
                style={{ width: '200px' }}
              >
                <ul className="navbar-nav navbar-hamburger me-auto mb-2 mb-md-0 mt-md-5 m-md-auto position-absolute d-flex justify-content-center">
                  <div className="w-70 offcanvas-header align-items-baseline pb-0">
                    <h5 className="font-R f-Yellow index100">小農遊</h5>
                    <button
                      type="button"
                      className="btn-close text-reset index100"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <li
                    className="nav-item menu_li  mx-md-1 
                    "
                  >
                    {/* 商城 */}
                    <Link className="nav-link" to="/product">
                      <div className="menu_icon has_hidden_icon">
                        <img src="./../../Icons/IconProduct.png" alt="" />
                      </div>
                      <span className="font-B">
                        小農商城
                        <svg
                          width="70"
                          height="3"
                          viewBox="0 0 70 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M69.1026 2.5H65.5128C65.0103 2.5 64.6154 2.06 64.6154 1.5C64.6154 0.94 65.0103 0.5 65.5128 0.5H69.1026C69.6051 0.5 70 0.94 70 1.5C70 2.06 69.6051 2.5 69.1026 2.5ZM58.3333 2.5H54.7436C54.241 2.5 53.8462 2.06 53.8462 1.5C53.8462 0.94 54.241 0.5 54.7436 0.5H58.3333C58.8359 0.5 59.2308 0.94 59.2308 1.5C59.2308 2.06 58.8359 2.5 58.3333 2.5ZM47.5641 2.5H43.9744C43.4718 2.5 43.0769 2.06 43.0769 1.5C43.0769 0.94 43.4718 0.5 43.9744 0.5H47.5641C48.0667 0.5 48.4615 0.94 48.4615 1.5C48.4615 2.06 48.0667 2.5 47.5641 2.5ZM36.7949 2.5H33.2051C32.7026 2.5 32.3077 2.06 32.3077 1.5C32.3077 0.94 32.7026 0.5 33.2051 0.5H36.7949C37.2974 0.5 37.6923 0.94 37.6923 1.5C37.6923 2.06 37.2974 2.5 36.7949 2.5ZM26.0256 2.5H22.4359C21.9333 2.5 21.5385 2.06 21.5385 1.5C21.5385 0.94 21.9333 0.5 22.4359 0.5H26.0256C26.5282 0.5 26.9231 0.94 26.9231 1.5C26.9231 2.06 26.5282 2.5 26.0256 2.5ZM15.2564 2.5H11.6667C11.1641 2.5 10.7692 2.06 10.7692 1.5C10.7692 0.94 11.1641 0.5 11.6667 0.5H15.2564C15.759 0.5 16.1538 0.94 16.1538 1.5C16.1538 2.06 15.759 2.5 15.2564 2.5ZM4.48718 2.5H0.897436C0.394872 2.5 0 2.06 0 1.5C0 0.94 0.394872 0.5 0.897436 0.5H4.48718C4.98974 0.5 5.38462 0.94 5.38462 1.5C5.38462 2.06 4.98974 2.5 4.48718 2.5Z"
                            fill="#37797C"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu_li mx-md-1 ">
                    {/* 教室 */}
                    <Link className="nav-link" to="/lesson">
                      <div className="menu_icon has_hidden_icon">
                        <img src="./../../Icons/IconClass.png" alt="" />
                      </div>
                      <span className="font-B">
                        小農教室
                        <br />
                        <svg
                          width="70"
                          height="3"
                          viewBox="0 0 70 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M69.1026 2.5H65.5128C65.0103 2.5 64.6154 2.06 64.6154 1.5C64.6154 0.94 65.0103 0.5 65.5128 0.5H69.1026C69.6051 0.5 70 0.94 70 1.5C70 2.06 69.6051 2.5 69.1026 2.5ZM58.3333 2.5H54.7436C54.241 2.5 53.8462 2.06 53.8462 1.5C53.8462 0.94 54.241 0.5 54.7436 0.5H58.3333C58.8359 0.5 59.2308 0.94 59.2308 1.5C59.2308 2.06 58.8359 2.5 58.3333 2.5ZM47.5641 2.5H43.9744C43.4718 2.5 43.0769 2.06 43.0769 1.5C43.0769 0.94 43.4718 0.5 43.9744 0.5H47.5641C48.0667 0.5 48.4615 0.94 48.4615 1.5C48.4615 2.06 48.0667 2.5 47.5641 2.5ZM36.7949 2.5H33.2051C32.7026 2.5 32.3077 2.06 32.3077 1.5C32.3077 0.94 32.7026 0.5 33.2051 0.5H36.7949C37.2974 0.5 37.6923 0.94 37.6923 1.5C37.6923 2.06 37.2974 2.5 36.7949 2.5ZM26.0256 2.5H22.4359C21.9333 2.5 21.5385 2.06 21.5385 1.5C21.5385 0.94 21.9333 0.5 22.4359 0.5H26.0256C26.5282 0.5 26.9231 0.94 26.9231 1.5C26.9231 2.06 26.5282 2.5 26.0256 2.5ZM15.2564 2.5H11.6667C11.1641 2.5 10.7692 2.06 10.7692 1.5C10.7692 0.94 11.1641 0.5 11.6667 0.5H15.2564C15.759 0.5 16.1538 0.94 16.1538 1.5C16.1538 2.06 15.759 2.5 15.2564 2.5ZM4.48718 2.5H0.897436C0.394872 2.5 0 2.06 0 1.5C0 0.94 0.394872 0.5 0.897436 0.5H4.48718C4.98974 0.5 5.38462 0.94 5.38462 1.5C5.38462 2.06 4.98974 2.5 4.48718 2.5Z"
                            fill="#37797C"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu_li mx-md-1 navbar-logo">
                    <Link
                      className="nav-link navbar-logo"
                      aria-current="page"
                      to="/"
                    >
                      <img
                        src={
                          location.pathname === '/Login' ||
                          location.pathname === '/login' ||
                          location.pathname === '/register' ||
                            location.pathname === '/Register' ||
                            location.pathname === '/Checked'
                            ? './../../Icons/GoToFarmLOGO-sm.png'
                            : './../../Icons/littlefarmLOGO.png'
                        }
                        className={
                          location.pathname === '/Login' ||
                          location.pathname === '/login' ||
                          location.pathname === '/register' ||
                            location.pathname === '/Register' ||
                            location.pathname === '/Checked'
                            ? 'nav-sm-logoimg'
                            : 'nav-logoimg'
                        }
                        alt=""
                      />
                    </Link>
                  </li>
                  <li className="nav-item menu_li mx-md-1">
                    <Link className="nav-link" to="/Community">
                      <div className="menu_icon has_hidden_icon">
                        <img src="./../../Icons/IconNews.png" alt="" />
                      </div>
                      <span className="font-B">
                        小農部落
                        <svg
                          width="70"
                          height="3"
                          viewBox="0 0 70 3"
                          fill="none"
                          className=""
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M69.1026 2.5H65.5128C65.0103 2.5 64.6154 2.06 64.6154 1.5C64.6154 0.94 65.0103 0.5 65.5128 0.5H69.1026C69.6051 0.5 70 0.94 70 1.5C70 2.06 69.6051 2.5 69.1026 2.5ZM58.3333 2.5H54.7436C54.241 2.5 53.8462 2.06 53.8462 1.5C53.8462 0.94 54.241 0.5 54.7436 0.5H58.3333C58.8359 0.5 59.2308 0.94 59.2308 1.5C59.2308 2.06 58.8359 2.5 58.3333 2.5ZM47.5641 2.5H43.9744C43.4718 2.5 43.0769 2.06 43.0769 1.5C43.0769 0.94 43.4718 0.5 43.9744 0.5H47.5641C48.0667 0.5 48.4615 0.94 48.4615 1.5C48.4615 2.06 48.0667 2.5 47.5641 2.5ZM36.7949 2.5H33.2051C32.7026 2.5 32.3077 2.06 32.3077 1.5C32.3077 0.94 32.7026 0.5 33.2051 0.5H36.7949C37.2974 0.5 37.6923 0.94 37.6923 1.5C37.6923 2.06 37.2974 2.5 36.7949 2.5ZM26.0256 2.5H22.4359C21.9333 2.5 21.5385 2.06 21.5385 1.5C21.5385 0.94 21.9333 0.5 22.4359 0.5H26.0256C26.5282 0.5 26.9231 0.94 26.9231 1.5C26.9231 2.06 26.5282 2.5 26.0256 2.5ZM15.2564 2.5H11.6667C11.1641 2.5 10.7692 2.06 10.7692 1.5C10.7692 0.94 11.1641 0.5 11.6667 0.5H15.2564C15.759 0.5 16.1538 0.94 16.1538 1.5C16.1538 2.06 15.759 2.5 15.2564 2.5ZM4.48718 2.5H0.897436C0.394872 2.5 0 2.06 0 1.5C0 0.94 0.394872 0.5 0.897436 0.5H4.48718C4.98974 0.5 5.38462 0.94 5.38462 1.5C5.38462 2.06 4.98974 2.5 4.48718 2.5Z"
                            fill="#37797C"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu_li mx-md-1">
                    <Link
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/map')
                        window.scrollTo(0, 2800)
                      }}
                    >
                      <div className="menu_icon has_hidden_icon">
                        <img src="./../../Icons/IconMember.png" alt="" />
                      </div>
                      <span className="font-B">
                        小農地圖
                        <svg
                          width=" 70"
                          height="3"
                          viewBox="0 0 70 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M69.1026 2.5H65.5128C65.0103 2.5 64.6154 2.06 64.6154 1.5C64.6154 0.94 65.0103 0.5 65.5128 0.5H69.1026C69.6051 0.5 70 0.94 70 1.5C70 2.06 69.6051 2.5 69.1026 2.5ZM58.3333 2.5H54.7436C54.241 2.5 53.8462 2.06 53.8462 1.5C53.8462 0.94 54.241 0.5 54.7436 0.5H58.3333C58.8359 0.5 59.2308 0.94 59.2308 1.5C59.2308 2.06 58.8359 2.5 58.3333 2.5ZM47.5641 2.5H43.9744C43.4718 2.5 43.0769 2.06 43.0769 1.5C43.0769 0.94 43.4718 0.5 43.9744 0.5H47.5641C48.0667 0.5 48.4615 0.94 48.4615 1.5C48.4615 2.06 48.0667 2.5 47.5641 2.5ZM36.7949 2.5H33.2051C32.7026 2.5 32.3077 2.06 32.3077 1.5C32.3077 0.94 32.7026 0.5 33.2051 0.5H36.7949C37.2974 0.5 37.6923 0.94 37.6923 1.5C37.6923 2.06 37.2974 2.5 36.7949 2.5ZM26.0256 2.5H22.4359C21.9333 2.5 21.5385 2.06 21.5385 1.5C21.5385 0.94 21.9333 0.5 22.4359 0.5H26.0256C26.5282 0.5 26.9231 0.94 26.9231 1.5C26.9231 2.06 26.5282 2.5 26.0256 2.5ZM15.2564 2.5H11.6667C11.1641 2.5 10.7692 2.06 10.7692 1.5C10.7692 0.94 11.1641 0.5 11.6667 0.5H15.2564C15.759 0.5 16.1538 0.94 16.1538 1.5C16.1538 2.06 15.759 2.5 15.2564 2.5ZM4.48718 2.5H0.897436C0.394872 2.5 0 2.06 0 1.5C0 0.94 0.394872 0.5 0.897436 0.5H4.48718C4.98974 0.5 5.38462 0.94 5.38462 1.5C5.38462 2.06 4.98974 2.5 4.48718 2.5Z"
                            fill="#37797C"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Navbar
