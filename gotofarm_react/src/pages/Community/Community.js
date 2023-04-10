import React, { useEffect } from 'react'
import { HOST, CMMA } from '../../components/api_config'
import { LOGIN } from '../../components/api_config'
import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import AuthContext from '../../contexts/AuthContext'
import CommPagination from '../../components/CommPagination'


//引入樣式
import '../../css/members.css'
import '../../css/community.css'

function Community() {
    const location = useLocation();
    console.log("1--", location.search);
    const usp = new URLSearchParams(location.search);
    const [myForm, setMyForm] = useState({
        account: '',
        password: '',
    })
    const { setMyAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [users, setUsers] = useState([]) //要保持此狀態一直是陣列！
    const [shownPassword, setHidePassword] = useState(false)
    const { myAuth, logout } = useContext(AuthContext)



    const [cmmData, setCmmData] = useState({
        totalRows: 0,
        page: 0,
        totalPages: 0,
        CMA: []
    });

    const getListData = async (page = 1) => {
        const response = await axios.get(CMMA, {
            params: {
                page
            }
        });
        // response.data 會依據回應的檔頭作解析, JSON
        console.log(response.data);
        setCmmData(response.data);
    };


    useEffect(() => {
        // 在component mount時從API獲取數據
        async function fetchData() {
            const response = await fetch('http://localhost:3033/community/api');
            const data = await response.json();
            setCmmData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        // 設定功能
        console.log("useEffect--");
        getListData(+usp.get("page"));

        return () => {
            // 解除功能
        };
    }, [location.search]);
    //用useEffect最好是基本數值






    return (
        <div className='m-session d-flex justify-content-center pb-5  cm-session'>
            {/* 功能列 */}
            <div className='cm-container d-flex flex-column  col-10 h-100 mt-4 cm-margin'>
                <div className='w-100 d-flex justify-content-between'>
                    <div className='cm-select-bar d-flex justify-align-content-between align-items-center gap-2 mt-3 ms-2 me-2 text-center '>
                        <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
                            <a href='/AddArtical'><p className='cm-pbt'>發表新文章</p></a>
                        </div>
                        <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
                            <p className='cm-pbt'>我的文章</p>
                        </div>
                    </div>
                    <div className='mt-4 login-span fw-bolder'>
                        <CommPagination
                            page={cmmData.page}
                            totalPages={cmmData.totalPages}
                            getListData={getListData}
                        />
                    </div>
                    <div className='cm-select-bar  d-flex justify-align-content-between align-items-center gap-2 mt-3 ms-2 me-2 text-center '>
                        <div className='cm-select-bar-btn  d-flex justify-content-center align-items-center'>
                            <p>文章排列方式:</p>
                        </div>
                        <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
                            <p className='cm-pbt'>發文時間</p>
                        </div>
                        <div className='cm-select-bar-btn d-flex justify-content-center align-items-center'>
                            <p className='cm-pbt'>熱門迴響</p>
                        </div>
                    </div>
                </div>
                {/* 功能列 結束*/}

                {/* 文章卡片 */}
                {/* 擺放卡片位置的地方vvvv */}
              
                <div className='cm-artical-session d-flex justify-content-center align-items-start  col-12 h-100 mt-5 gap-5 flex-wrap'>
                    {cmmData.CMA.map(row => (
                        <div key={row.sid} className='cm-artical-card mt-1'>
                            <div className='cm-artical-innerimg' >
                                <img src={`${HOST}/images/community/` + `${row.community_picture1}`}></img>
                            </div>
                            <div className='cm-member-info w-100 d-flex align-items-end ms-3'>
                                <div className='cm-member-ava'>
                                    <img src={`${HOST}/images/avatar/` + `${row.member_img}`}></img>
                                </div>
                                <div className='d-flex flex-column ms-2 w-75 '>
                                    <div className='cm-member-detail d-flex justify-content-between'>
                                        <span className='fs-6'>BY {row.member_name}</span>
                                        <span className='fs-6'>
                                            發表於:
                                            {dayjs(row.community_created_at).format("YYYY-MM-DD")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 點讚區 */}

                            <div className='d-flex justify-content-around cm-like-area'>
                                <div className='cm-like-comments w-50 m-4 d-flex gap-3'>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <img src='/icons/like.png'></img>
                                        <div className='cm-like-span text-success fs-6'>(23)</div>
                                    </div>

                                    <div className='d-flex gap-2 align-items-center'>
                                        <img src='/icons/comment.png'></img>
                                        <div className='cm-like-span  fs-6'>(20)</div>
                                    </div>
                                </div>


                                <div className='cm-like-comments w-50 m-4 d-flex align-items-center justify-content-end gap-3'>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <img src='/icons/instagram.png'></img>
                                    </div>

                                    <div className='d-flex gap-2 align-items-center'>
                                        <img src='/icons/facebook.png'></img>
                                    </div>
                                </div>
                            </div>

                            {/* 文章 */}
                            <div className='cm-arti-show d-flex justify-content-around w-100 h-100 bg-white'>
                                <div className='cm-artical-contain-area w-100 h-100 bg-white d-flex'>
                                    <div className='cm-artical ms-5 me-5 mt-4 w-100'>
                                        <h3>{row.community_header}</h3>
                                        <span className='fs-6'>{row.community_contain}</span>
                                        <span className='fs-5 text-warning'>
                                            <a className='text-success' href={`http://localhost:3000/community/` + `${row.sid}`}>....[點我看更多]</a>
                                        </span>
                                    </div>
                                </div>
                            </div>




                        </div>
                    ))}



                {/* 文章卡片 */}
            </div>
            </div>
            </div>
    )
}

export default Community
