// import 3 interface giúp mô tả req, res, next do express cung cấp.
import { verify } from 'crypto'
import { Request, Response, NextFunction } from 'express'
// import checkSchema dùng để check schema của một object
import { check, checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/schemas/Errors'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'

// middleware giống như một túi lọc
// users gữi request lên cho mình
// mình sẽ ép req đi qua các middlewares để kiểm tra
// và khi chạm vào và chạm được next() thì mới qua.

// fix lai o duoi
// // làm 1 middlewares kiểm tra người dùng có gữi lên username và password
// export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
//   //muốn xem body của request này có gì
//   //console.log(res)
//   //phụ thuộc vào req nếu có body thì mới có không thì undefinded.
//   //Lấy thử trong  body của req có email và password hay không.
//   const { email, password } = req.body
//   //nếu không có thì không được đi tiếp
//   if (!email || !password) {
//     res.status(422).json({
//       errorMsg: 'Missing email or password'
//     })
//   }
//   return next()
// }

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: true //tra ket qua 1 - 10 de the hien do manh pass word
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: true //tra ket qua 1 - 10 de the hien do manh pass word
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            //value là trường giá trị nó đang chứa value == confirm_pasword
            if (value !== req.body.password) {
              throw new Error(`Confirm_password does not match password`) // trong schema thi throw ra thif status là 422
            } else return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true //không được viết thiếu dấu cách
          },
          errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
        }
      }
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: true //tra ket qua 1 - 10 de the hien do manh pass word
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value, { req }) => {
            //value này là 'Bea <access_token>'
            const access_token = value.split(' ')[1]
            if (!access_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }
            //Người dùng có gữi access token lên
            //verify access_token(so sánh chữ ký)
            try {
              //nếu đúng chữ ký thì mình sẽ tin vào payload có trong token
              const decode_authorization = await verifyToken({
                token: access_token,
                privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })
              //decode_authorization là payload của accesstoken
              //decode_authorization có user_id và tokenType
              req.decode_authorization = decode_authorization
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: (error as JsonWebTokenError).message
              })
            }
            return true //hoàn thành test
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value, { req }) => {
            //value la refreshtoke
            try {
              const decode_refresh_token = await verifyToken({
                token: value,
                privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
              })
              //value la refresh_token, verify xong được decode_refresh_token là payload
              //lưu lại vào req để xài ở các tầng khác
              req.decode_refresh_token = decode_refresh_token
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: (error as JsonWebTokenError).message
              })
            }
            //thong bao ket qua thanh cong neu vuot qua het cacs lop kiem tra tren
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            //value là email_verify_token
            try {
              const decode_email_verify_token = await verifyToken({
                token: value, //email_verify_token
                privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })
              //decode_email_verify_token là payload của email_verify_token
              ;(req as Request).decode_email_verify_token = decode_email_verify_token
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_INVALID
              })
            }
            return true //qua được hết thì true
          }
        }
      }
    },
    ['query']
  )
)
export const forgotPasswordVadidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true
      }
    },
    ['body']
  )
)
