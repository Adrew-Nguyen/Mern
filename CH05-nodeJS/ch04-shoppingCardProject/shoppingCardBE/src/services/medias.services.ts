import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { getNameFromFullNameFile, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
class MediaService {
  async handleUploadImage(req: Request) {
    // Lấy file từ req trong body
    const files = await handleUploadImage(req) 
    // đặt trên mới cho file
    // Bản chất hình ta upload lên thì có đuôi là `png` này khá năng vì thế cần tối ưu
    // chúng ta sẽ nén lại bằng cách đổi kiểu đuôi qua `jpg`
    const result = Promise.all(
      //files là một danh sách chứa các file đc upload lên qua đã qua các tầng xử lý kiểm tra
      //và giờ cần tối ưu
      //bởi vì chúng ta muốn thay đổi chúng theo một công thức nhất định là đổi đuôi sang `jpg`
      //mà files còn là mãng thì thế ta sẽ sử dụng map để làm điều này
      files.map(async (file) => {
        const newFileName = getNameFromFullNameFile(file.newFilename) + '.jpg'
        //cập nhật đường dẫn tới file
        const newPath = UPLOAD_IMAGE_DIR + '/' + newFileName
        //filepath: đường dẫn đến cái file cần optimize
        //optimize bức hình chúng ta sẽ sử dụng `sharp` để làm điều này
        const infor = await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath) // xóa file ở temp
        //Cung cấp route link để người dung vào xem hình vừa up
        //trả ra đường link đến file image vừa optimize
        return {
          url: `http://localhost:3000/static/image/${newFileName}`,
          type: MediaType.Image
        } as Media
      })
    )
    //Đưa ra danh sách chứa các link tới các bức hình đã optimize
    return result
  }
  async handleUploadVideo(req: Request) {
    const files = await handleUploadVideo(req) // thu hoạch file từ req
    // đặt trên mới cho file
    const result = Promise.all(
      files.map(async (file) => {
        const newFileName = file.newFilename
        const newPath = UPLOAD_VIDEO_DIR + '/' + newFileName
        return {
          url: `http://localhost:3000/static/video/${newFileName}`,
          type: MediaType.Video
        } as Media
      })
    )
    return result
  }
}

const mediasServices = new MediaService()
export default mediasServices
