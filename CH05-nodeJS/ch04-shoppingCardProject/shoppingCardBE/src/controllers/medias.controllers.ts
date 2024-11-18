import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import mediasServices from '~/services/medias.services'

export const uploadImageController = async (
  req: Request, //
  res: Response, //
  next: NextFunction
) => {
  //Khi người ta upload hình lên thì mình sẽ kiểm tra hình bằng formidble
  // "_dirname": `chứa đường dẫn tuyệt đối` đến thư mục chứa file đang chạy
  // "path.resolve("upload")": lấy đường dẫn đến thư mục mà mình muốn lưu file
  // const form = formidable({
  //   //Setup dir chứa image nếu qua được tầng controller(kiểm duyệt thành công)
  //   uploadDir: path.resolve('uploads'),
  //   //Setup dirn đó chứa bao được bao nhiêu file
  //   maxFiles: 1,
  //   //Set up giữ lại đuôi file
  //   keepExtensions: true,
  //   //Setup kích thước tối đa của một file
  //   // Theo đơn vị là `byte`
  //   maxFileSize: 1024 * 300 // tối đa một hình không quá 300KB
  // })

  // Sài `form` để kiểm tra hình sau hình đẩy lên
  // form.parse(req, (err, fields, file) => {
  //   // files: là object chứa các file đã tải lên server
  //   // nếu không upload file nào thì files sẽ là []
  //   if (err) {
  //     throw err
  //   } else {
  //     res.json({ message: 'upload file successfully' })
  //   }
  // })

  // Thay vì chúng ta code quá nhiều khâu xử lý trong một function như trên
  // chúng ta nên tách lớp nó ra
  const infor = await mediasServices.handleUploadImage(req)
  
  res.json({
    message: 'upload file successfully', //
    infor
  })
}

export const uploadVideoController = async (
  req: Request, //
  res: Response, //
  next: NextFunction
) => {
  const infor = await mediasServices.handleUploadVideo(req)
  res.status(HTTP_STATUS.OK).json({
    message: 'Upload video successfully',
    infor
  })
}
