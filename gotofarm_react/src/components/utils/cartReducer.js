export const initialState = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  sumTotal: 0,
  cartTotal: 0,
}

// const item = {
//   id: '',
//   quantity: 0,
//   name: '',
//   price: 0,
//   color: '',
//   size: '',
// }

/**
 * addItem only, duplicate item is not allow
 * @param  {} state
 * @param  {} action
 */
const addItem = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )

  const payloadQuantity = action.payload.quantity

  // if exist item, add one
  if (existingItemIndex > -1) {
    const item = state.items[existingItemIndex]
    const id = item.id

    const quantity = payloadQuantity
      ? item.quantity + payloadQuantity
      : item.quantity + 1

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity },
    }

    return updateItem(state, action)
  }
  return [...state.items, action.payload]
}

//
const reloadItems = (state, action) => {
  return [...state.items]
}

const removeItem = (state, action) => {
  return state.items.filter((item) => item.id !== action.payload.id)
}

/**
 * upateItem (ex. quantity, color, name, price...)
 * ex. action = {type="UPDATE_ITEM", payload: {id:1, quantity:1, color:'red'}
 * @param  {} state
 * @param  {} action
 */

const updateItem = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )

  if (existingItemIndex > -1) {
    const newState = [...state.items]
    newState[existingItemIndex] = {
      ...newState[existingItemIndex],
      ...action.payload,
    }
    return newState
  }

  return [...state.items]
}

const plusItemQuantityOnce = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )

  if (existingItemIndex > -1) {
    //const newState = [...state.items]
    const item = state.items[existingItemIndex]
    const id = item.id
    const quantity = item.quantity + 1

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity },
    }

    return updateItem(state, action)
  }

  return [...state.items]
}

const minusItemQuantityOnce = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )

  if (existingItemIndex > -1) {
    const item = state.items[existingItemIndex]
    const id = item.id
    const quantity = item.quantity > 1 ? item.quantity - 1 : 1

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity },
    }

    return updateItem(state, action)
  }

  return [...state.items]
}

const calculateItemTotals = (items) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity,
  }))

// const calculateTotal = (items) =>
//   items.reduce((total, item) => total + item.quantity * item.price, 0)

//重新改寫總價
const calculateTotalV2 = (items) => {
  console.log('CountCoupon')
  let coupon = { sid: 0, quota: 0, cate: 0 } // 	{"sid":2,"quota":200,"cate":1}
  try {
    coupon = JSON.parse(localStorage.getItem('usecoupon'))
  } catch (ex) {}

  const prePrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )

  if (!coupon) {
    return prePrice
  }

  let productTotal = 0
  let lessonTotal = 0
  let sumPrice = 0
  let couponPrice = coupon.quota
  let couponCate = coupon.cate
  console.log('couponPrice', coupon.quota)
  console.log('couponCate', coupon.cate)
  for (let i = 0; i < items.length; i++) {
    console.log(
      items[i].itemTotal,
      items[i].id,
      items[i].id.startsWith('product_')
    )

    if (items[i].id.startsWith('product_')) {
      // productTotal += items[i].itemTotal
      productTotal += items[i].quantity * items[i].price
    } else if (items[i].id.startsWith('lesson_')) {
      // lessonTotal += items[i].itemTotal
      lessonTotal += items[i].quantity * items[i].price
    }
  }

  console.log({ prePrice, productTotal, lessonTotal })

  // 計算總價 1=NTD 2=%
  if (couponCate === 1) {
    sumPrice = lessonTotal - couponPrice + productTotal
  } else if (couponCate === 2) {
    sumPrice = Math.floor(productTotal * (couponPrice / 100)) + lessonTotal
  } else {
    sumPrice = lessonTotal + productTotal
  }
  console.log('sumPrice', sumPrice)
  return sumPrice
}

const calculateTotalItems = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)

const sumTotal = (items) => items.length

const generateCartState = (state, items) => {
  const isEmpty = items.length === 0

  return {
    ...initialState,
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    sumTotal: sumTotal(items),
    cartTotal: calculateTotalV2(items),
    isEmpty,
  }
}

// for useReducer init use
export const init = (items) => {
  return generateCartState({}, items)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return generateCartState(state, addItem(state, action))
    case 'REMOVE_ITEM':
      return generateCartState(state, removeItem(state, action))
    case 'UPDATE_ITEM':
      return generateCartState(state, updateItem(state, action))
    case 'PLUS_ONE':
      return generateCartState(state, plusItemQuantityOnce(state, action))
    case 'MINUS_ONE':
      return generateCartState(state, minusItemQuantityOnce(state, action))
    case 'RELOAD_ITEMS':
      return generateCartState(state, reloadItems(state, action))
    // reloadItems
    case 'CLEAR_CART':
      return initialState
    default:
      throw new Error('No action specified')
  }
}
