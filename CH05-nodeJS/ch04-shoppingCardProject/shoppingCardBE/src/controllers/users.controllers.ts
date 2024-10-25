// controller là tầng xử lý logic và call database
import { Request, Response } from 'express'
import userService from '~/services/users.services'
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
export const registerController = async (req: Request, res: Response) => {
  //lấy email và password từ người dùng muốn đăng kí tài khoản
  const { email, password } = req.body
  //tạo user và lưu vào database
  try {
    const result = await userService.register({
      email,
      password
    })
    // nếu thành công thì
    res.status(200).json({
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
