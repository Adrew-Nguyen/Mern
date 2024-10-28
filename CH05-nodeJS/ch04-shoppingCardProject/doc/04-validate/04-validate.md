# **_đối với bài này ta sẽ demo bằng 1 folder dự án khác, không phải ch04-twitterProject_**

tạo thư mục `test-express-validator`

# Validate và Sanitize bằng Express Validatior

`https://www.figma.com/file/BeECRO014VsTDbyiWkgUyy/Untitled?type=design&node-id=0%3A1&mode=design&t=jFTd64xLgUqRUEYh-1`

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FBeECRO014VsTDbyiWkgUyy%2FUntitled%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DjFTd64xLgUqRUEYh-1" allowfullscreen></iframe>

- ta cùng nhìn hình ảnh sau và tìm hiểu quy trình register(đăng ký 1 tài khoản)
  ![Alt text](image-29.png)

- chúng ta sẽ k validate bằng tay mà dùng thông qua `express-validator` [trang chủ hướng dẫn](https://express-validator.github.io/docs)

- `express-validator` là 1 middleware cho expressjs
  - điều này có nghĩa là bạn không dùng `express-validator` cho fastify, hay nestjs đc nhe
- `express-validator` giúp ta validator các giá trị nằm trong
  req.body|req.cookies|req.headers|req.params

# cài đặt và setting

- trong folder `test-express-validator`

  ```bash
  npm init --y //tạo dự án nhanh
  touch .gitignore
  npm i express express-validator
  touch index.js
  ```

- trong `.gitignore` thêm

  ```ts
  node_modules/
  dist/
  .env
  ```

- trong `index.js` ta thêm đoạn code mẫu tạo server

  ```js
  const express = require('express')
  const app = express()

  app.use(express.json())
  app.get('/hello', (req, res) => {
    res.send(`Hello, ${req.query.person}!`)
  })

  app.listen(3000, () => {
    console.log('server test validator đang chạy ở port 3000 đó nha')
  })
  ```

  ```bash
  node index // để chạy file index (mở server)
  ```

  mở postman và test thử api này `http://localhost:3000/hello`
  ![Alt text](image-30.png)
  `http://localhost:3000/hello?person=John`
  ![Alt text](image-31.png)

- nếu mình không truyền thì nó sẽ ra hello, undifined!
- lúc này ta sẽ dùng đến express-validator để kiểm soát param này
- trong `index` ta có import thêm như sau

  ```js
  const { query, validationResult } = require('express-validator')
  ```

  - thêm `query("person").notEmpty()` như 1 middleware vào route `/hello`
  - route đó sẽ trông thế này

  ```js
  app.get('/hello', query('person').notEmpty(), (req, res) => {
    const error = validationResult(req) // xem thử có những lỗi nào, từ đó xử lý lỗi nếu có
    if (error.isEmpty()) {
      return res.send(`Hello, ${req.query.person}!`)
    }

    res.status(400).json({ error: error.array() })
  })
  ```

  - nhớ rằng các middlewere này sẽ k tự trả lỗi, mà chỉ lưu lỗi lại để tùy dev quyết định kết quả request
  - sau đó ta tắt server và chạy lại, kiểm tra postman xem nếu ta thiếu query thì nó có còn undefined không ?
    ![Alt text](image-32.png)

- ta có thể custom mấy thông tin lỗi ví dụ như

  ```js
  app.get('/hello', query('person').notEmpty().withMessage("Person query không được bỏ trống nha"), (req, res)
  ```

  ![Alt text](image-33.png)

# Sanitizing inputs

- Sanitizing: vệ sinh dữ liệu đầu vào
- nếu người dùng truyền dữ liệu thông qua cách query trên thì hacker có thể sẽ lợi dụng vào điền này để tấn công server (tấn công XSS)
  - vd: truy cập vào link `http://localhost:3000/hello?person=Diep` thì bth
  - vd2:`http://localhost:3000/hello?person=<strong>Diep</strong>`
    ![Alt text](image-34.png)
  - và điều này đồng nghĩa với việc họ dể dàng chèn 1 tag srcipt để dùng js tấn công hệ thống của chúng ta
- ta có thể xài Sanitizing bằng cách thêm từ method .escape() ở cuối middleware của espress validator là xong

  ```js
  app.get('/hello', query('person').notEmpty().withMessage("Person query không được bỏ trống nha").escape(), (req, res)
  ```

  ![Alt text](image-35.png)

- giống như escape character nó mã hóa những ký tự đặc biệt trong html thành những ký tự bình thường "< > / " và như vậy thì html sẽ k hiểu đó là tag nữa

# Accessing validated data

- espress validator cung cấp cho ta khả năng lấy giá trị của những data đã validated/sanitized thông qua funct `matchedData()`

- vậy ta sẽ chỉnh đoạn code của mình thêm như sau

  - trong index import thêm matchedData

  ```js
  const { query, matchedData, validationResult } = require('express-validator')
  ```

  - phần handler ta sử dụng như sau

  ```js
  app.get("/hello",....
    if (error.isEmpty()) {
      const data = matchedData(req)
      console.log(data)
      return res.send(`Hello, ${req.query.person}!`)
    }
  ...
  ```

  - chạy lại server để test
    ![Alt text](image-36.png)
    server trả về
    ```js
    {
      person: 'diep'
    }
    ```
  - ta thấy rằng nó k nhận đc age, vì sao ?
    vì `matchedData()` chỉ cung cấp cho ta các data validated/sanitized mà thôi
