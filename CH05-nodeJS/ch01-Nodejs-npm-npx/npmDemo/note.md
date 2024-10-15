# Run code qua môi trường NodeJS
- Chạy thủ công: `node namefile`.
- Chạy tự động: thì cài thư viện "nodemon" vào để nó tự động output khi thay đổi gì đó trên file đã setup

Cài đặt `npm i nodemon <optin>`
`-g` để local (trên máy tính mình) thì package không có. Đây là 'option' muốn thì dùng không thì thôi. => Không nên dùng chỉ nên biết thôi.
Chạy thì `nodemon nameFile`
`-D` phục vụ cho người viết để thoải mái sướng hơn và không ảnh hưởng tới dự án thì dùng này và nó sẽ (nằm trên DỰ ÁN CỦA MÌNH) còn lại thì không dùng option nào.
Muốn chạy thì vô packetage.json phần script để setup nó để chạy. "start": "nodemy nameFile".
Sau đó rõ lệnh `npm run start`
=> Vì sao phải nhờ dự án chạy dùm vì mình tải nodemon để nó nằm trên dự án nên phải nhờ dự ám chạy và nằm trong vùng nhớ devDependencies.

Đối với nhưng thư viện cần để dự án để chạy đc thì nên không dùng option nào thì nằm trong vùng nhớ Dependencies


Chạy thì `nodemon nameFile`
Thoát `Ctrl + c`.
# Module trong Nodejs
- Có hai loại module. 
## Configjs

## Es-module
- Xuất hiện sau phiên biển ES6 sau sự kiện JS vì thế phải cài đặt nó mới xài được. 
- Cài đặt thì vào trong file pakeger.json cài đặt.

# NPM
- NPM là node paket management.

# Packege.json
- Cách 1: Muốn tạo ra thì dùng `npm init -y`. 
- `-y`: yes all lấy tất cả.
- Cách 2: Muốn tạo thì dùng `npm init`.
- Cách này thì nó sẽ hỏi bạn từng option.

- Chứa các thông tin dự án, tài nguyên mà nó sử dụng, quy luật muốn cài vô dư án.
- Muốn đổi tên main thì vô file json đổi lại theo ý mình còn không phải đặt tên theo quy ước trong JSON.

# Node module 
- Nơi này chứa thông tin về những (thư viện, ...) gì đã cài đặt.

# Muốn cài đặt một thư viện gì  gì thì gõ lệnh.
- `npm -i name`
- `i`: install card.

# Muốn gỡ cài đặt một thư viện thì gõ lệnh.
- `npm uninstall name`

# Lưu ý về cài đặt và gỡ khi push code lên git
- folder node_module khá nặng nên khi push lên thì không nên => xóa folder đó đi.
- Xóa thì clone về sẽ không thấy cái folder đó nên dư án không chạy đc
- Hên là có file package.json ta có thể nhờ nó để backup lại
- lệnh backup `npm i`.
