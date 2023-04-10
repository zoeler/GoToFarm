import React from 'react'
import { useState, useEffect } from 'react'
import { MY_ORDER, HOST } from '../../components/api_config'
import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  ListMotionContainer,
  ListMotionItem,
} from '../../components/ListMotion'

//格式化時間
// 定義要轉換的日期時間字符串
const formatDateTime = (isoDateTimeString) => {
  // 使用Date物件解析ISO日期時間字符串
  var date = new Date(isoDateTimeString)

  // 定義日期和時間的格式
  var dateFormat = 'yyyy/MM/dd'
  var timeFormat = 'HH:mm:ss'

  // 使用Date物件的方法格式化日期和時間
  var formattedDate = formatDate(date, dateFormat)
  var formattedTime = formatTime(date, timeFormat)

  // 將日期和時間組合為所需的輸出格式
  var output = formattedDate + ' ' + formattedTime
  console.log(output)
  return output
}

// 格式化日期的函數
const formatDate = (date, format) => {
  var year = date.getFullYear()
  var month = padZero(date.getMonth() + 1)
  var day = padZero(date.getDate())
  format = format.replace('yyyy', year)
  format = format.replace('MM', month)
  format = format.replace('dd', day)
  return format
}

// 格式化時間的函數
const formatTime = (date, format) => {
  var hours = padZero(date.getHours())
  var minutes = padZero(date.getMinutes())
  var seconds = padZero(date.getSeconds())
  format = format.replace('HH', hours)
  format = format.replace('mm', minutes)
  format = format.replace('ss', seconds)
  return format
}

// 在單位數字前面添加0的函數
const padZero = (num) => {
  return num < 10 ? '0' + num : num
}

function MyOrderLeft(props) {
  const [orderList, setOrderList] = useState([])
  const myAuth = JSON.parse(localStorage.getItem('myAuth'))
  useEffect(() => {
    // 設定功能
    console.log('useEffect--')
    getOrderListData()

    return () => {
      // 解除功能
      console.log('unmount AbList--')
    }
  }, [])
  const getOrderListData = async () => {
    axios
      .post(
        MY_ORDER,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + myAuth.token,
          },
        }
      )
      .then((response) => {
        // 在此處處理回應
        setOrderList(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        // 在此處處理錯誤
        console.error(error)
      })
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = orderList.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <>
      <div className="w-100 ps-3 pb-2">
        <Link to="/MyMember">
          <button className="M-back"></button>
        </Link>
      </div>
      <div
        className="C-Order-t backgound-w w-100 rounded-20 shadow-1 p-sm-3 p-lg-5 f-B"
        data-count={orderList.length}
      >
        <div className="C-title px-1 mt-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="C-title-1">
              <span className="f-16 f-Gray sp-1">訂單編號</span>
            </div>
            <div className="d-flex flex-row gap-1 gap-lg-4 ps-md-5">
              <div className="C-title-2">
                <span className="f-16 f-Gray sp-1">付款狀態</span>
              </div>
              <div className="C-title-2">
                <span className="f-16 f-Gray sp-1">出貨狀態</span>
              </div>
              <div className="C-title-2">
                <span className="f-16 f-Gray sp-1">支付金額</span>
              </div>
              <div className="C-title-2">
                <span className="f-16 f-Gray sp-1">成立日期</span>
              </div>
            </div>
          </div>
          <div className="M-underline mt-2"></div>
        </div>
        {orderList.length ? (
          ''
        ) : (
          <div className="MB-notfound font-M mt-5">
            <p className="">沒有訂單唷</p>
            <Link to={`/product`}>
              <img src="./../../Images/findProduct.png" alt="" width={250} />
            </Link>
          </div>
        )}
        <ListMotionContainer element="div" className="row ">
          {currentItems.map((o) => {
            return (
              <>
                <ListMotionItem key={o.sid} element="div" noShift>
                  <div className="M-Item py-3 px-1" key={o.order_uuid}>
                    <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                      <Link to={`/MyMember/MyOrder/${o.order_uuid}`}>
                        <div className="C-Item-1 d-flex flex-row align-items-center gap-lg-1 gap-1">
                          <div className="C-productimg">
                            {o.order_imgP !== '' ? (
                              <img
                                src={`http://localhost:3033/images/product/${o.order_imgP}`}
                                className="img-fluid rounded-20"
                                alt="Cotton T-shirt"
                              />
                            ) : (
                              <img
                                src={`http://localhost:3033/images/lesson/${o.order_imgL}`}
                                className="img-fluid rounded-20"
                                alt="Cotton T-shirt"
                              />
                            )}
                          </div>
                          <div>
                            <p className="f-20 fw-normal mb-1 f-Brown C-text-limit f-M">
                              {o.order_id}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="C-Order-2 d-flex flex-row gap-1 gap-md-2 gap-lg-4 align-items-center">
                        <div className="C-O-pay text-center f-LightGreen">
                          {o.order_paid === 0 ? '已付款' : '未付款'}
                        </div>
                        <div className="C-O-send text-center f-Gray">
                          {o.order_sended === 3 ? '未出貨' : '配送中'}
                        </div>
                        <div className="text-center C-O-price">
                          <span className="f-16 sp-1 f-DarkGreen">
                            {o.sumprice}
                          </span>
                          <span className="f-Gray f-13">NTD</span>
                        </div>
                        <div className="f-13 f-Gray C-wrap-text f-M text-end">
                          {formatDateTime(o.order_sdate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="M-underline"></div>
                </ListMotionItem>
              </>
            )
          })}
        </ListMotionContainer>

        <div className="d-flex w-100 C-Pagenation mt-4">
          <Pagination
            totalItems={orderList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></Pagination>
        </div>
      </div>
    </>
  )
}

export default MyOrderLeft
