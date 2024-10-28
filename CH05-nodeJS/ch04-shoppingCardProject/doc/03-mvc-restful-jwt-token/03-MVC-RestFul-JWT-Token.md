# MVC Pattern trong Express

đây là mô hình mvc cơ bản
![Alt text](image-23.png)
ta có thể thấy điểm tương đồng trên với hình dưới này
![Alt text](image-22.png)
ta có để xem lại code của mình phần register để thấy sự tương đồng trong mô hình mvc mà mình đang làm

# REST

## REST là gì?

**REST** là viết tắt của **RE**presentational **S**tate **T**ransfer, là quy ước một số quy tắc ràng buộc khi thiết kế hệ thống mạng.

REST giúp client tương tác với server mà không cần biết cách hoạt động server như thế nào.

REST có một số ràng buộc:

- **Uniform Interface** (Giao diện thông nhất)

- **Stateless** (Không trạng thái)

- **Cacheable** (Dữ liệu có thể lưu vào bộ nhớ cache)

- **Client-Server** (Máy khách - Máy chủ)

- **Layered System** (Hệ thống phân lớp)

- **Code on Demand** (Code theo yêu cầu)

## API là gì?

**API** là cơ chế cho phép 2 thành phần phần mềm giao tiếp với nhau bằng một tập hợp các định nghĩa và giao thức.

**Ví dụ**: hệ thống phần mềm của cơ quan thời tiết chứa dữ liệu về thời tiết hàng ngày. Ứng dụng thời tiết trên điện thoại của bạn sẽ “trò chuyện” với hệ thống này qua API và hiển thị thông tin cập nhật về thời tiết hàng ngày trên điện thoại của bạn.

## RESTful API là gì?

**RESTful API** là một API chuẩn REST. Chuẩn REST đọc khá là khó hiểu, học thuật vậy nên API của bạn chỉ cần áp dụng những kỹ thuật dưới đây thì có thể coi là chuẩn REST.

### Sử dụng các phương thức HTTP để request có ý nghĩa

- **GET**: Đọc tài nguyên
- **PUT**: Cập nhật tài nguyên
- **DELETE**: Xóa tài nguyên
- **POST**: Tạo mới tài nguyên

### Cung cấp tên tài nguyên hợp lý

Tạo ra một API tuyệt vời là 80% nghệ thuật và 20% khoa học.
Ví dụ:

- Sử dụng id định danh cho URL thay vì dùng query-string. Sử dụng URL query-string cho việc filter chứ không phải cho việc lấy một tài nguyên

  - **Good**: `/users/123`
  - **Poor**: `/api?type=user&id=23`

- Thiết kế cho người sử dụng chứ không phải thiết kế cho data của bạn

- Giữ cho URL ngắn và dễ đọc nhất cho client

- Sử dụng số nhiều trong URL để có tính nhất quán
  - **Nên dùng**: `/customers/33245/orders/8769/lineitems/1`
  - **Không nên**: `/customer/33245/order/8769/lineitem/1`

### Sử dụng các HTTP response code để xác định trạng thái API trả về

- **200 OK**: Thành công
- **201 CREATED**: Tạo thành công (có thể từ method POST hoặc PUT)
- **204 NO CONTENT**: Thành công nhưng không có gì trả về trong body cả, thường được dùng cho DELETE hoặc PUT
- **400 BAD REQUEST**: Lỗi, có thể nguyên nhân từ validate lỗi, thiếu data,...
- **401 UNAUTHORIZED**: Lỗi liên quan đến thiếu hoặc sai authentication token
- **403 FORBIDDEN**: Lỗi liên quan đến không có quyền truy cập
- **404 NOT FOUND**: Lỗi liên quan tài nguyên không tìm thấy
- **405 METHOD NOT ALLOWED**: Lỗi liên quan method không được chấp nhận. Ví dụ API chỉ cho phép sử dụng GET, PUT, DELETE nhưng bạn dùng POST thì sẽ trả về lỗi này.
- **500 INTERNAL SERVER ERROR**: Lỗi liên quan đến việc server bị lỗi khi xử lý một tác vụ nào đó (Server không cố ý trả về lỗi này cho bạn)

