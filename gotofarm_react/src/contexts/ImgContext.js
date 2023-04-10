import { createContext, useState } from 'react'

// 創建一個新的Context對象
const ImgContext = createContext({})
export default ImgContext
// 在最上層組件定義Context的值
export const ImgContextProvider = ({ children }) => {
  // 預設為未登入狀態
  const [myImg, setMyImg] = useState('')

  return (
    <ImgContext.Provider value={{ myImg, setMyImg }}>
      {children}
    </ImgContext.Provider>
  )
}
