// import 3 interface giúp mô tả req, res, next do express cung cấp.
import { Request, Response, NextFunction } from 'express'

// import checkSchema dùng để check schema của một object
import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'

import { validate } from '~/utils/validation'

// middleware giống như một túi lọc
// users gữi request lên cho mình
// mình sẽ ép req đi qua các middlewares để kiểm tra
// và khi chạm vào và chạm được next() thì mới qua.

// làm 1 middlewares kiểm tra người dùng có gữi lên username và password
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  //muốn xem body của request này có gì
  //console.log(res)
  //phụ thuộc vào req nếu có body thì mới có không thì undefinded.
  //Lấy thử trong  body của req có email và password hay không.
  const { email, password } = req.body
  //nếu không có thì không được đi tiếp
  if (!email || !password) {
    res.status(422).json({
      errorMsg: 'Missing email or password'
    })
  }
  return next()
}

export const registerValidator = validate(
  checkSchema({
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
            throw new Error(`Confirm_password does not match password`)
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
  })
)
