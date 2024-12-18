// controller là tầng xử lý logic và call database
import { Request, Response, NextFunction } from 'express'
import {
  ChangePasswordReqBody,
  emailVerifyReqQuery,
  ForgotPasswordReqBody,
  LoginReBody,
  logoutReqBoy,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  UpdateMeReqBody,
  VerifyForgotPasswordTokenReqBody
} from '~/models/requests/users.requests'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { ErrorWithStatus } from '~/models/schemas/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { UserVerifyStatus } from '~/constants/enums'

// Ban đầu => fix ở dưới
// export const loginController = (req: Request, res: Response) => {
//   //thêm tý logic trước khi trả kết quả cho người dùng
//   const { email, password } = req.body
//   //mình sẽ fake dữ liệu vì chưa có database
//   //nên mình sẽ kiểm tra ngta bằng 1 password nào đó
//   //khi nào có database thì mình sẽ lên services mình kiểm tra
//   if (email === 'nhatruong5012@gmail.com' && password === 'nhatruong5012@gmail.com') {
//     res.json({
//       data: {
//         fname: 'Trường',
//         yob: 2005
//       }
//     })
//   } else {
//     res.status(400).json({
//       errorMsg: 'Invalid email or password'
//     })
//   }
// }

//route này nhận email và password để tạo tk cho mình
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  //lấy email và password từ người dùng muốn đăng kí tài khoản
  const { email } = req.body
  //tạo user và lưu vào database
  // try {
  //Kiểm tra email đã tồn tại chưa
  const isDup = await userService.checkEmailExist(email)
  if (isDup) {
    //flow 1:  res.status(400) => không nên
    //flow 2:
    // throw new Error('Email has been used')
    // nhưng cũng không nên vì trong error có thuộc tính tên là `message` và bộ cờ của nó enumrable: false thì khi thông báo lỗi sẽ hông hiện lỗi ra
    // Cách fix:
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
    })
  }
  const result = await userService.register(req.body)
  // nếu thành công thì
  res.status(201).json({
    msg: USERS_MESSAGES.REGISTER_SUCCESS,
    data: result
  })
}
// catch (error) {
//   // res.status(400).json({
//   //   errMsg: 'Register failed!',
//   //   error
//   // })
//   next(error)
// }
//}

// Kiểm tra có khớp không
export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReBody>,
  res: Response,
  next: NextFunction
) => {
  // dùng email và password để tìm user đang sỡ hữu chúng
  // nếu có user đó tồn tại nghĩa là đăng nhập thành công
  const { email, password } = req.body
  //vào database thông qua tầng service
  const result = await userService.login({ email, password })
  //
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, logoutReqBoy>,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body
  // so user_id trong payload cuar access vaf refresh có phải là 1 không
  const { user_id: user_id_at } = req.decode_authorization as TokenPayload
  const { user_id: user_id_rf } = req.decode_refresh_token as TokenPayload
  if (user_id_at != user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED, //401
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVAILD
    })
  }
  //Nếu đã khớp mã, thì kiểm tra refresh_token xem có trong database hay không trước khi cung cấp dịch vụ
  await userService.checkRefreshToken({
    user_id: user_id_at,
    refresh_token
  })
  //nếu có thì mình logout(xóa refresh_token)
  await userService.logout(refresh_token)
  //
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}

export const emailVefifyControler = async (
  req: Request<ParamsDictionary, any, any, emailVerifyReqQuery>,
  res: Response,
  next: NextFunction
) => {
  //kiem tra xem user_id cua token co khop voi email_verify_token
  //ma nguoi dung gui len khong
  const { email_verify_token } = req.query
  const { user_id } = req.decode_email_verify_token as TokenPayload
  const user = await userService.checkEmailVerifyToken({ user_id, email_verify_token })
  if (user.verify === UserVerifyStatus.Banned) {
    res.status(HTTP_STATUS.ACCEPTED).json({
      message: USERS_MESSAGES.ACCOUNT_HAS_BEEN_BANNED
    })
  } else {
    //verify email
    const result = await userService.verifyEmail(user_id)
    //ket qua
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
      result
    })
  }
}

