import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({})
export default AuthContext

export const AuthContextProvider = ({ children }) => {
  const [myImg, setMyImg] = useState('')
  const navigate = useNavigate()
  // 預設為未登入狀態
  const unAuth = {
    authorized: false,
    sid: 0,
    account: '',
    token: '',
  }

  let initAuth = { ...unAuth }

  const str = localStorage.getItem('myAuth')

  try {
    if (str) {
      const localAuth = JSON.parse(str)
      if (localAuth.token && localAuth.account && localAuth.accountId) {
        initAuth = {
          authorized: true,
          sid: localAuth.accountId,
          account: localAuth.account,
          member_name: localAuth.member_name,
          member_nickname: localAuth.member_nickname,
          member_img: localAuth.member_img,
          member_state_sid: localAuth.member_state_sid,
          member_correct: localAuth.member_state_sid,
          token: localAuth.token,
        }
      }
    }
  } catch (ex) {}

  const [myAuth, setMyAuth] = useState(initAuth)

  const logout = () => {
    localStorage.removeItem('myAuth')
    setMyAuth(unAuth)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ myAuth, setMyAuth, logout, myImg, setMyImg }}
    >
      {children}
    </AuthContext.Provider>
  )
}
