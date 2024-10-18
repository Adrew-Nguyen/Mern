# Run code qua môi trường NodeJS
- Chạy thủ công: `node namefile`.
- Chạy tự động: thì cài thư viện "nodemon" vào để nó tự động output khi thay đổi gì đó trên file đã setup.
    +  Muốn chạy thì vô packetage.json phần script để setup nó để chạy. "start": "nodemy nameFile".
    +  Sau đó rõ `npm run start` vào terminal.
    => Vì sao phải nhờ dự án chạy dùm vì mình tải nodemon để nó nằm trên dự án nên phải nhờ dự ám chạy và nằm trong vùng nhớ `devDependencies`.
    +  Thoát `Ctrl + c`.

## Để cài đặt thư viện nodemon thì gõ  `npm i nodemon <optin>`
`-g`: để local (trên máy tính mình) thì package không có. Đây là 'option' muốn thì dùng không thì thôi. => Không nên dùng chỉ nên biết thôi.
`-D`: phục vụ cho người viết để thoải mái sướng hơn và không ảnh hưởng tới dự án thì dùng này và nó sẽ (nằm trên DỰ ÁN CỦA MÌNH) còn lại thì không dùng option nào.
- Đối với nhưng thư viện cần để dự án để chạy đc thì nên không dùng option nào thì nằm trong vùng nhớ `Dependencies`.

## Có 2 kiểu cài local
- dependence: ta sẽ cài các thứ liên quan đến quá trình vận hành của sản phẩm
    + `npm i name`
- devdependence: cài tool, thư viện mà nó k nằm trong quá trình production(quá trình ra thành phẩm)
    + `npm i name -D`

# Module trong Nodejs
- Có hai loại module. 
## Configjs
- Commonnjs: xem các file là một object và tất cả mọi thứ trong file đều là private.
- Muốn public ra thì dùng exports và muốn lấy nó thì dùng require.
## Es-module
- Xuất hiện sau phiên biển ES6 sau sự kiện JS vì thế phải cài đặt nó mới xài được. 
- Cài đặt thì vào trong file pakeger.json setup.("type":"module").
- Lưu ý: 
    + Trong một file chỉ đc 1 default.
    + Khi `default` thì khi import không cần để trong dấu {} mà để thẳng ngoài luôn.
- Dùng `export` để public ra để người khác có thể thấy và dùng `import` để lấy.

=> Dù là common hay es thì cái nào không export thì sẽ k được sử dụng ở file khác

# NPM
- NPM là node paket management.
- Định nghĩa:1 trình quản lý thư viện của nodejs, thay vì ta phải mò lên các trang web để tải src về không chính thống, thì ta có thể thông qua npm để tại trực tiếp bằng lệnh, nhanh chóng, an toàn, và dể dàng.

# Packege.json
- Cách 1: Muốn tạo ra thì dùng `npm init -y`. 
    + `-y`: yes all lấy tất cả.
- Cách 2: Muốn tạo thì dùng `npm init`.
    + Cách này thì nó sẽ hỏi bạn từng option.

- Chứa các thông tin dự án, tài nguyên mà nó sử dụng, quy luật muốn cài vô dư án.
- Muốn đổi tên main thì vô file json đổi lại theo ý mình còn không phải đặt tên theo quy ước trong file package.json.

# Node module 
- Nơi này chứa thông tin về những (thư viện, file...) gì đã cài đặt.

# Package-lock.json
- Nơi chứ thông tin đầy đủ của package.json.

# Muốn cài đặt một thư viện gì thì gõ lệnh.
- `npm -i name`
- `i`: install card.

# Muốn gỡ cài đặt một thư viện thì gõ lệnh.
- `npm uninstall name`

# Lưu ý về cài đặt và gỡ khi push code lên git
- folder node_module khá nặng nên khi push lên thì không nên => xóa folder đó đi.
- Xóa thì clone về sẽ không thấy cái folder đó nên dư án không chạy đc
- Hên là có file package.json ta có thể nhờ nó để backup lại
- lệnh backup `npm i`.
