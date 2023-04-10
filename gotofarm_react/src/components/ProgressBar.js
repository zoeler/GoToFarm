import React, { useState, useEffect } from 'react'

const ProgressBar = (props) => {
  const { myLevel } = props
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < myLevel) {
        setProgress(progress + 1)
      }
    }, 15)
    return () => clearInterval(interval)
  }, [progress, myLevel])

  const Left = [9, 29, 49, 79]
  const backgroundColor = Left.map((l) => {
    return myLevel >= l ? ' #eac645' : 'rgb(237, 237, 237)'
  })
  console.log('backgroundColor', backgroundColor)

  return (
    <div className="A-level-bar">
      <div className="A-level-group">
        <div
          className="A-level-circle-1"
          style={{ left: '9%', backgroundColor: backgroundColor[0] }}
        ></div>
        <div
          className="A-level-circle-2"
          style={{ left: '29%', backgroundColor: backgroundColor[1] }}
        ></div>
        <div
          className="A-level-circle-3"
          style={{ left: '49%', backgroundColor: backgroundColor[2] }}
        ></div>
        <div
          className="A-level-circle-4"
          style={{ left: '79%', backgroundColor: backgroundColor[3] }}
        ></div>
      </div>

      <div style={{ width: `${progress}%`, height: '20px' }}>
        <div className="A-level"></div>
        <span className="A-level-text" style={{ left: `${progress - 3}%` }}>
          {progress}
          <br />
          Level
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
