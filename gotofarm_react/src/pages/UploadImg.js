import { useState } from 'react'
import axios from 'axios'
import { HOST } from '../components/api_config'

function UploadImg() {
  const [avatar, setAvatar] = useState('')
  // const[upload,se]
  const [name, setName] = useState('')

  return (
    <>
      <input
        type="text"
        name="name"
        style={{ border: '1px solid red' }}
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <br />
      {/* 隱藏input之一：用來存放上傳圖檔檔名的input，值會跟著其他表單資料一起寫入會員資料表 */}
      <input
        type="text"
        name="avatar"
        // style={{ display: 'none' }}
        value={avatar}
      />
      {/* 隱藏input之二：用來挑選圖片與上傳圖片 */}
      <input
        type="file"
        id="upload"
        style={{ display: 'none' }}
        // value={}
        onChange={(e) => {
          axios
            .post(
              `${HOST}/try_upload`,
              { avatar: e.target.files[0] },
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then((r) => {
              setAvatar(r.data)
            })
        }}
      />
      {/* 使用者實際點擊與圖片預覽的地方 */}
      <div
        style={{ width: '200px', height: '200px', border: '1px solid red' }}
        onClick={() => {
          document.querySelector('#upload').click()
        }}
      >
        <img
          src={`${HOST}/images/avatar/${avatar}`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        上傳照片
      </button>
    </>
  )
}

export default UploadImg
