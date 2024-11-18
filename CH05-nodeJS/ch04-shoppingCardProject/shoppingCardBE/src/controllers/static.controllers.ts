import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import fs from 'fs'
import mime from 'mime-types'

export const serveImageController = (
  req: Request, //
  res: Response,
  next: NextFunction
) => {
  //Người dùng gữi lên filename qua param
  const { namefile } = req.params
  res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, namefile), (error) => {
    if (error) {
      res.status((error as any).status).json({
        message: 'File not found'
      })
    }
  })
}

export const serveVideoController = (
  req: Request, //
  res: Response,
  next: NextFunction
) => {
  //Người dùng gữi lên filename qua param
  const { namefile } = req.params
  res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, namefile), (error) => {
    if (error) {
      res.status((error as any).status).json({
        message: 'Video not found'
      })
    }
  })
}

export const serveVideoStreamController = async (req: Request, res: Response, next: NextFunction) => {
  const { namefile } = req.params //lấy namefile từ param string
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, namefile) //đường dẫn tới file video
  const range = req.headers.range //lấy cái range trong headers
  // console.log(range)
  //nếu k có range thì báo lỗi, đòi liền
  if (!range) {
    res.status(HTTP_STATUS.BAD_REQUEST).send('Require range header')
  } else {
    //1MB = 10^6 byte (tính theo hệ 10, đây là mình thấy trên đt,UI)
    //tính theo hệ nhị là 2^20 byte (1024*1024)
    //giờ ta lấy dung lượng của video
    const videoSize = fs.statSync(videoPath).size //ở đây tính theo byte
    //dung lượng cho mỗi phân đoạn muốn stream
    const CHUNK_SIZE = 10 ** 6 //10^6 = 1MB
    //lấy giá trị byte bắt đầu từ header range (vd: bytes=8257536-29377173/29377174)
    //8257536 là cái cần lấy
    const start = Number(range.replace(/\D/g, '')) //lấy số đầu tiên từ còn lại thay bằng ''
    // console.log('start: ', start)
    //lấy giá trị byte kết thúc-tức là khúc cần load đến
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1) //nếu (start + CHUNK_SIZE) > videoSize thì lấy videoSize
    // console.log('end: ', end)
    //dung lượng sẽ load thực tế
    const contentLength = end - start + 1 //thường thì nó luôn bằng CHUNK_SIZE, nhưng nếu là phần cuối thì sẽ nhỏ hơn
    const contentType = mime.lookup(videoPath) || 'video/*' //lấy kiểu file, nếu k đc thì mặc định là video/*
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`, //end-1 vì nó tính từ 0
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType
    }
    res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers) //trả về phần nội dung
    //khai báo trong httpStatus.ts PARTIAL_CONTENT = 206: nội dung bị chia cắt nhiều đoạn
    const videoStreams = fs.createReadStream(videoPath, { start, end }) //đọc file từ start đến end
    videoStreams.pipe(res)
    //pipe: đọc file từ start đến end, sau đó ghi vào res để gữi cho client
  }
}
