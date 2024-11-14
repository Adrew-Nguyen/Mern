//userService chứa các method giúp xử lý liên quan đến users collection
import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { LoginReBody, RegisterReqBody, UpdateMeReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypo'
import { signToken } from '~/utils/jwt'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ErrorWithStatus } from '~/models/schemas/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'

class UserService {
  // Viết hàm dùng JWT để ký access token
  private signAccessToken(user_id: string) {
    return signToken({
      payLoad: { user_id, token_type: TokenType.AccessToken },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }

  // Viết hàm dùng JWT để ký access token
  private signRefreshToken(user_id: string) {
    return signToken({
      payLoad: { user_id, token_type: TokenType.RefreshToken },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }

  // Viết hàm dùng JWT để ký email_verify_token
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payLoad: { user_id, token_type: TokenType.EmailVerificationToken },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN }
    })
  }

  // Viết hàm dùng JWT để ký forgot_password_token
  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payLoad: { user_id, token_type: TokenType.ForgotPasswordToken },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN }
    })
  }

  async register(payload: RegisterReqBody) {
    let user_id = new ObjectId()
    //Ký email_verify_token
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    const result = await databaseService.users.insertOne(
      new User({
        _id: user_id,
        username: `user${user_id.toString()}`,
        email_verify_token,
        ...payload,
        password: hashPassword(payload.password), //override
        date_of_birth: new Date(payload.date_of_birth) // override
      })
    )
    //Muốn sau khi tạo tài khoản và lưu lên database ta sẽ lý access và refresh đưa cho users
    // nhưng mà muốn kì thì cần user_ID
    // const user_id = result.insertedId.toString()
    //Ký
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id.toString()),
      this.signRefreshToken(user_id.toString())
    ])
    //gữi email_verify_token vào email của người đăng ký
    console.log(`Gữi mail link xác thực sau:
      http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}
      `)

    //Lưu rf
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //
    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string) {
    //kiểm tra email có tồn tại hay chưa
    // có 2 flow :
    //1. lên database lấy danh sach email về => nguy hiểm trên đương đi có thể bị mất và chưa tính tới database có nhiều email nữa
    //2. lên database tìm user sở hữu email này
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async findUserById(user_id: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND, //404
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //neu co th
    return user
  }

  async login({ email, password }: LoginReBody) {
    // vào database tìm user sỡ hữu 2 thông tin này
    const user = await databaseService.users.findOne({
      email,
      password: hashPassword(password)
    })
    //email và password không tìm thấy user => email và password sai
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }
    //Nếu qua if thì nghĩa là user => đúng
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    //luu rf
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //ném object chứa 2 cái token
    return {
      access_token,
      refresh_token
    }
  }

  async checkRefreshToken({ user_id, refresh_token }: { user_id: string; refresh_token: string }) {
    const refreshToken = await databaseService.refresh_tokens.findOne({
      user_id: new ObjectId(user_id),
      token: refresh_token
    })
    if (!refreshToken) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED, //401
        message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVAILD
      })
    }
    return refreshToken
  }

  async checkForgotPasswordToken({
    user_id,
    forgot_password_token
  }: {
    user_id: string //
    forgot_password_token: string
  }) {
    //tìm user với 2 thông tin trên, không có thì chữi, có thì return
    const user = await databaseService.users.findOne({
      _id: new ObjectId(user_id),
      forgot_password_token
    })
    // Nếu không tìm ra
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_INVALID
      })
    }
    //Nếu có user thì
    return true
  }
  async logout(refresh_token: string) {
    console.log(refresh_token)
    await databaseService.refresh_tokens.deleteOne({
      token: refresh_token
    })
  }

  async checkEmailVerifyToken({ user_id, email_verify_token }: { user_id: string; email_verify_token: string }) {
    //tim xem user nao co so huu hai thong tin nay cung luc neu co thi nghia la token hop le neu khong co token nay da bi thay the
    const user = await databaseService.users.findOne({
      _id: new ObjectId(user_id), // nguoi dung dua cho minh la string ma minh can objectID
      email_verify_token
    })
    //neu khong co thi nghia la no da bi thay the
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_INVALID
      })
    }
    //neu co thi
    return user // thay the cho chu true
  }

  async checkEmailVerify(user_id: string) {
    //tìm xem đã verify hay chưa
    const user = await databaseService.users.findOne({
      _id: new ObjectId(user_id), //
      verify: UserVerifyStatus.Verified
    })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.FORBBIDEN, //403
        message: USERS_MESSAGES.USER_NOT_VERIFIED
      })
    }
    return true
  }
  async verifyEmail(user_id: string) {
    // goi ham nay khi da kiem tra email_verify_token dung ma dung nguoi dung
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: {
            verify: UserVerifyStatus.Verified,
            email_verify_token: '',
            updated_at: '$$NOW'
          }
        }
      ]
    )
    // ky lai access va rf
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    //luu rf
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //ném object chứa 2 cái token
    return {
      access_token,
      refresh_token
    }
  }

  async resendEmailVerify(user_id: string) {
    //Ký email_verify_token
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    //gữi email_verify_token vào email của người đăng ký
    console.log(`Gữi mail link xác thực sau:
      http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}
      `)
    //luu vao ai database
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: {
            email_verify_token,
            updated_at: '$$NOW'
          }
        }
      ]
    )
  }

  async forgotPassword(email: string) {
    //dung email tim user lay id tao forgot_password_token
    const user = await databaseService.users.findOne({ email })
    if (user) {
      const user_id = user._id.toString()
      //ky forgor_password_token
      const forgot_password_token = await this.signForgotPasswordToken(user_id)
      //luu vao database
      await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
        {
          $set: {
            forgot_password_token,
            updated_at: '$$NOW'
          }
        }
      ])
      //gui email cai link cho nguoi dung
      console.log(`Gữi mail link xác thực sau:
      http://localhost:8000/reset-password/?forgot_password_token=${forgot_password_token}
      `)
    }
  }

  async resetPasseord({
    user_id,
    password
  }: {
    user_id: string //
    password: string
  }) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            password: hashPassword(password),
            forgot_password_token: '',
            updated_at: '$$NOW'
          }
        }
      ]
    )
  }

  async getMe(user_id: string) {
    const userInfor = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) }, //
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return userInfor
  }
  async updateMe({ user_id, payload }: { user_id: string; payload: UpdateMeReqBody }) {
    //User_id giúp mình tìm user cập nhật
    //payload là những gì người dùng muốn cập nhật, mình không biết họ đã gữi lên những gì
    //Nếu date_of_birth thì nó phải chuyển về Date
    const _payload = payload.date_of_birth //
      ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } //
      : payload
    //nếu username được gữi lên thì phải unique
    if (_payload.username) {
      const isDup = await databaseService.users.findOne({ username: _payload.username })
      if (isDup) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
          message: USERS_MESSAGES.USERNAME_ALREADY_EXISTS
        })
      }
    }
    // Nếu qua hết thì cập nhật
    const userInfor = await databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            ..._payload,
            updated_at: '$$NOW'
          }
        }
      ],
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return userInfor // Trả ra để người dùng xem
  }

  async changePassword({
    user_id,
    old_password,
    password
  }: {
    user_id: string //
    old_password: string //
    password: string //
  }) {
    const user = await databaseService.users.findOne({
      _id: new ObjectId(user_id),
      password: hashPassword(old_password)
    })
    //Nếu không có user nào hết thì
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //Nếu tìm được user thì tiến hành cập nhật
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          password: hashPassword(password),
          updated_at: '$$NOW'
        }
      }
    ])
  }

  async refreshToken({
    user_id,
    refresh_token
  }: {
    user_id: string //
    refresh_token: string
  }) {
    // Tạo ac và rf token (chua tinh truong hop route timeing)
    const [access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken(user_id), //
      this.signRefreshToken(user_id)
    ])
    //Xóa rf cũ
    await databaseService.refresh_tokens.deleteOne({ token: refresh_token })
    //Luu ma moi
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        token: new_refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    // nem 2 ma ms tao
    return {
      access_token,
      refresh_token: new_refresh_token
    }
  }
}

let userService = new UserService()
export default userService