### Sử dụng định dạng JSON hoặc XML để giao tiếp client-server

**JSON** là kiểu dữ liệu tiện dụng cho server và client giao tiếp với nhau.

Có thể xử dụng **XML** nhưng phổ biến hơn cả vẫn là **JSON**

# Authentication với JWT

- JSON Web Token (JWT) (đọc là giót), là một chuẩn mở (RFC 7519) giúp truyền tải thông tin dưới dạng JSON.

- Token là một chuỗi ký tự được tạo ra để đại diện cho một đối tượng hoặc một quyền truy cập nào đó, ví dụ như access token, refresh token, jwt...

- Tất cả các JWT đều là token, nhưng không phải tất cả các token đều là JWT.

- Token thường được sử dụng trong các hệ thống xác thực và ủy quyền để kiểm soát quyền truy cập của người dùng đối với tài nguyên hoặc dịch vụ.

-1 chuỗi jwt gồm 3 phần header.payload.signature

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MTE4NDdhZmJkYjUxMmE1MmMwNTQ4IiwidHlwZSI6MCwiaWF0IjoxNjgyMDgyNTA0LCJleHAiOjE2OTA3MjI1MDR9.QjSI3gJZgDSEHz6eYkGKIQ6gYiiizg5C0NDbGbGxtWU

