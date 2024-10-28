//userService chứa các method giúp xử lý liên quan đến users collection

import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypo'

class UserService {
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password), //override
        date_of_birth: new Date(payload.date_of_birth) // override
      })
    )
    return result
  }
  //kiểm tra email có tồn tại hay chưa
  // có 2 flow :
  //1. lên database lấy danh sach email về => nguy hiểm trên đương đi có thể bị mất và chưa tính tới database có nhiều email nữa
  //2. lên database tìm user sở hữu email này
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}

let userService = new UserService()
export default userService
