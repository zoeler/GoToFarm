import React, { useState } from 'react'
import LinePay from './LinePay'
import CreditCard from './CreditCard'
import { useCart } from '../../components/utils/useCart'

function PayTab(props) {
  const {
    activeTab,
    setActiveTab,
    formValues,
    handleCardChange,
    isValid,
    isSubmitted,
    date,
    Info,
    validateCreditCardNumber,
    handleChange,
  } = props

  const { setMyPayment } = useCart()
  const handleTabClick = (index) => {
    setActiveTab(index)
  }

  return (
    <>
      <div className="d-flex justify-content-around">
        <div className="C-paytitle mb-4">付款方式* :</div>
        <div className="C-tab d-flex gap-2">
          <button
            className={activeTab === '信用卡' ? 'C-paywaybtn-a' : 'C-paywaybtn'}
            onClick={() => {
              handleTabClick('信用卡')
              setMyPayment('信用卡')
            }}
          >
            信用卡
          </button>
          <button
            className={
              activeTab === 'LinePay' ? 'C-paywaybtn-a' : 'C-paywaybtn'
            }
            onClick={() => {
              handleTabClick('LinePay')
              setMyPayment('LinePay')
            }}
          >
            LinePay
          </button>
        </div>
      </div>
      {activeTab === '信用卡' ? (
        <CreditCard
          formValues={formValues}
          handleCardChange={handleCardChange}
          isValid={isValid}
          isSubmitted={isSubmitted}
          date={date}
          Info={Info}
          validateCreditCardNumber={validateCreditCardNumber}
          handleChange={handleChange}
        ></CreditCard>
      ) : (
        <LinePay></LinePay>
      )}
    </>
  )
}

export default PayTab
