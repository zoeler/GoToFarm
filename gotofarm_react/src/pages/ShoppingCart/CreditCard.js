import React from 'react'
import { useState } from 'react'

function CreditCard(props) {
  const {
    formValues,
    handleCardChange,
    isSubmitted,
    isValid,
    date,
    Info,
    validateCreditCardNumber,
    handleChange,
  } = props

  return (
    <>
      <form novalidate>
        <div className="p-2">
          <div className="C-visa mb-4">
            <div className="C-visanum">
              <div className="C-visadot"></div>
              <div className="C-visanum-4">{Info ? Info.slice(-4) : ''}</div>
            </div>
            <div className="C-visadate">
              {date ? date.slice(0, 2) : ''}
              {date ? date.slice(2, 5) : ''}
            </div>
            <img src="./Buttons/visa.svg" className="img-fluid" alt="visa" />
          </div>
        </div>

        <label htmlFor="cardholder" className="f-Khaki f-18 sp-2">
          姓名
        </label>
        <div className="C-input mb-4">
          <input
            type="text"
            name="cardholder"
            value={formValues.cardholder}
            onChange={(event) => {
              handleCardChange(event)
            }}
            style={{
              backgroundColor:
                isSubmitted && !isValid && formValues.cardholder.trim() === ''
                  ? '#ECDBC0'
                  : '',
            }}
          />
        </div>
        <label htmlFor="creditcard" className="f-Khaki f-18 sp-2">
          信用卡號碼
        </label>
        <div className="C-input mb-4">
          <input
            type="number"
            name="creditcard"
            value={Info}
            onChange={(event) => {
              validateCreditCardNumber(event)
              handleCardChange(event)
            }}
            style={{
              backgroundColor:
                isSubmitted && !isValid && formValues.creditcard.trim() === ''
                  ? '#ECDBC0'
                  : '',
            }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="col-5">
            <label htmlFor="expirationdate" className="f-Khaki f-16 sp-1">
              到期日
            </label>
            <div className="C-input mb-4">
              <input
                type="text"
                name="expirationdate"
                pattern="[0-9]*"
                value={date}
                onChange={(event) => {
                  handleChange(event)
                  handleCardChange(event)
                }}
                style={{
                  backgroundColor:
                    isSubmitted &&
                    !isValid &&
                    formValues.expirationdate.trim() === ''
                      ? '#ECDBC0'
                      : '',
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="securitycode" className="f-Khaki f-16 sp-1">
              安全驗證碼
            </label>
            <div className="C-input mb-4">
              <input
                type="text"
                name="CCV"
                pattern="[0-9]*"
                maxLength="3"
                value={formValues.CCV}
                onChange={(event) => {
                  handleCardChange(event)
                }}
                style={{
                  backgroundColor:
                    isSubmitted && !isValid && formValues.CCV.trim() === ''
                      ? '#ECDBC0'
                      : '',
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreditCard
