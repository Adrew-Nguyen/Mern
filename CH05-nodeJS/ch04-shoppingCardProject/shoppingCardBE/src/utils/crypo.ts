import { createHash } from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

// Viết hàm nhận vào content nào đó và mã hóa nó thành sha256(hàm băm => chỉ một chiều không có decode đc)
function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

//Viết hàm mã hóa password
export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
