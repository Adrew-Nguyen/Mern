// controller là tầng xử lý logic và call database
import { Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/users.requests'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'

export const loginController = (req: Request, res: Response) => {
  //thêm tý logic trước khi trả kết quả cho người dùng
  const { email, password } = req.body
  //mình sẽ fake dữ liệu vì chưa có database
  //nên mình sẽ kiểm tra ngta bằng 1 password nào đó
  //khi nào có database thì mình sẽ lên services mình kiểm tra
  if (email === 'nhatruong5012@gmail.com' && password === 'nhatruong5012@gmail.com') {
    res.json({
      data: {
        fname: 'Trường',
        yob: 2005
      }
    })
  } else {
    res.status(400).json({
      errorMsg: 'Invalid email or password'
    })
  }
}

//route này nhận email và password để tạo tk cho mình
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  //lấy email và password từ người dùng muốn đăng kí tài khoản
  const { email } = req.body
  //tạo user và lưu vào database
  try {
    //Kiểm tra email đã tồn tại chưa
    const isDup = await userService.checkEmailExist(email)
    if (isDup) {
      //flow 1:  res.status(400) => không nên
      //flow 2:
      // throw new Error('Email has been used')
      // nhưng cũng không nên vì trong error có thuộc tính tên là `message` và bộ cờ của nó enumrable: false thì khi thông báo lỗi sẽ hông hiện lỗi ra
      // Cách fix:
      const customError = new Error('Email has been used')
      Object.defineProperty(customError, 'message', {
        enumerable: true
      })
      throw customError
    }
    const result = await userService.register(req.body)
    // nếu thành công thì
    res.status(201).json({
      msg: 'Register success!',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      errMsg: 'Register failed!',
      error
    })
  }
}
