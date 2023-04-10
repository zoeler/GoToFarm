import React, { useState, useEffect } from 'react'

const DateSelector = (props) => {
  const [yearList, setYearList] = useState(null)
  const [monthList, setMonthList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ])
  const [dayList, setDayList] = useState(null)

  const {
    selectYear,
    setSelectYear,
    selectMonth,
    setSelectMonth,
    selectDay,
    setSelectDay,
  } = props

  useEffect(() => {
    const dataInit = () => {
      const date = new Date()
      const current_year = date.getFullYear()
      const yearList = []
      const dayList = []
      for (let i = 0; i < 100; i++) {
        const y = current_year - i
        yearList.push(y)
      }
      for (let k = 1; k < 32; k++) {
        dayList.push(k)
      }
      setYearList(yearList)
      setDayList(dayList)
    }
    dataInit()
  }, [])

  const yearChange = (e) => {
    const year = e.target.value
    if (!year) return
    setSelectYear(year)
    setSelectMonth(1)
    setSelectDay(1)

    if (props.onChange) {
      props.onChange(new Date(`${year}/1/1 00:00:00`))
    }
  }

  const monthChange = (e) => {
    let month = e.target.value
    if (!month) return
    month = parseInt(month, 10)
    const d = new Date(selectYear, month, 0)
    const dayNum = d.getDate()
    const dayList = []
    for (let k = 0; k < dayNum; k++) {
      dayList.push(k + 1)
    }
    setSelectMonth(month)
    setSelectDay(1)
    setDayList(dayList)

    if (props.onChange) {
      props.onChange(new Date(`${selectYear}/${month}/1 00:00:00`))
    }
  }

  const dayChange = (e) => {
    const day = e.target.value
    if (!day) return
    setSelectDay(day)

    if (props.onChange) {
      props.onChange(new Date(`${selectYear}-${selectMonth}-${day}`))
    }
  }

  return (
    <div class="select-box d-flex gap-3">
      <span class="item">
        <select
          onChange={yearChange}
          className="select-main sing-up-input s-w"
          value={selectYear}
          name="member_year"
        >
          <option className="li-item text-center">年</option>
          {yearList
            ? yearList.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  className="li-item"
                  name="member_year"
                >
                  {item}年
                </option>
              ))
            : ''}
        </select>
      </span>
      <span>
        <select
          id="select-month"
          onChange={monthChange}
          name="member_month"
          className="select-main sing-up-input s-w"
          value={selectMonth}
        >
          <option className="li-item text-cente">月</option>
          {monthList
            ? monthList.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  className="li-item"
                  name="member_month"
                >
                  {item}月
                </option>
              ))
            : ''}
        </select>
      </span>
      <span class="item">
        <select
          id="select-day"
          onChange={dayChange}
          name="member_day"
          className="select-main sing-up-input s-w"
          value={selectDay}
        >
          <option className="li-item text-cente">日</option>

          {dayList
            ? dayList.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  className="li-item"
                  name="member_day"
                >
                  {item}日
                </option>
              ))
            : ''}
        </select>
      </span>
    </div>
  )
}

export default DateSelector
