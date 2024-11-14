import express, { Request, Response } from 'express'
import {
  changePasswordController,
  emailVefifyControler,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendEmailVerifyToken,
  resetPasswordController,
  updateMeController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  forgotPasswordTokenValidator,
  forgotPasswordVadidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/users.requests'
import { wrapAsync } from '~/utils/handlers'
const userRouter = express.Router() // Dùng epress.Router() để dụng user router.

// Handle: hàm có req, res
// Middlware: Là handle nhưng có thêm next() && sẽ được xử lý trước khi xử lý controller
//          Lưu ý: Có thể có 2 hoặc nhiều hơn 2 middlewware trong một chức năng
//  Controller: handle được xử lý sau cùng.

// Đặc biệt: đây được gọi middleware toàn cục(vào là luôn sẽ đi qua middleware này)
// userRouter.use(
//   (req, res, next) => {
//     console.log('Time1:', Date.now())
//     //return thì nó bay ra khỏi hàm luôn => kết thúc luôn hàm.
//     //next() nếu chỉ dùng như vậy thì mặc dù vẫn next xuống handle dưới
//     //nhưng nó vẫn chạy hết phần còn lại của handler(middleware này).
//     return next()
//     // nếu dùng như vậy thì next sang handler dưới và đồng thời kết thúc hàm hiện tại lun.
//     res.status(400).send('Not allowed')
//     console.log('ahihi')
//   },
//   (req, res, next) => {
//     console.log('Time2:', Date.now())
//     return next()
//   }
// )

// Đây được gọi là controller
// loginValidator ở đây được gọi là middleware cục bộ
// ở tầng middleware thì chỉ nên kiểm tra thôi chứ không nên vào database xem.
// chỉ nên ở tầng controller thì mới nên giao tiếp với database
// Path: localhost:3000/users/login

// userRouter.post('/login', loginValidator, loginController)

//phương thức get thì không nhận body của req muốn thì dùng post
//loginValidator: kiểm tra tính hợp lệ.
//loginController: kiểm tra logic
//lớp 3 là service: database đò
//và đây là mô hình 3 lớp

/*
desc: Register a new user
Path: /register
Method: post
Body: {
    name: String,
    email: String,
    password: String,
    confirm_password: String,
    date_of_birth: String có dạng ISO8601
}
*/
userRouter.post('/register', registerValidator, wrapAsync(registerController))

/**desc: login
 * path: users/login
 * method: post
 * body{
 *  email
 *  password
 * }
 * */
userRouter.post('/login', loginValidator, wrapAsync(loginController))

/**desc: logout
 * path: users/logout
 * method: post
 * headers:{
 *  Authorization: 'Bearer <access_token>'
 * }
 * body:{
 *  refresh_token
 * }
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/**desc: verify email => khi người dùng bấm vào link trong email thì họ gữi email_verify_token
 * thông qua query để mình kiểm tra, vậy thì trong query sẽ có token đó
 * mình sẽ verify và lưu vào payload và decode_email_verify_token
 * ?option: tạo ac và rf cho đăng nhập luôn
 * path: users/verify-email/?email_verify_token=string
 * method: get
 * */
userRouter.get('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVefifyControler))

/*
desc: Gui lai verify email khi nguoi dung nhan vao nut gui lai email
path: users/resend-verify-email
method: post
headers: {Authorization: 'Baerer <access_token>'}
*/
userRouter.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyToken))

/*desc: Thong bao bi quen mk yeu cau lay lai 
sever kiem tra email co ton tai trong he thong khong
gui link khoi phuc account qua email cho nguoi dung

gui len email
path: uses/forgot-password
method:  post
bodyL {email: string} 
*/
userRouter.post('/forgot-password', forgotPasswordVadidator, wrapAsync(forgotPasswordController))

/*desc: verify forgot password token 
route: kiểm tra forgot_password_token đúng và còn hiệu lực không
path: users/verify-forgot-password
method: post
body:{
  forgot_password_token: string
}*/
userRouter.post(
  '/verify-forgot-password',
  forgotPasswordTokenValidator, // kiểm tra forgot_password_token
  wrapAsync(verifyForgotPasswordTokenController) // xử lý logic
)

/*desc: reset password
password: users/resrt-password
method: post
body:{
  password: string
  confirm_password: string
  forgot_password_token: string
}
*/
userRouter.post(
  '/reset-password',
  forgotPasswordTokenValidator, //kiểm tra forgot_password_token
  resetPasswordValidator, // kiểm tra passowrd, confirm_pasword
  wrapAsync(resetPasswordController) // tiến hành đổi mật khẩu
)

/*desc: get me: get me profile
 method: post
 path: users/me
 headers:{
  Authorization: "Bearer <access_token>"
 }
*/
userRouter.post('/me', accessTokenValidator, wrapAsync(getMeController))

/*
des: update profile của user
path: '/me'
method: patch
Headers: {Authorization: Bearer <access_token>}
body: {
  name?: string
  date_of_birth?: string
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional}
*/

userRouter.patch(
  '/me',
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'username',
    'cover_photo'
  ]),
  accessTokenValidator, //
  updateMeValidator, //
  wrapAsync(updateMeController)
)

/*
  des: change password
  path: '/change-password'
  method: PUT(PATCH)
  headers: {Authorization: Bearer <access_token>}
  Body: {old_password: string, password: string, confirm_password: string}
*/

userRouter.put('/change-password', accessTokenValidator, changePasswordValidator, wrapAsync(changePasswordController))

/*
  desc: refresh-token
  khi ma access-token hết hạn thì dùng chức năng này
  path: users/refresh-token
  method: post
  body:{
    refresh-token: string
  }
*/

userRouter.post(
  '/refresh-token',
  refreshTokenValidator, //
  wrapAsync(refreshTokenController)
)
//public nó ra rồi để default lun để chỉ cần ấn tên ra là dùng được luôn
export default userRouter
