// file này chứa hàm error handle tổng
import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

// lỗi từ toàn bộ hệ thống sẽ được dồn về đây
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  //err là lỗi từ các nơi truyền xuống
  //và sẽ thông báo ra một lỗi chỉ có hai thuộc tính là status và msg
  return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
