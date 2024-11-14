import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import mediasServices from '~/services/medias.services'
import { getNameFromFullNameFile, handleUploadSingleImage } from '~/utils/file'

export const uploadSingleImageController = async (
  req: Request, //
  res: Response, //
  next: NextFunction
) => {
  //Khi người ta upload hình lên thì mình sẽ kiểm tra
  //hình bằng formidble
  // "_dirname": chứa đường dẫn tuyệt đối đến thư mục chứa file đang chạy
  // "path.resolve("upload")": đường dẫn đến thư mục mà mình muốn lưu file

  // const form = formidable({
  //   uploadDir: path.resolve('uploads'), // nơi sẽ lưu nếu vượt qua kiểm duyệt
  //   maxFiles: 1, // tối đa 1 file
  //   keepExtensions: true, // giữ lại đuôi file
  //   maxFileSize: 1024 * 300 // tối đa một hình không quá 300KB
  // })
  // // tiến hình sài form để kiểm tra hình
  // form.parse(req, (err, fields, file) => {
  //   // files: là object chứa các file đã tải lên server
  //   // nếu không upload file nào thì files sẽ là Ơ
  //   if (err) {
  //     throw err
  //   } else {
  //     res.json({ message: 'upload file successfully' })
  //   }
  // })
  const infor = await mediasServices.handleUploadSingleImage(req)
  res.json({
    message: 'upload file successfully', //
    infor
  })
}
