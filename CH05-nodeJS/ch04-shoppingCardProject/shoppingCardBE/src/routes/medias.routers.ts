import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

//Create Router media
const mediaRouter = Router()

//Setup route

//Upload image
mediaRouter.post('/upload-image', accessTokenValidator, wrapAsync(uploadImageController))

//Upload video
mediaRouter.post('/upload-video', accessTokenValidator, wrapAsync(uploadVideoController))

//Cach 1:  mediaRouter.use('/', express.static(UPLOAD_IMAGE_DIR))
//Cách 2:

export default mediaRouter