```

- 1 - Header: Phần này chứa thông tin về loại token (thường là "JWT") và thuật toán mã hóa được sử dụng để tạo chữ ký (ví dụ: HMAC SHA256 hoặc RSA). Header sau đó được mã hóa dưới dạng chuỗi Base64Url. (Thử decode Base64 cái chuỗi eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 này ra thì nó sẽ có dạng '{"alg":"HS256","typ":"JWT"}')
  ![Alt text](image-24.png) ![Alt text](image-25.png)

- Payload: Phần này chứa các thông tin mà người dùng định nghĩa. Payload cũng được mã hóa dưới dạng chuỗi Base64Url.
  ![Alt text](image-26.png)

- Signature: Phần này được tạo bằng cách dùng thuật toán HMACSHA256 (cái này có thể thay đổi) với nội dung là Base64 encoded Header + Base64 encoded Payload kết hợp một "secret key" (khóa bí mật - do server giữ). Signature (Chữ ký) giúp đảm bảo tính toàn vẹn và bảo mật của thông tin trong JWT, dưới đây là công thức của signature

  ```js
  HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    secret_key
  );
  ```

- tất cả mọi người đều biết được thông tin Header và Payload của cái JWT
- chỉ có server mới biết được secret_key để tạo ra Signature. Vì vậy chỉ có server mới có thể verify được cái JWT này là do chính server tạo ra

# Access Token là gì ?

## 1. session authenication

- mỗi một request ta gữi lên server đều có đính kèm **session id**
- **server** sẽ dùng **session id** để định danh xem chúng ta là ai mà lại gữi yêu cầu, từ đó quyết định có đáp ứng hay không
- **session id** được lưu trữ ở database, nên mỗi lần request là mỗi lần **server** sẽ phải vào mò và tìm kiếm (tốn thời gian - dẫn đến quá tải)

## 2. token base authentication

- với các này ta chỉ cần dùng JWT tạo 1 token, lưu thông tin `user_id` , `role` rồi gữi cho người dùng
- server không cần lưu jwt này
- mỗi lần người dùng request thì họ sẽ gữi kèm cái jwt đó lên
- server nhận đc và xác nhận(verify) người dùng đó là ai, có quyền truy cập nội dung hay không ?

- **ai đó tạo token giả để truy cập thì sao ?**

  - khi server tạo ra jwt cho người dùng, ta đã kèm theo `secret_key`, nên nếu họ gữi lại jwt cho mình, mà k phải `secret_key` của mình thì mình biết đó là 1 jwt giả
  - nhưng nếu server bị tấn công thì điều này hoàn toàn có thể xảy ra

- ưu điểm: nhanh, tiết kiệm lưu trữ `session id`, thay vì kiểm tra tính chính xác của `session id` thì nó chỉ verify(xem thử jwt có phải của server không)

- **vậy jwt trên giúp ta xác thực xem người dùng có được quyền truy cập tài nguyên hay không** nên nó được gọi là **access token** -**access token** thì chuỗi định dạng nào cũng đc, nhưng phổ biến là JWT
  cấu trúc data trong access token sẽ theo [chuẩn này!](https://datatracker.ietf.org/doc/html/rfc9068) Tuy nhiên bạn có thể thay đổi theo ý

- ví dụ ta có đoạn access token sau

  ```json
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MTE4NDdhZmJkYjUxMmE1MmMwNTQ4IiwiaWF0IjoxNjgyMDgyNTA0LCJleHAiOjE2OTA3MjI1MDR9.tWlX7E7NPNftg37fXrdsXvkgEWB_8zaHIQmryAXzElY
  ```

  thì payload của nó nếu ta giải ra sẽ chỉ là

  ```json
  {
    "user_id": "64411847afbdb512a52c0548", //mã định danh
    "iat": 1682082504, //thời gian bắt đầu hiệu lực
    "exp": 1690722504 //thời gian kết thúc hiệu lực
  }
  ```

  - nếu kẻ gian có đc **user_id** thì nghĩa là hắn đã chiếm đc quyền truy cập máy của bạn

## flow xác thực người dùng của access token

- `tập thể piedTeam cảm ơn anh Thanh Được vì đóng góp model này`
  ![Alt text](image-27.png)

## vấn đề của Access token

- access token không lưu ở server, mà để cho client lưu (gọi là stateless), vì vậy ta sẽ không thu hồi lại đc accesstoken dẫn đến k ép người dùng đăng xuất khỏi hệ thống được
- nếu client bị hack chiến dụng máy, thì hacker sẽ lấy đc accesstoken và gữi request lên cho server xử lý, dù mình biết client đó đã bị hack nhưng không làm gì được
  - nếu mà mình tạo 1 collection lưu blackList AccessToken để nếu thấy accessToken bị hack gữi lên ta sẽ chặn k làm request thì cũng oke, nhưng như vậy thì phải vào collection để kiểm tra, gọi chung là (statefull- vi phạm quy tắc của REST)
- giải pháp: thiết lập thời gian hiệu lực của accessToken ngắn lại (ví dụ như 5p), để hacker có ít thời gian sử dụng quyền truy cập hơn
  - nhưng nếu làm vậy thì người dùng sẽ phải 5p login 1 lần =]]
  - giải pháp hiệu quả nhất là dùng **reset token**

# Reset Token

- **Reset Token** là 1 token khác, nhưng được tạo cùng lúc với access token
- **Reset Token** có hiệu lực lâu hơn access token (1 tuần, 1 tháng, 1 năm)

## flow của reset token

![Alt text](image-28.png)

## vấn đề lý thuyết và thực hành

- **tại sao refresh lúc này là stateful, chẳng phải như vậy là vi phạp rest hay sao ?**
  - lý thuyết và thực hành khác nhau, ta không nên cứng ngắt theo lý thuyết
  - nếu access token là stateful thì mỗi request là mỗi lần ta truy cập vào database để kiểm tra
  - nhưng nếu ta có refresh token là stateful và access token là stateless thì
    mỗi 5 phút ta mới vào database kiểm tra 1 lần
  - nếu ta chủ động lưu trữ refresh token thì ta cũng sẽ chủ động xóa đc refresh token (trong trường hợp refresh token bị lộ) (tước quyền truy cập sau khi hết hạn access token, ta cũng có thể ép người dùng logout ngay lập tức bằng websoket io)
  - và ta luôn hiểu rằng , tốc độ là kết quả của đánh đổi bảo mật

# các câu hỏi về token thường gặp của người mới học authentication

- `Tại sao lại tạo một refresh token mới khi chúng ta thực hiện refresh token?`

  - nếu refresh token bị lộ, hacker có thể sử dụng nó để lấy access token mới
  - refresh token có thời gian tồn tại rất lâu, nhưng cứ sau vài phút khi access token hết hạn và thực hiện refresh token thì mình lại tạo một refresh token mới và xóa refresh token cũ
  - Refresh Token mới vẫn giữ nguyên ngày giờ hết hạn của Refresh Token cũ cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023.
    Cái này gọi là **refresh token rotation**.

- `Làm thế nào để revoke (thu hồi) một access token?`
  - access token chúng ta thiết kế nó là stateless, nên không có cách nào revoke ngay lập tức phải thông qua thông qua websocket và revoke refresh token
  - cách 2 là lưu access token vào trong database, khi muốn revoke thì xóa nó trong database là được, nhưng điều này sẽ làm access token không còn stateless nữa.
- `Có khi nào có 2 JWT trùng nhau hay không?`
  - Nếu payload và secret key giống nhau thì 2 JWT sẽ giống nhau.
  - trong payload JWT sẽ có trường iat (issued at) là thời gian tạo ra JWT (đây là trường mặc định, trừ khi bạn disable nó). Và trường iat nó được tính bằng giây.
  - 2 JWT trong cùng 1 giây thì lúc thì trường iat của 2 JWT này sẽ giống nhau, cộng với việc payload các bạn truyền vào giống nhau nữa thì sẽ cho ra 2 JWT giống nhau
- `Ở client thì nên lưu access token và refresh token ở đâu?`
  - trình duyệt thì các bạn lưu ở cookie hay local storage đều được, mỗi cái đều có ưu nhược điểm riêng. Nhưng cookie sẽ có phần chiếm ưu thế hơn "1 tí xíu" về độ bảo mật.
  - nếu là mobile app thì các bạn lưu ở bộ nhớ của thiết bị.
- `Gửi access token lên server như thế nào?`
  có 2 trường hợp
  - Lưu cookie: Nó sẽ tự động gửi mỗi khi request đến server, không cần quan tâm nó.
  - Lưu local storage: Các bạn thêm vào header với key là `Authorization` và giá trị là `Bearer <access_token>`.
- `Tại sao phải thêm Bearer vào trước access token?`

  - phụ thuộc vào cách server backend họ code như thế nào.
  - Để mà code api authentication chuẩn, thì server nên yêu cầu client phải thêm Bearer vào trước access token. Mục đích để nhắc rằng đây là `xác thực là "Bearer Authentication" `(xác thực dựa trên token).
  - **Bearer Authentication được đặt tên dựa trên từ "bearer" có nghĩa là "người mang" - tức là bất kỳ ai có token này sẽ được coi là người có quyền truy cập vào tài nguyên được yêu cầu. Điều này khác với các phương pháp xác thực khác như "Basic Authentication" (xác thực cơ bản) hay "Digest Authentication" (xác thực băm), cần sử dụng thông tin đăng nhập người dùng.**
  - Khi sử dụng Bearer Authentication, tiêu đề Authorization trong yêu cầu HTTP sẽ trông như sau:

    ```json
    Authorization: Bearer your_access_token
    ```

- `Khi tôi logout, tôi chỉ cần xóa access token và refresh token ở bộ nhớ của client là được chứ?`
  - sẽ không tốt cho hệ thống về mặt bảo mật. Vì refresh token vẫn còn tồn tại ở database, nếu hacker có thể lấy được refresh token của bạn thì họ vẫn có thể lấy được access token mới.
- `OAuth 2.0, vậy nó là gì?`
  - OAuth 2.0 là một giao thức xác thực và ủy quyền tiêu chuẩn dành cho ứng dụng web, di động và máy tính để bàn.
  - Nó cho phép ứng dụng của bên thứ ba (còn gọi là ứng dụng khách) truy cập dữ liệu và tài nguyên của người dùng từ một dịch vụ nhà cung cấp (như Google, Facebook, Twitter, ...) mà không cần biết thông tin đăng nhập của người dùng.
  - nó chỉ là một giao thức thôi, ứng dụng là làm mấy chức năng như đăng nhập bằng google, facebook trên chính website.
