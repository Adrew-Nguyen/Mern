//userService chứa các method giúp xử lý liên quan đến users collection

import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypo'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UserService {
  // Viết hàm dùng JWT để ký access token
  private signAccessToken(user_id: string) {
    return signToken({
      payLoad: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }
  // Viết hàm dùng JWT để ký access token
  private signRefreshToken(user_id: string) {
    return signToken({
      payLoad: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password), //override
        date_of_birth: new Date(payload.date_of_birth) // override
      })
    )
    //Muốn sau khi tạo tài khoản và lưu lên database ta sẽ lý access và refresh đưa cho users
    // nhưng mà muốn kì thì cần user_ID
    const user_id = result.insertedId.toString()
    //Ký
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
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
}

let userService = new UserService()
export default userService
