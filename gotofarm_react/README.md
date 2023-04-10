# react-farmerwww

CSS class前綴

柔吟：
  產品：P-
  首頁河道：IR
怡凱：
  會員：M-
  評論：
恩雅：
  購物車：C-
  訂單：O-
邑宏：
  課程：L-
千卉：
  首頁：A-



—-------------------

/* 整體背景 */
body {
  background-color: #FFFDF6; 
}

/* 拔除input樣式 */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  border: 0;
}

input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
}

input:focus {
  outline: none !important;
}

/* 字體 */
.font-B {
  font-family: GenSenRoundedTW-B;
}
.font-M {
  font-family: GenSenRoundedTW-M;
}
.font-R {
  font-family: GenSenRoundedTW-R;
}
.font-L {
  font-family: GenSenRoundedTW-L;
}

/* 字級大小 */
.f-13{
  font-size: clamp(0.6rem, 1vw, 0.8125rem);
}
.f-16{
  font-size: clamp(0.9rem, 1.8vw, 1rem); 
}
.f-20{
  font-size: clamp(1.1rem,2.2vw,1.25rem);
}
.f-24{
  font-size: clamp(1.2rem, 2.5vw, 1.5rem); 
}
.f-32{
  font-size: clamp(1.8rem, 3vw, 2rem); 

}

/* 字體顏色 */
.f-Brown{
  color: rgb(116, 84, 84);
}

.f-LightGreen {
  color: rgba(87, 172, 111, 1);
}
.f-DarkGreen{
  color: #37797C;
}
.f-Gray{
  color: #7A7A7A;
}

/* 文字間距 letter-spacing*/
.sp-1{
  letter-spacing: 2px;
}
.sp-2{
  letter-spacing: 4px;
}
.sp-3{
  letter-spacing: 6px;
}
.navbar-title {




 display: flex;


 justify-content: center;


 align-items: center;


 max-width: 1920px;


 margin: 0 auto;


 padding: 0;


 height: 180px;


}







/* nav>ul{


   position: relative;


 } */


.navbar-title>ul>li {


 /* position: absolute; */


 align-items: center;


 justify-content: center;


}







.menu_li {







 height: 34px;


 list-style: none;


 padding-left: 20px;


 padding-right: 20px;







}







.menu_li>a {


 text-decoration: none;


 font-size: 18px;


 color: #2A6A4B;







}







.menu_li>a>span {


 position: relative;


}







.menu_li>a>span>svg {


 position: absolute;


 width: 100%;


 right: 0;


 bottom: -2px;


}







.menu_li>a>div {


 display: inline;


 align-items: center;


}







.menu_li>a>div>img {


 width: 34px;


 height: 34px;


}







.nav-logo {


 position: relative;


}







.nav-logoimg {


 margin-top: -75px;


 width: 205px;


 height: 180px;


 border-radius: 50%;


 background-color: #FFF;


}

 /* 字體 */
 @font-face {
   font-family: GenSenRoundedTW-B;
   src: url('/font/GenSenRounded-B.otf')
 }
 
 @font-face {
   font-family: GenSenRoundedTW-M;
   src: url('/font/GenSenRounded-M.otf')
}

@font-face {
  font-family: GenSenRoundedTW-R;
  src: url('/font/GenSenRounded-R.otf')
}

@font-face {
      font-family: GenSenRoundedTW-L;
      src: url('/font/GenSenRounded-L.otf')
    }











