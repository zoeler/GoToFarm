import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Orderby({
  myOrder,
  setMyOrder,
  myQuery,
  setMyQuery,
  setSidepop,
  data,
  setData,
}) {
  const navigate = useNavigate()
  // 排序用(前端排序，暫時放棄)
  // const [sortType, setSortType] = useState('')
  // const sortByType = (arr, type) => {
  //   switch (type) {
  //     case 'asc': //排序-小到大
  //       return [...arr].sort((a, b) => a.comment_value - b.comment_value)
  //     case 'desc': //排序-大到小
  //     default:
  //       return [...arr].sort((a, b) => b.comment_value - a.comment_value)
  //   }
  // }
  // useEffect(() => {
  //   let newRows = sortByType(data.newRowsC, sortType)
  //   setData({ ...data, newRowsC: newRows })
  // }, [sortType])

  return (
    <>
      {' '}
      <div className="P-product-btn container d-flex justify-content-end align-items-center gap-3 mt-3 font-M">
        <button
          className="d-md-none"
          onClick={() => {
            setSidepop(true)
          }}
        >
          分類選單
        </button>
        <button
          className={`ms-auto ${myOrder.length > 0 ? 'active' : ''}`}
          onClick={() => {
            if (myOrder.length === 0) {
              setMyOrder([...myOrder, 'desc'])
              const newQuery = { ...myQuery, orderprice: 'desc' }
              setMyQuery(newQuery)
              navigate(`?${new URLSearchParams(newQuery).toString()}`)
            }
            if (myOrder[0] === 'desc') {
              const newOrder = ['asc']
              setMyOrder(newOrder)
              const newQuery = { ...myQuery, orderprice: 'asc' }
              setMyQuery(newQuery)
              navigate(`?${new URLSearchParams(newQuery).toString()}`)
            } else {
              const newOrder = ['desc']
              setMyOrder(newOrder)
              const newQuery = { ...myQuery, orderprice: 'desc' }
              setMyQuery(newQuery)
              navigate(`?${new URLSearchParams(newQuery).toString()}`)
            }
          }}
        >
          價格排序
          <i
            className={`fa-solid  ms-2 ${
              myOrder[0] === 'asc' ? 'fa-caret-up' : 'fa-caret-down'
            }`}
          ></i>
        </button>
        {/* <button
          onClick={() => {
            if (sortType === '') {
              setSortType('desc')
            } else if (sortType === 'asc') {
              setSortType('desc')
            } else {
              setSortType('asc')
            }
          }}
        >
          評分排序
          <i
            className={`fa-solid  ms-2 ${
              sortType === 'asc' ? 'fa-caret-up' : 'fa-caret-down'
            }`}
          ></i>
        </button> */}
      </div>
    </>
  )
}

export default Orderby
