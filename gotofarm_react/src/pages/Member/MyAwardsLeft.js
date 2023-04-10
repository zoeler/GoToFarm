import React from 'react'
import '../../css/awards.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { HOST } from '../../components/api_config'
import ProgressBar from '../../components/ProgressBar'
import { useNavigate } from 'react-router-dom'
import NewAwards from '../../components/NewAwards'

function MyAwardsLeft() {
  const navigate = useNavigate()

  const myAuth = JSON.parse(localStorage.getItem('myAuth'))
  const [render, setRender] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [myNewAward, setMyNewAward] = useState({})
  useEffect(() => {
    getAwards()
  }, [isNew])

  useEffect(() => {
    // 設定功能
    console.log('useEffect--')
    newAwards()
    return () => {
      // 解除功能
      console.log('unmount AbList--')
    }
  }, [])

  //取得勳章資料
  const [myAwards, setMyAwards] = useState([])
  const [allAwards, setAllAwards] = useState([])
  const [myLevel, setMyLevel] = useState([])
  console.log(myAwards)
  const getAwards = () => {
    axios
      .post(
        `${HOST}/awards`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        setMyAwards(response.data.myawards)
        setAllAwards(response.data.allaward)
        setMyLevel(response.data.mylevel)
        console.log('all', response.data)
        // console.log(response.data.result_awards)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const newAwards = () => {
    axios
      .post(
        `${HOST}/newawards`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        setIsNew(response.data.MyNew)
        console.log(response.data.MyNew) // 印出 true 或 false
        setMyNewAward(response.data.result)
        console.log(response.data.result) // 印出 true 或 false
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      {isNew && (
        <NewAwards
          isNew={isNew}
          myNewAward={myNewAward}
          setIsNew={setIsNew}
        ></NewAwards>
      )}
      <div className="w-100 d-flex">
        <div
          onClick={() => {
            navigate('/MyMember')
          }}
        >
          <button className="M-back"></button>
        </div>
      </div>
      <div className="w-100 p-sm-3 p-lg-5 f-B m-2">
        <div className="A-title">
          <div className="M-Icon-band"></div>
          <span className="f-20 f-Brown">小農等級</span>
          <div className="M-Icon-band"></div>
        </div>
        <div className="A-myLevel">
          <div className="w-100">
            <ProgressBar myLevel={myLevel.level}></ProgressBar>
          </div>
        </div>
      </div>
      <div className="w-100 p-sm-3 p-lg-5 f-B mb-5">
        <div className="A-title">
          <div className="M-Icon-band"></div>
          <span className="f-20 f-Brown">小農勳章</span>
          <div className="M-Icon-band"></div>
        </div>
        <div className="w-100 d-flex flex-wrap gap-3 justify-content-center mt-3 px-5 pb-5">
          {allAwards
            .filter((a) => {
              const selectedAward = myAwards.find((m) => m.sid === a.sid)
              return selectedAward
            })
            .map((a) => {
              const imgSrc = `http://localhost:3033/images/awards/${a.awards_img}-a.png`
              return (
                <div
                  className="d-flex flex-column justify-content-center align-items-center gap-2"
                  key={a.sid}
                >
                  <div
                    className="A-awards-circle-a A-hovertext"
                    data-hover={a.awards_discription}
                  >
                    <img src={imgSrc} alt={a.awards_img} />
                  </div>
                  <span className="f-B f-Khaki sp-1">{a.awards_name}</span>
                </div>
              )
            })}
          {allAwards
            .filter((a) => {
              const selectedAward = myAwards.find((m) => m.sid === a.sid)
              return !selectedAward
            })
            .map((a) => {
              const imgSrc = `http://localhost:3033/images/awards/${a.awards_img}.png`
              return (
                <div
                  className="d-flex flex-column justify-content-center align-items-center gap-2"
                  key={a.sid}
                >
                  <div
                    className="A-awards-circle A-hovertext"
                    data-hover={a.awards_discription}
                  >
                    <img src={imgSrc} alt={a.awards_img} />
                  </div>
                  <span className="f-B f-Gray sp-1">{a.awards_name}</span>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default MyAwardsLeft
