import express from 'express'
import userRouter from './routes/users.routers'
import databaseService from './services/database.services'

//dùng express tạo server(app)
const app = express()
const PORT = 3000
//call server mongo chạy
databaseService.connect().catch(console.dir)
//cho server xài middleware biến đổi json
//trước khi vào app thì phải đi qua middleware này để biến đổi trước.
// http://localhost:3000 chỉ mới tới đc app thôi.
app.use(express.json())

//server dùng userRouter
//url hiện tại là http://localhost:3000/users/
//ý nghĩa server sử dụng router user và với đường đãn là http://localhost:3000/users/
app.use('/users', userRouter)

//Muốn app mở port 3000
app.listen(PORT, () => {
  console.log('Sever BE đang chạy ở PORT: ' + PORT)
})