import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/schemas/Errors'

//Validationchain: danh sách lỗi
//RunnableValidationChains<ValidationChain>: khi chạy thì mới nhận được Validationchain

//Hàm validate sẽ nhận vào checkShema và trả ra middleware xử lý lỗi
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // tạo danh sách lỗi cất vào req vì kiểu dữ liệu trả ra của schema phải run thì mới có
    const errors = validationResult(req) // lấy danh sách lỗi trong req dưới dạng mảng.
    // Nếu không có lỗi gì hết thì  qua controller xử lý tiếp
    if (errors.isEmpty()) {
      return next()
    }
    //Ngược lại thì xử lý lỗi
    //Dùng mapped để thu thu gọn lỗi lại chỉ để đại điện
    const errorObject = errors.mapped()
    // đầu tiên đưa cho nó một object không có lỗi
    const entityError = new EntityError({ errors: {} })
    //for-in duyệt key
    for (const key in errorObject) {
      //Dùng cấu trúc phân rã và chỉ lấy msg thui
      const { msg } = errorObject[key]
      // nếu msg có dạng  giống ErrorWithStatus và là lỗi có mã khác 422
      // thì ném cho tầng error handler xử lý
      // Ở đây chỉ xử lý những lỗi 422
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        next(msg)
      }
      // nếu nó là lỗi 422 thì lấy msg rồi gán vô mảng errors
      entityError.errors[key] = errorObject[key].msg
    }
    // res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
    //   //errors == errors: errors
    //   errors: entityError
    // })
    // sau khi tổng hợp xong các lỗi 422 rồi thì ném vè error hanhler xử lý
    next(entityError)
  }
}
