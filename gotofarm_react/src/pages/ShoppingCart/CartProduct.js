import { useCart } from '../../components/utils/useCart'
import { Link } from 'react-router-dom'
import {
  ListMotionContainer,
  ListMotionItem,
} from '../../components/ListMotion'

function CartProduct(props) {
  const { plusOne, minusOne, reloadItems } = useCart()
  const {
    setDeleteConfirm,
    setRemoveItemsID,
    setShowSelectP,
    couponPrice,
    couponCate,
  } = props
  let cart = []
  let productCart = []
  let productCartCount = 0
  try {
    cart = JSON.parse(localStorage.getItem('cart'))
    productCart = cart.filter((value) => value.id.indexOf('product') !== -1)
    productCartCount = productCart.length
  } catch (ex) {}

  return (
    <>
      {!productCart.length ? (
        <div
          className="C-Cart-p backgound-w rounded-20 mb-4 shadow-1 p-2 p-sm-3 p-lg-4 font-B"
          data-count={productCartCount}
        >
          <div className="d-flex align-items-center justify-content-center w-100 gap-3">
            <div className="C-notfound">
              <img
                src="./../../Images/notfound.png"
                alt="notfound"
                className="img-fluid"
              />
            </div>
            <span className="C-notext f-Khaki">尚無購入商品唷</span>
            <div className="C-notfound">
              <img
                src="./../../Images/notfound.png"
                alt="notfound"
                className="img-fluid"
              />
            </div>
            <Link to="/product">
              <div className="C-gotoshop">
                <img
                  src="./../../Images/findProduct-2.png"
                  alt="notfound"
                  className="img-fluid"
                />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="C-Cart-p backgound-w rounded-20 mb-4 shadow-1 p-2 p-sm-3 p-lg-4 font-B"
          data-count={productCartCount}
        >
          <div className="C-title px-2 py-2 px-lg-4 pt-lg-4 ">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="C-title-1">
                <span className="f-16 f-Gray sp-1">產品名稱</span>
              </div>
              <div className="d-flex flex-row gap-1 gap-lg-5">
                <div className="C-title-2">
                  <span className="f-16 f-Gray sp-1">單件價格</span>
                </div>
                <div className="C-title-3">
                  <span className="f-16 f-Gray sp-1">數量</span>
                </div>
                <div className="C-title-4">
                  <span className="f-16 f-Gray sp-1">小計</span>
                </div>
                <div className="C-title-5"></div>
              </div>
            </div>
            <div className="C-underline"></div>
          </div>
          <ListMotionContainer element="div" className="row ">
            {productCart.map((p) => {
              return (
                <ListMotionItem key={p.sid} element="div" noShift>
                  <div className="C-Item px-3 py-3 px-lg-4 pt-lg-4" key={p.id}>
                    <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                      <div className="C-Item-1 d-flex flex-row align-items-center gap-lg-3 gap-1">
                        <div className="C-productimg">
                          <img
                            src={`http://localhost:3033/images/product/${p.img}`}
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div>
                          <p className="f-24 fw-normal mb-1 f-Brown">
                            {p.name}
                          </p>
                          <span className="f-13 sp-1 f-Gray">{p.slogan}</span>
                        </div>
                      </div>
                      <div className="C-Item-2 d-flex flex-row gap-1 gap-md-2 gap-lg-5 align-items-center">
                        <div className="C-price-1">
                          <span className="f-20 sp-1 f-Gray">{p.price}</span>
                          <span className="f-16 f-Gray">NTD</span>
                        </div>
                        <div className="C-counter d-flex">
                          <button
                            className="less"
                            onClick={() => {
                              minusOne(p.id)
                              reloadItems()
                            }}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            name="quantity"
                            value={p.quantity}
                            type="number"
                            className="C-counternum no-outline:focus"
                          />

                          <button
                            className="more"
                            onClick={() => {
                              plusOne(p.id)
                              reloadItems()
                            }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="C-price">
                          <span className="f-20 sp-1 f-DarkGreen">
                            {p.itemTotal}
                          </span>
                          <span className="f-Gray">NTD</span>
                        </div>
                        <div
                          className="C-delete"
                          onClick={() => {
                            setDeleteConfirm(true)
                            setRemoveItemsID(p.id)
                          }}
                        >
                          <img
                            src="/Icons/delete.svg"
                            className="img-fluid"
                            alt="delete"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="C-underline"></div>
                  </div>
                </ListMotionItem>
              )
            })}
          </ListMotionContainer>
          <div
            className="d-flex w-100 justify-content-end C-coupon"
            onClick={() => {
              setShowSelectP(true)
            }}
          >
            <button>
              <img src="./Icons/coupon.svg" alt="coupon" />
            </button>
            <span className="f-16 f-Yellow ms-2">
              套用折扣:
              {couponPrice && couponCate === 2 ? couponPrice + '%' : '無'}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default CartProduct
