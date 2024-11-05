import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'
import { ParsedQs } from 'qs'

//file này lưu các định nghĩa các request mà người dùng gữi lên
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LoginReBody {
  email: string
  password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface logoutReqBoy {
  refresh_token: string
}

export interface emailVerifyReqQuery extends ParsedQs {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}
