import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { HOST } from '../../components/api_config'
import axios from 'axios'

function IsLogIn() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { myAuth, logout } = useContext(AuthContext)
  const [myImg, setMyImg] = useState('')
  console.log('change', myImg)

  useEffect(() => {
    handleImg()
    return () => {
      console.log('unmount')
    }
  }, [])

  const handleImg = () => {
    const myAuth = JSON.parse(localStorage.getItem('myAuth'))
    axios
      .post(`${HOST}/memberImg/myImg`, {
        headers: {
          Authorization: 'Bearer ' + myAuth.token,
        },
        myAuth: myAuth,
      })
      .then((response) => {
        setMyImg(response.data.member_img)
        console.log('Imgformdata', response.data.member_img)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <>
      <div className="">
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
            {myImg && (
              <img src={`${HOST}/images/avatar/${myImg}`} alt="{myImg}" />
            )}
          </div>
        </a>
        <div className="memeber-active-bg">
          <ul
            className={
              isOpen
                ? 'd-flex memeber-status flex-column flex-md-row justify-content-evenly ps-sm-2 ps-md-0 memberList'
                : 'd-flex memeber-status flex-column flex-md-row justify-content-evenly ps-sm-2 ps-md-0'
            }
            id="memberList"
          >
            <Link to={`/MyMember`} className="mt-md-0 mt-2">
              <li className="col-4 mt-2 icon-member"></li>
            </Link>

            <Link to={`/MyMember/MyBookmark`}>
              <li className="col-4 mt-2  icon-heart"></li>
            </Link>
            <a
              className=""
              href="#/"
              onClick={(e) => {
                e.preventDefault()
                logout()
                navigate('/')
              }}
            >
              <li className="col-4 mt-2 icon-logout"></li>
            </a>
          </ul>
        </div>
      </div>
    </>
  )
}

export default IsLogIn