export const resendEmailVerifyToken = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  //dung user_id tim thang user do
  const { user_id } = req.decode_authorization as TokenPayload
  const user = await userService.findUserById(user_id)
  //kiem tra xem thang user do da bi xoa khoi he thon chua
  //neu user nay da verify thi
  //kiem tra xem user da verify chua, chua thi moi tao token va send
  if (user.verify === UserVerifyStatus.Verified) {
    res.status(HTTP_STATUS.ACCEPTED).json({
      message: USERS_MESSAGES.EMAIL_HAS_BEEN_VERIFIED
    })
  } else if (user.verify === UserVerifyStatus.Banned) {
    res.status(HTTP_STATUS.ACCEPTED).json({
      message: USERS_MESSAGES.ACCOUNT_HAS_BEEN_BANNED
    })
  } else {
    //tien hanh tao email_verify_token, luu va gui lai cho nguoi dung
    await userService.resendEmailVerify(user_id)
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESEND_EMAIL_SUCCESS
    })
  }

  //neu account bi ban thi cung khong
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body
  //dung email de tim user nay la ai
  const hasUser = await userService.checkEmailExist(email)
  if (!hasUser) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.NOT_FOUND, //404
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  } else {
    // neu co user tu email nay thi minh tao token va gui link vao email cho no
    await userService.forgotPassword(email)
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    })
  }
}

export const verifyForgotPasswordTokenController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordTokenReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { forgot_password_token } = req.body
  //Người dùng gữi lên forgot_password_token
  //mình đã xác thực mã rồi
  //Nhưng mà chỉ thực thi khi forgot_password_token còn hiệu lực với user
  //nên mình cần tìm user thông qua user_id
  const { user_id } = req.decode_forgot_password_token as TokenPayload
  // tìm user nào đang có 2 thông tin trên, nếu không tìm được nghĩa là forgot_passowrd_token
  //đã đucợ thay thế hoặc bị thay đổi
  await userService.checkForgotPasswordToken({ user_id, forgot_password_token })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.VERIFY_PASSWORD_TOKEN_IS_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { forgot_password_token, password } = req.body
  //Người dùng gữi lên forgot_password_token
  //mình đã xác thực mã rồi
  //Nhưng mà chỉ thực thi khi forgot_password_token còn hiệu lực với user
  //nên mình cần tìm user thông qua user_id
  const { user_id } = req.decode_forgot_password_token as TokenPayload
  // tìm user nào đang có 2 thông tin trên, nếu không tìm được nghĩa là forgot_passowrd_token
  //đã đucợ thay thế hoặc bị thay đổi
  await userService.checkForgotPasswordToken({ user_id, forgot_password_token })
  //nếu còn hiệu lực thì tiến hành cập nhật password
  await userService.resetPasseord({ user_id, password })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}

export const getMeController = async (
  req: Request<ParamsDictionary, any, any>, //
  res: Response, //
  next: NextFunction
) => {
  //Người dùng đã gữi lên accesstoken để xác thực họ đăng nhập và yêu cầu thông tin từ mình
  const { user_id } = req.decode_authorization as TokenPayload
  //dùng user_id tìm user
  const userInfor = await userService.getMe(user_id)

  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    userInfor
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeReqBody>, //
  res: Response, //
  next: NextFunction
) => {
  //Người dùng truyền lên access_token => user_id
  const { user_id } = req.decode_authorization as TokenPayload
  //Nội dung mà người dung muốn cấp nhật
  const payload = req.body
  //Kiểm tra xem user đã verify hay chưa
  await userService.checkEmailVerify(user_id)
  //Đã verify rồi thì mình tiến hành cập nhật xong thì trả ra thông tin user cập nhật
  const userInfor = await userService.updateMe({ user_id, payload })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS,
    userInfor
  })
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>, //
  res: Response, //
  next: NextFunction
) => {
  // Lấy user_id để biết cập nhật ai
  const { user_id } = req.decode_authorization as TokenPayload
  // Lấy old_password, password
  const { old_password, password } = req.body
  // Tiến hành đổi mật khẩu cho user của user_id
  await userService.changePassword({ user_id, old_password, password })
  //Thông báo
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHANGE_PASSWORD_IS_SUCCESS
  })
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>, //
  res: Response, //
  next: NextFunction
) => {
  //Kiểm tra mã có trong database hay không? (hay là còn hiệu lực hay không)
  const { refresh_token } = req.body
  const { user_id } = req.decode_refresh_token as TokenPayload

  await userService.checkRefreshToken({ user_id, refresh_token })
  //tạo access và rf token mới và xóa rf cũ
  const result = await userService.refreshToken({ user_id, refresh_token })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REFRESH_TOKEN_IS_SUCCESS,
    result
  })
}
