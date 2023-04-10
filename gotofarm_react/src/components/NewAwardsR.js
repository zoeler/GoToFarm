import React from 'react'
import { useEffect } from 'react'
import '../css/fireworks.css'
import Icon from '../icon/Icon'

function NewAwardsR(props) {
  const { myNewAward, setIsNew } = props
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.location.reload()
  //   }, 5000)
  //   return () => clearTimeout(timer)
  // }, [])
  return (
    <>
      <div className="R-Blur">
        <div className="d-flex justify-content-center w-100 h-100">
          <div className="R-New f-M">
            <div class="firework" id="firework1">
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
              <div class="explosion"></div>
            </div>
            <span className="f-24 f-Brown">獲得新勳章!</span>
            {myNewAward && (
              <div className="w-100 d-flex flex-column justify-content-center align-items-center px-5 gap-3">
                <Icon.Delete
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '90%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setIsNew(false)
                  }}
                />
                <div className="f-20 f-LightGreen">
                  {myNewAward.awards_name}
                </div>
                <div className="A-awards-circle-a">
                  <img
                    src={`http://localhost:3033/images/awards/${myNewAward.awards_img}-a.png`}
                    alt={myNewAward.awards_img}
                  />
                </div>
                <div className="f-18 f-Brown">
                  {myNewAward.awards_discription}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NewAwardsR
