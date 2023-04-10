import React from 'react'
import { useState, useEffect } from 'react';

// 用來記錄目前螢幕狀態的state
const useRWD=()=>{
    const [device,setDevice]=useState("mobile");
    
    return device;
}
// 定義用來綁定的函式
const handleRWD=()=>{
    if(window.innerWidth > 768)
        setDevice("PC");
    else if (window.innerWidth > 576)
        setDevice("tablet");
    else
        setDevice("mobile");
}
// 定義生命週期，綁定事件
useEffect(()=>{ 
    window.addEventListener('resize',handleRWD);
    return(()=>{
        window.removeEventListener('resize',handleRWD);
    })
},[]);

return device;


export default useRWD