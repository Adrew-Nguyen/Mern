import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'

export const serveImageController = (
  req: Request, //
  res: Response,
  next: NextFunction
) => {
  //Người dùng gữi lên filename qua param
  const { namefile } = req.params
  res.sendFile(path.resolve(UPLOAD_DIR, namefile), (error) => {
    if (error) {
      res.status((error as any).status).json({
        message: 'File not found'
      })
    }
  })
}
