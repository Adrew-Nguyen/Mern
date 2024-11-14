import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs' // thao tác file|| folder
// import path from 'path' // cho đường dẫn
import { UPLOAD_TEMP_DIR } from '~/constants/dir'

//initFolder: hàm kiểm tra xem có folder uploads không
export const initFolder = () => {
  //Nếu mà đường dẫn không dẫn tới thư mục thì tạo mới
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true // đệ quy || có thể tạo lòng các thư mục vào nhau
    })
  }
}

//handleUploadImage(): là hàm nhận vào req và ép req đi qua lưới lọc
//của formidable để lấy các file
//và mình sẽ chỉ lấy các file nào là ảnh
export const handleUploadSingleImage = async (req: Request) => {
  //Tạo lưới lọc
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    maxFileSize: 300 * 1024, // 300KB
    keepExtensions: true, // giữ lại đuôi của file
    filter: ({ name, originalFilename, mimetype }) => {
      //name: name || key được truyền vào trong <input name = "blabla">
      //originalFilename: tên gốc của file
      //mimetype: định dạng kiểu file
      // console.log(name, originalFilename, mimetype)
      //file gữi file trong field có name là image và kiểu file image
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type not valid') as any)
      }
      return valid
    }
  })
  // Xài form vừa tạo
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve((files.image as File[])[0])
    })
  })
}

// Hàm tiện ích, nhận vào filename: addđdsewd.png
// lấy "addđdsewd" thôi bỏ ".png" để sau này thêm ".jpeg"
export const getNameFromFullNameFile = (filename: string) => {
  const nameArray = filename.split('.')
  nameArray.pop() // bỏ cuối
  return nameArray.join('-')
}
