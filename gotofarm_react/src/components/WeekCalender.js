import React from 'react'
import moment from 'moment'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/week.css'
import 'moment/locale/zh-tw'
import { MY_WEEK_C } from '../components/api_config'

function WeekCalendar() {
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'))

  // 上一周
  const prevWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, 'week'))
  }

  // 下一周
  const nextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, 'week'))
  }

  // 獲取當前周的日期範圍
  const startOfWeek = currentWeek.clone().startOf('week')
  const endOfWeek = currentWeek.clone().endOf('week')

  // 創建日期列表
  const days = []
  let day = startOfWeek

  while (day <= endOfWeek) {
    days.push(day)
    day = day.clone().add(1, 'd')
  }

  // 設置中文語言
  moment.locale('zh-cn')

  //取得會員課程時間

  //抓取資料庫優惠卷
  const [lessonDate, setLessonDate] = useState([])
  useEffect(() => {
    getListData()

    return () => {}
  }, [])

  const myAuth = JSON.parse(localStorage.getItem('myAuth'))
  const getListData = async () => {
    axios
      .post(
        MY_WEEK_C,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        // 在此處處理回應
        setLessonDate(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        // 在此處處理錯誤
        console.error(error)
      })
  }

  // 渲染周歷
  return (
    <div className="W-Container">
      <div className="W-week">
        <div className="W-Navigation d-flex gap-4 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="f-B f-Brown">上一周</span>
            <button className="W-Pr" onClick={prevWeek}></button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="W-Next" onClick={nextWeek}></button>
            <span className="f-B f-Brown">下一周</span>
          </div>
        </div>
        <table className="w-100 px-3 my-3">
          <thead>
            <tr className="text-center h-100 f-Brown f-B">
              {days.map((day) => (
                <th className="W-day" key={day.format('dddd, MMMM Do YYYY')}>
                  {day.format('M/D')}
                  <br></br>
                  {day.format('dddd')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-100">
            <tr className="text-center">
              {days.map((day) => {
                const lessondate =
                  lessonDate && lessonDate.length
                    ? lessonDate.find((o) =>
                        moment(o.lesson_date).isSame(day, 'day')
                      )
                    : null

                // 設置td樣式和內容
                // const tdStyle = lessondate ? { backgroundColor: 'yellow' } : {}
                const tdContent = lessondate ? lessondate.lesson_name : ''
                const hue = Math.floor(Math.random() * 60 + 5)
                const bkStyle = { filter: 'hue-rotate(' + hue + 'deg)' }

                return (
                  <td className="W-class" key={day.format('YYYY-MM-DD')}>
                    <div
                      className={
                        lessondate ? 'W-hasclass f-Brown f-B' : 'f-Brown f-B'
                      }
                      style={bkStyle}
                    >
                      {tdContent}
                    </div>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WeekCalendar
