// 引入react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 換頁滾動視窗到頂端
import ScrollToTop from './components/ScrollToTop'

//Index
import IndexRiver from './pages/IndexRiver/IndexRiver'
import Index from './pages/Index/Index'
import Rabbit from './pages/Rabbit/Rabbit'

//Lesson
import Lesson from './pages/Lesson/Lesson'
import LessonDetail from './pages/LessonDetail/LessonDetail'

//Login
import Login from './pages/Login/login_page'
import Register from './pages/Register/Register'
import RegisterComfirm from './pages/Register/RegisterComfirm'
import GoogleRegister from './pages/Register/GoogleRegister'
import RegisterChecked from './pages/Register/RegisterChecked'
import { AuthContextProvider } from './contexts/AuthContext'
import { ImgContextProvider } from './contexts/ImgContext'
// import Signin from "./pages/Signin/signin_index.html";

// Product
import Product from './pages/Product/Product'
import ProductPage from './pages/ProductPage/ProductPage'

//Cart
import { CartProvider } from './components/utils/useCart'
import CartIcon from './pages/ShoppingCart/CartIcon'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import ShoppingPayment from './pages/ShoppingCart/ShoppingPayment'
import LinePayCancel from './pages/ShoppingCart/LinePayCancel'
import ShoppingConfirm from './pages/ShoppingCart/ShoppingConfirm'

//Member
import MyBookmarkLeft from './pages/Member/MyBookmarkLeft'
import MyCommentLeft from './pages/Member/MyCommentLeft'
import MemberDetail from './pages/Member/MemberDetail'
import MemberLeft from './pages/Member/MemberLeft'
import MyOrderLeft from './pages/Member/MyOrderLeft'
import OrderDetailLeft from './pages/Member/OrderDetailLeft'
import MyCouponLeft from './pages/Member/MyCouponLeft'
import MyAwardsLeft from './pages/Member/MyAwardsLeft'

//Community
import Community from './pages/Community/Community'
import CommunityPage from './pages/Community/CommunityPage'
import AddArtical from './pages/Community/Addartical'

import Navbar from './pages/Index/Navbar'
import Footer from './pages/Index/Footer'
import { Helmet } from 'react-helmet'

//測試區
import TryMap from './pages/TryMap/TryMap'

function App() {
  return (
    <>
      <div>
        <Helmet>
          <link
            rel="icon"
            type="image/png"
            href="./../../Icons/IconMember.png"
            sizes="16x16"
          />
        </Helmet>
      </div>
      <CartProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/IndexRiver" element={<IndexRiver />} />
              <Route path="/Rabbit" element={<Rabbit />} />
              <Route path="/map" element={<TryMap />} />

              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Checked" element={<RegisterChecked />} />
              <Route path="/Comfirm" element={<RegisterComfirm />} />
              <Route path="/GoogleR" element={<GoogleRegister />} />

              <Route path="/lesson" element={<Lesson />} />
              <Route path="/lesson/:sid" element={<LessonDetail />} />

              <Route path="/Product" element={<Product />} />
              <Route path="/Product/:sid" element={<ProductPage />} />

              <Route path="/CartIcon" element={<CartIcon />} />
              <Route path="/Cart" element={<ShoppingCart />} />
              <Route path="/Payment" element={<ShoppingPayment />} />
              <Route path="/LinePayCancel" element={<LinePayCancel />} />
              <Route path="/Confirm" element={<ShoppingConfirm />} />

              <Route path="MyMember" element={<MemberDetail />}>
                <Route index element={<MemberLeft />} />
                <Route path="MyOrder" element={<MyOrderLeft />} />
                <Route path="MyOrder/:uuid" element={<OrderDetailLeft />} />
                <Route path="MyCoupon" element={<MyCouponLeft />} />
                <Route path="MyBookmark" element={<MyBookmarkLeft />} />
                <Route path="MyComment" element={<MyCommentLeft />} />
                <Route path="MyAwards" element={<MyAwardsLeft />} />
              </Route>
              {/* 測試區 */}
              <Route path="/Community" element={<Community />} />
              <Route path="/Community/:sid" element={<CommunityPage />} />
              <Route path="/AddArtical" element={<AddArtical />} />
            </Routes>
            <Footer />
          </AuthContextProvider>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
