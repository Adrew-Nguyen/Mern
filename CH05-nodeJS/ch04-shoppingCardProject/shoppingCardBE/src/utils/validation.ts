import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { Request, Response, NextFunction } from 'express'

//Validationchain: danh sách lỗi
//RunnableValidationChains<ValidationChain>: khi chạy thì mới nhận được Validationchain

//Hàm validate sẽ nhận vào checkShema và trả ra middleware xử lý lỗi
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // tạo danh sách lỗi cất vào req vì kiểu dữ liệu trả ra của schema phải run thì mới có
    const errors = validationResult(req) // lấy danh sách lỗi trong req dưới dạng mảng.
    if (errors.isEmpty()) {
      return next()
    } else {
      res.status(422).json({
        msg: 'Invalid value',
        //errors == errors: errors
        errors: errors.mapped()
      })
    }
  }
}
