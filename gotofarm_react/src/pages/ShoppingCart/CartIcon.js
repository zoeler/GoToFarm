import React from 'react'
import '../../css/shoppingcart.css'
import { useCart } from '../../components/utils/useCart'
// import { useEffect, useState } from 'react'

function CartIcon(props) {
  // const { addItem } = useCart()
  const CartTotal = useCart().cart.sumTotal

  return (
    <>
      <div className="C-IconCart" data-count={CartTotal}>
        <img src="./../../Icons/cart.svg" alt="cart"></img>
      </div>
      {/* <button
        onClick={() => {
          addItem({
            id: 'lesson_0010',
            img: 'farm_1.jpg',
            name: '有機農活半日遊',
            date: '2023-03-01',
            price: 500,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcart"></img>
        L1
      </button>
      <button
        onClick={() => {
          addItem({
            id: 'lesson_0002',
            img: 'farm_12.jpg',
            name: '菜園裡的餐桌',
            date: '2023-03-04',
            price: 400,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcart"></img>
        L2
      </button>
      <button
        onClick={() => {
          addItem({
            id: 'lesson_0003',
            img: 'farm_18.jpg',
            name: '百香果農事體驗',
            date: '2023-03-06',
            price: 500,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcart"></img>
        L3
      </button>
      <button
        onClick={() => {
          addItem({
            id: 'product_0001',
            img: 'passion_fruit_001.jpg',
            name: '網室黃金百香果',
            slogan: '異國風味新感受',
            price: 899,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcaart"></img>
        P1
      </button>
      <button
        onClick={() => {
          addItem({
            id: 'product_0002',
            img: 'passion_fruit_003.jpg',
            name: '台農一號百香果',
            slogan: '超飽滿果肉網室栽種',
            price: 799,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcaart"></img>
        P2
      </button>
      <button
        onClick={() => {
          addItem({
            id: 'product_0003',
            img: 'loquat_001.jpg',
            name: '甜蜜蜜有機枇杷',
            slogan: '有機栽培果香肉甜',
            price: 1280,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcaart"></img>
        P3
      </button>
      <button
        onClick={() => {
          addItem({
            id: 'product_0004',
            img: 'grape_001.jpg',
            name: '黑鑽石樹葡萄',
            slogan: '連皮都可以安心吃',
            price: 559,
            quantity: 1,
          })
        }}
      >
        <img src="./Icons/addCart.svg" alt="addcaart"></img>
        P4
      </button> */}
    </>
  )
}

export default CartIcon
