import express, { Router } from 'express'
import { UPLOAD_DIR } from '~/constants/dir'
import { uploadSingleImageController } from '~/controllers/medias.controllers'
import { wrapAsync } from '~/utils/handlers'
const mediaRouter = Router()

//setup route
mediaRouter.post('/upload-image', wrapAsync(uploadSingleImageController))
//Cach 1:  mediaRouter.use('/', express.static(UPLOAD_DIR))
//Cách 2:

export default mediaRouter
