import axios from 'axios'
import { useState } from 'react'

function CheckTransaction(props) {
  // 檢查交易用，line pay回傳訊息與代碼
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  const [transactionId, setTransactionId] = useState('')

  const checkTransaction = () => {
    axios
      .get(`/api/pay/check-transaction?transactionId=${transactionId}`)
      .then((response) => {
        console.log(response.data)
        // 記錄某交易id回傳結果
        setResult(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <h1>檢查交易</h1>
      <input
        type="text"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        placeholder="輸入交易id(transactionId)"
      />
      <button onClick={checkTransaction}>檢查</button>
      <div>returnCode: {result.returnCode}</div>
      <div>returnMessage: {result.returnMessage}</div>
    </>
  )
}

export default CheckTransaction
