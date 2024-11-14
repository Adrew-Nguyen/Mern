import { Router } from 'express'
import { serveImageController } from '~/controllers/static.controllers'
const staticRouter = Router()

staticRouter.get('/image/:namefile', serveImageController)
//:namefile là params
export default staticRouter
