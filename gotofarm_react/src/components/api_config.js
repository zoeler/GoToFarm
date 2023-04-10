// 彙整所有Ajex路徑

// node專案HOST
export const HOST = 'http://localhost:3033'

// GET商品清單資料 (ZOE)
export const PRODUCT_DATA = `${HOST}/product/api`

// GET商品頁面資料/:sid (ZOE)
export const PRODUCT_PAGE_DATA = `${HOST}/product`

// POST商品收藏/:type (ZOE)
export const BOOKMARK_ADD = `${HOST}/bookmark/add`

// DELETE商品收藏/:type/:sid (ZOE)
export const BOOKMARK_DELETE = `${HOST}/bookmark/delete`

// GET商品收藏 (ZOE)
export const BOOKMARK_DATA = `${HOST}/bookmark/mybookmark`

// GET會員評論 (ZOE)
export const MY_COMMENT_DATA = `${HOST}/comment/mycomment`

// GET首頁評論 (ZOE)
export const COMMENT_DATA = `${HOST}/comment/api`

// POST商品評論/:type (ZOE)
export const COMMENT_ADD = `${HOST}/comment/add`

// PUT修改商品評論/:type (ZOE)
export const COMMENT_EDIT = `${HOST}/comment/edit`

// 登入, POST
export const LOGIN = `${HOST}/login`

//小農部落 所有文章API
export const CMMA = `${HOST}/community/api`
//小農部落 單筆文章API
export const CMPData = `${HOST}/community/`
export const CMPRE = `${HOST}/community/reply`

//小農部落格 新增留言
export const CMADD = `${HOST}/reply/add`

//Coupon資料
export const COUPON_DATA = `${HOST}/coupon`
//POST發送兔飽飽券及徽章(ZOE)
export const COUPON_RABBIT = `${HOST}/coupon/addRabbit`
//POST判斷有無玩過遊戲(ZOE)
export const DONE_RABBIT = `${HOST}/coupon/doneRabbit`

//寄送地址資料
export const MY_ADDRESS_DATA = `${HOST}/myaddress`

// GET課程列表
export const LESSON_DATA = `${HOST}/lesson/lessonList`
//會員註冊用API
export const Register = `${HOST}/register/api`

//登入登出/取得會員資料
export const myDataDetail = `${HOST}/myDataDetail/api`

// GET課程詳細
export const LESSON_DETAIL_DATA = `${HOST}/lesson`

//訂單詳細
export const MY_ORDER_DETAILS = `${HOST}/orderdetails`

//我的課程日記
export const MY_WEEK_C = `${HOST}/weekcalender`

//更新會員資料
export const MY_EDIT_MEMBER = `${HOST}/member/edit`

//更新送貨地址
export const MY_EDIT_ADDRESS = `${HOST}/member/editaddress`

//訂單
export const MY_ORDER = `${HOST}/order`

//我的會員右邊
export const MY_MEMBER = `${HOST}/mymember`
