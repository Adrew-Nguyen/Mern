import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullNameFile, handleUploadSingleImage } from '~/utils/file'
import fs from 'fs'
class MediaService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req) // thu hoạch file từ req
    // đặt trên mới cho file
    const newFileName = getNameFromFullNameFile(file.newFilename) + '.jpg'
    const newPath = UPLOAD_DIR + '/' + newFileName
    //filepath: đường dẫn đến cái file cần optimize
    //optimize bức hình
    const infor = await sharp(file.filepath).jpeg().toFile(newPath)
    fs.unlinkSync(file.filepath) // xóa file ở temp
    //Cung cấp route link để người dung vào xem hình vừa up
    return `http://localhost:3000/static/image/${newFileName}`
  }
}

const mediasServices = new MediaService()
export default mediasServices
