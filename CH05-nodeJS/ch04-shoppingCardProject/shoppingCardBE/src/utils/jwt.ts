// File này lưu hàm tiện ích giúp mình
// liên kết với sevices jwt và nhớ nó ký cho mình 1 token

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { reject } from 'lodash'
import { TokenPayload } from '~/models/requests/users.requests'

dotenv.config()

//signToke(): hàm ký token
// chúng ta nên nhận vào 1 đối tượng chứa 3 field hơn là truyền 3 param vô
//và vì truyền vậy thì cũng sợ truyền sai thứ tự vì mình đã định nghĩa rồi
// sẽ viết và định nghĩa như này
export const signToken = ({
  payLoad,
  // nếu option mà có được truyền thì dùng cái được truyền còn không thì dùng cái đã gán đây
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payLoad: string | object | Buffer
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  // vì muốn phải ký tên trước rồi mới làm mấy khác nên mình bọc promise vô
  // rồi ném promise ra luốn để sau này muốn dùng sao thì .then .catch luôn
  return new Promise<string>((resolve, reject) => {
    // Kêu JWT ký
    jwt.sign(payLoad, privateKey, options, (error, token) => {
      //Nếu thất bại
      if (error) throw reject(error)
      //Nếu thì ném token ra
      else resolve(token as string)
    })
  })
}

//hàm kiểm tra token có khớp chữ ký không và trả về payload của token đó
export const verifyToken = ({
  token,
  privateKey = process.env.JWT_SECRET as string
}: {
  token: string
  privateKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decode) => {
      if (error) throw reject(error)
      else return resolve(decode as TokenPayload)
    })
  })
}
//Ví dụ
// signToken({ payLoad: { user_id: '123123', age: 12 }, privateKey: 'ahihi' })
