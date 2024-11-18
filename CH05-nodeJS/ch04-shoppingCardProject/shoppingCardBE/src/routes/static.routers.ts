import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/static.controllers'
const staticRouter = Router()

staticRouter.get('/image/:namefile', serveImageController)
staticRouter.get('/video/:namefile', serveVideoStreamController)
//:namefile là params
export default staticRouter
