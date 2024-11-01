// Dựa trên dạng lỗi bình thường {stack: dòng xảy ra lỗi, message}
// ta sẽ tạo ra một loại lỗi mới {status, message}

import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    ;(this.message = message), (this.status = status)
  }
}

//tạo kiểu lỗi không giống thiết kế(validate:: 422)
type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
/**
{
  key: string : {
    msg: string
    msg1: string
    ..........
    msg3: string
  }
}
*/

// xử lý 422 thui ở đây nè
export class EntityError extends ErrorWithStatus {
  //tự có stats và message
  //status: 422
  errors: ErrorType // Danh sách các lỗi
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY }) //Gán mặt định status bằng 422 luôn
    this.errors = errors
  }
}
