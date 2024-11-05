// file này chứa hàm error handle tổng
import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/schemas/Errors'

// lỗi từ toàn bộ hệ thống sẽ được dồn về đây
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  //err là lỗi từ các nơi truyền xuống
  //và sẽ thông báo ra một lỗi chỉ có hai thuộc tính là status và msg
  // return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
  //Fix
  //lỗi từ mọi nơi truyền về
  //có 2 dạng : errorwithstatus và phần còn lại
  if (err instanceof ErrorWithStatus) {
    res.status(err.status).json(omit(err, ['status']))
  } else {
    // Xử lý những lỗi còn lại
    // Có rất nhiều thông tin lại
    // đặc biệt: không có status
    Object.getOwnPropertyNames(err).forEach((key) => {
      Object.defineProperty(err, key, { enumerable: true })
    })
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      errorInfor: omit(err, ['stack'])
    })
  }
}
