// import 3 interface giúp mô tả req, res, next do express cung cấp.
import { Request, Response, NextFunction } from 'express'
// middleware giống như một túi lọc
// users gữi request lên cho mình
// mình sẽ ép req đi qua các middlewares để kiểm tra
// và khi chạm vào và chạm được next() thì mới qua.

// làm 1 middlewares kiểm tra người dùng có gữi lên username và password
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  //muốn xem body của request này có gì
  //console.log(res)
  //phụ thuộc vào req nếu có body thì mới có không thì undefinded.
  //Lấy thử trong  body của req có email và password hay không.
  const { email, password } = req.body
  //nếu không có thì không được đi tiếp
  if (!email || !password) {
    res.status(422).json({
      errorMsg: 'Missing email or password'
    })
  }
  return next()
}
