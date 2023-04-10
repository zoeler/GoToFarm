import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function IsLogOut() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="buttom-logout">
        <a
          href="#/"
          className="position-relative"
          id="toggleMember"
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          }}
        >
          <div className="button-member d-flex">
            <img
              src="./../../Icons/icon-member-slender.svg"
              style={{ width: '17px', height: '20px' }}
              alt=""
              className=""
            />
          </div>
        </a>
        <div className='memeber-active-bg'>
        <ul
          className={
            isOpen
              ? 'd-flex memeber-status-login flex-column flex-md-row justify-content-evenly ps-sm-2 ps-md-0  memberList'
              : 'd-flex memeber-status-login flex-column flex-md-row justify-content-evenly ps-sm-2 ps-md-0 '
          }
          id="memberList"
        >
          <Link to={`/Login`} className="">
            <li className="font-B memeber-login f-Gray">登入</li>
          </Link>
        </ul>
        </div>
      </div>
    </>
  )
}

export default IsLogOut
