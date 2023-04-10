import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { LESSON_DETAIL_DATA } from '../../components/api_config'
import { useParams } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css'
import '../../css/calendar.css'
import axios from 'axios'
import moment from 'moment'

function CalendarNew(props) {
  //日期
  const { date, setDate } = props
  // console.log(date)
  const newDate = new Date(date)
  const year = newDate.getFullYear().toString()
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  console.log(formattedDate)

  //取得資料
  const [data, setData] = useState({
    rows: [],
    lesson_date: '2023-01-01',
    uplimit1: '',
    uplimit2: '',
  })

  //人數限制
  // const [limit, setLimit] = useState(0)
  //報名人數
  const [count, setCount] = useState(null)

  const { sid } = useParams()

  const startDate = new Date(data.lesson_date.split(',')[0])
  const endDate = new Date(data.lesson_date.split(',')[1])

  const queryCount = (date) => {
    const countMap = {
      [moment(startDate).format('YYYY-MM-DD')]: data.uplimit1,
      [moment(endDate).format('YYYY-MM-DD')]: data.uplimit2,
    }
    const dateString = moment(date).format('YYYY-MM-DD')
    return countMap[dateString] || 0
  }

  const handleDateClick = (value) => {
    const count = queryCount(value)
    setCount(count)
  }

  const getListData = async (sid) => {
    // console.log('111', formattedDate)
    const res = await axios.get(`${LESSON_DETAIL_DATA}/${sid}`)
    // console.log(formattedDate)
    setData(res.data)
    console.log('r', res.data)
    // setLimit(res.data.limit[0].lesson_uplimit)
    // console.log(res.data.limit[0].lesson_uplimit)
  }

  useEffect(() => {
    getListData(sid)
  }, [sid])

  return (
    <>
      <div>
        <h2 className="f-Brown f-24">選擇日期</h2>
        <Calendar
          onChange={setDate}
          value={date}
          maxDate={endDate}
          minDate={startDate}
          className="f-Brown font-M f-16"
          onClickDay={handleDateClick}
        />
        {count !== null && <div>{`當天已報名人數：${count}`}人</div>}
      </div>
    </>
  )
}

export default CalendarNew
