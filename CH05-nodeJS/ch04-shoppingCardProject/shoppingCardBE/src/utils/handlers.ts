import { Request, Response, NextFunction, RequestHandler } from 'express'
// file này chứa hàm có có tên là wrapAsync
// wrapAsync là một hàm nhận `async request handler`
// và tạo ra cấu trúc try catch next cho `async request handler`
// từ đó  `async request handler` có thể throw thoải mái mà không cần try catch next

export const wrapAsync = <P, T>(func: RequestHandler<P, any, any, T>) => {
  return async (req: Request<P, any, any, T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
