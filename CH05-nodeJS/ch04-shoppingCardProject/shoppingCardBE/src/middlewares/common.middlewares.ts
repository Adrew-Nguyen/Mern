//Đây là một middleware giúp mình lọc lại request body chỉ lấy những thứ mình muốn
//còn những cái mình không muốn thì bỏ đi

import { pick } from 'lodash'
import { Request, Response, NextFunction } from 'express'

// FilterKeys<T>: là mảng các key của object T nào đó
type FilterKeys<T> = Array<keyof T>

export const filterMiddleware = <T>(filterKeys: FilterKeys<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //middleware này mod lại req.body bằng những filterKeys đã liệt kê
    req.body = pick(req.body, filterKeys)
    next()
  }
}
