import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs' // thao tác file|| folder
// import path from 'path' // cho đường dẫn
import {
  UPLOAD_IMAGE_DIR, //
  UPLOAD_IMAGE_TEMP_DIR,
  UPLOAD_VIDEO_DIR,
  UPLOAD_VIDEO_TEMP_DIR
} from '~/constants/dir'

//initFolder: hàm kiểm tra xem có folder `uploads` không
//Nếu chưa có thì tạo mới.
/*
  Bản chất kiểm xem các folder đó đã tạo chưa. Nếu chưa thì tạo
  Mạch logic là y chang nhau vì thể tránh lạm lại code thì ta
  ném vào một mảng rồi duyệt từng hằng.
*/
export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
    //Nếu mà đường dẫn không dẫn tới thư mục thì tạo mới
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // đệ quy || có thể tạo lòng các thư mục vào nhau
      })
    }
  })
}

//handleUploadImage(): là hàm nhận vào req và ép req đi qua lưới lọc
//của `formidable` để lấy các file
//và mình sẽ chỉ lấy các file nào là ảnh
export const handleUploadImage = async (req: Request) => {
  //Tạo lưới lọc
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 4,
    maxFileSize: 300 * 1024 * 4, // 300KB * 4
    keepExtensions: true, // giữ lại đuôi của file
    filter: ({ name, originalFilename, mimetype }) => {
      //name: name || key được truyền vào trong <input name = "blabla">
      //originalFilename: tên gốc của file
      //mimetype: định dạng kiểu file
      // console.log(name, originalFilename, mimetype)
      //file gữi lên thì file trong field có name là image và kiểu file image
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type not valid') as any)
      }
      return valid
    }
  })
  // Xài form vừa tạo
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.image as File[])
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

export const getExtension = (filename: string) => {
  const nameArr = filename.split('.')
  return nameArr.pop()
  //pop xóa phần tủ ở cuối và trả ra phần tử bị xóa
}

export const handleUploadVideo = async (req: Request) => {
  //Tạo lưới lọc
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_DIR,
    maxFiles: 1,
    maxFileSize: 1024 * 1024 * 50, // 50MB
    keepExtensions: true, // giữ lại đuôi của file
    filter: ({ name, originalFilename, mimetype }) => {
      //name: name || key được truyền vào trong <input name = "blabla">
      //originalFilename: tên gốc của file
      //mimetype: định dạng kiểu file
      // console.log(name, originalFilename, mimetype)
      //file gữi file trong field có name là image và kiểu file image
      const valid = name === 'video' && Boolean(mimetype?.includes('video'))
      if (!valid) {
        form.emit('error' as any, new Error('File type not valid') as any)
      }
      return valid
    }
  })
  // Xài form vừa tạo
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      if (!files.video) {
        return reject(new Error('Video is empty'))
      }
      return resolve(files.video as File[])
    })
  })
}
