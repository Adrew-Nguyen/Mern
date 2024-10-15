# tạo server đầu tiên với nodejs

tạo folder **01-demoServer**

```bash
npm init --khởi tạo package.json
```

mỗi dự án sẽ có setup riêng về file main, ta có thể tìm hiểu ở trong package.json
file package.json có main đang là index.js

```json
  "main": "index.js",
```

nên mình có thê tạo index.js và code trong đó, ở đây mình sẽ tạo 1 file main.js

```bash
touch main.js
```

mình sẽ dùng file này làm server cho cho mình
file main.js

```js
//http là 1 module có sẵn dùng để tạo server bằng nodejs
//http là module core của expressjs sau này(cũng dùng để tạo server)
const http = require("http");

console.log(http);
```

chạy file xem thử

```bash
node main.js
```

bây giờ, trong file main.js ta sẽ dùng http để tạo server

```js
const http = require("http");

const PORT = 4000;

//này giúp mình tạo server trước
const server = http.createServer((req, res) => {
  res.end("hello");
});

//server sẽ chạy trên port 4000
server.listen(PORT, () => {
  console.log("Server đang chạy trên port" + PORT);
});
```

chạy "node main.js" và truy cập localhost:4000 ta sẽ nhận được 'hello'

nếu muốn trả về json thì ta thay chỗ res.end thành

```js
const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "application/json");
  res.end(`{"msg": "ahihi json nè"}`);
});
```

xong chạy lại server thì ta sẽ dùng postman test thử và thấy nó đã thành json rồi

# fix xung đột port

tại sao lại có xung đột
nhiều khi mysql, firewall nó đã dùng port đó rồi, nhiều khi bạn đang xài server của mình mà tắt k đc, cuối cùng là nó bị xung đột
có nhiều cách

1. reset lại máy

2. lên google gõ "kill port window" và làm theo các tiền bối trên mạng

# tạo server bằng expressjs

## expressjs là frw tạo từ nodejs

1. expressjs chỉ là những hàm có sẵn thay vì phải code rất nhiều trên nodejs
2. expressjs quy chuẩn cách tạo server cho tất cả mọi người thống nhất
   ngoài expressjs còn nestjs| fastify
   [so sánh lượng tải của 3 thằng](https://npmtrends.com/@nestjs/core-vs-express-vs-fastify)

## cài đặt

cài đặt express trước

```bash
npm i express
```

tạo file index.js để demo server do express tạo ra

```bash
touch index.js
```

file index.js nội dung này lấy từ trang chủ [link](https://expressjs.com/en/starter/hello-world.html)

```js
const express = require("express");
const app = express(); //giống createServer
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hi", (req, res) => {
  res.send("hi World!");
});

app.listen(port, () => {
  console.log(`server express đang mở trên port ${port}`);
});
```

chạy thử "node index.js"

### cài thêm nodemon nữa để nó mỗi lần mình chỉnh server thì nó tự chạy lại

chứ cứ phải bật tắt hoài mệt

```bash
npm i nodemon -D
```

cài script cho package

```json
"start": "nodemon index.js"
```

chạy bằng "npm run start"

# setup dự án nodejs với TS và ESLint:chuẩn hóa chung Prettier:format cho đẹp

cấu trúc dự án

```
📦nodejs-typescript
┣ 📂dist
┣ 📂src
┃ ┣ 📂constants
┃ ┃ ┣ 📜enum.ts
┃ ┃ ┣ 📜httpStatus.ts
┃ ┃ ┗ 📜message.ts
┃ ┣ 📂controllers
┃ ┃ ┗ 📜users.controllers.ts
┃ ┣ 📂middlewares
┃ ┃ ┣ 📜error.middlewares.ts
┃ ┃ ┣ 📜file.middlewares.ts
┃ ┃ ┣ 📜users.middlewares.ts
┃ ┃ ┗ 📜validation.middlewares.ts
┃ ┣ 📂models
┃ ┃ ┣ 📂database
┃ ┃ ┃ ┣ 📜Blacklist.ts
┃ ┃ ┃ ┣ 📜Bookmark.ts
┃ ┃ ┃ ┣ 📜Follower.ts
┃ ┃ ┃ ┣ 📜Hashtag.ts
┃ ┃ ┃ ┣ 📜Like.ts
┃ ┃ ┃ ┣ 📜Media.ts
┃ ┃ ┃ ┣ 📜Tweet.ts
┃ ┃ ┃ ┗ 📜User.ts
┃ ┃ ┣ 📜Error.ts
┃ ┃ ┗ 📜Success.ts
┃ ┣ 📂routes
┃ ┃ ┗ 📜users.routes.ts
┃ ┣ 📂services
┃ ┃ ┣ 📜bookmarks.services.ts
┃ ┃ ┣ 📜database.services.ts
┃ ┃ ┣ 📜followers.services.ts
┃ ┃ ┣ 📜hashtags.services.ts
┃ ┃ ┣ 📜likes.services.ts
┃ ┃ ┣ 📜medias.services.ts
┃ ┃ ┣ 📜tweets.services.ts
┃ ┃ ┗ 📜users.services.ts
┃ ┣ 📂utils
┃ ┃ ┣ 📜crypto.ts
┃ ┃ ┣ 📜email.ts
┃ ┃ ┣ 📜file.ts
┃ ┃ ┣ 📜helpers.ts
┃ ┃ ┗ 📜jwt.ts
┃ ┣ 📜index.ts
┃ ┗ 📜type.d.ts
┣ 📜.editorconfig
┣ 📜.env
┣ 📜.eslintignore
┣ 📜.eslintrc
┣ 📜.gitignore
┣ 📜.prettierignore
┣ 📜.prettierrc
┣ 📜nodemon.json
┣ 📜package.json
┣ 📜tsconfig.json
┗ 📜yarn.lock
```

Giải thích các thư mục:

**dist**: Thư mục chứa các file build
**src**: Thư mục chứa mã nguồn
**src/constants**: Chứa các file chứa các hằng số
**src/middlewares**: Chứa các file chứa các hàm xử lý middleware, như validate, check token, ...
**src/controllers**: Chứa các file nhận request, gọi đến service để xử lý logic nghiệp vụ, trả về response
**src/services**: Chứa các file chứa method gọi đến database để xử lý logic nghiệp vụ
**src/models**: Chứa các file chứa các model
**src/routes**: Chứa các file chứa các route
**src/utils**: Chứa các file chứa các hàm tiện ích, như mã hóa, gửi email, ...
Còn lại là những file config cho project như .eslintrc, .prettierrc, ... mình sẽ giới thiệu ở bên dưới

## tiến hành cài đặt nodejs + ts + eslint + prettier

tạo thư mục lưu dự án **02-demoNodejsTs**

```bash
npm init -y --tạo package.json
npm i typescript -D --vì nó chỉ dùng để làm , chứ sản phẩm vẫn là js
npm i @types/node -D -thêm kiểu ts cho thằng nodejs hiểu
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon -D

```

**eslint**: Linter (bộ kiểm tra lỗi) chính

**prettier**: Code formatter chính

**eslint-config-prettier**: Cấu hình ESLint để không bị xung đột với Prettier

**eslint-plugin-prettier**: Dùng thêm một số rule prettier cho eslint

**@typescript-eslint/eslint-plugin**: ESLint plugin cung cấp các rule cho Typescript

**@typescript-eslint/parser**: Parser cho phép ESLint kiểm tra lỗi Typescript

**ts-node**: Dùng để chạy TypeScript code trực tiếp mà không cần build

**tsc-alias**: Xử lý alias khi build

**tsconfig-paths**: Khi setting alias import trong dự án dùng ts-node thì chúng ta cần dùng
tsconfig-paths để nó hiểu được paths và baseUrl trong file tsconfig.json

**rimraf**: Dùng để xóa folder dist khi trước khi build

**nodemon**: Dùng để tự động restart server khi có sự thay đổi trong code

### cấu hình ts bằng file tsconfig.json

tạo cùng cấp với package.json

```bash
touch tsconfig.json
```

thêm vào tsconfig.json nội dung sau

```json
{
  "compilerOptions": {
    "module": "CommonJS", // Quy định output module được sử dụng
    "moduleResolution": "node", //
    "target": "ES2020", // Target ouput cho code
    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  },
  "files": ["src/type.d.ts"], // Các file dùng để định nghĩa kiểu dữ liệu(type) cho dự án
  "include": ["src/**/*"] // Đường dẫn đến file cần build cho dự án
}
```

### cấu hình eslint bằng file .eslintrc

cài extensions eslint
tạo file .eslintrc

```bash
touch .eslintrc
```

nội dung

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "prettier"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "always",
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 2,
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": true
      }
    ]
  }
}

```

cài thêm .eslintignore để loại bỏ những file mà mình không muốn nó format code của mình

tạo file .eslintignore

```bash
touch .eslintignore
```

nội dung

```js
node_modules/
dist/
```

nghĩa là nếu có kiểm tra và fix format code thì k đụng vào các thư mục trên

### cấu hình cho prettier tự canh chỉnh lề cho đẹp

cài extensions prettier
tạo file .prettierrc để cấu hình

```bash
touch .prettierrc
```

nội dung .prettierrc là

```js
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}

```

cài thêm file .prettierignore để nó k canh lề cho những cái mình k thích

```bash
touch .prettierignore
```

nội dung .prettierignore là

```js
node_modules/
dist/
```

### editor để chuẩn hóa khi code

cài extensions EditorConfig for VS Code
tạo file .editorconfig

```bash
touch .editorconfig
```

nội dung .editorconfig

```js
indent_size = 2;
indent_style = space;
```

### thêm .gitignore

để tránh push những thứ k cần thiết lên git
tạo file .gitignore

```bash
touch .gitignore
```

mọi người vào trang này [link](https://www.toptal.com/developers/gitignore)
tìm nodejs

và chép nội dung đó vào file

### cấu hình nodemon.json

tạo file nodemon.json

```bash
touch nodemon.json
```

nội dung

```json
{
  "watch": ["src"],
  "ext": ".ts,.js", //trecking các file có ts và js
  "ignore": [], //liệt kê file nào mà bạn k thích theo dõi vào
  "exec": "npx ts-node ./src/index.ts" //chạy file index
}
```

### cấu hình package.json

vào file package.json
thay script thành

```json
  "scripts": {
    "dev": "npx nodemon", //dùng để code
    "build": "rimraf ./dist && tsc && tsc-alias",//code xong build ra sản phẩm
    "start": "node dist/index.js", //run code vừa build, phải build trước
    "lint": "eslint .", //kiểm tra rỗi
    "lint:fix": "eslint . --fix",//fix lỗi
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }

```

### tạo type.d.ts

tạo thư mục src và tạo file type.d.ts

```bash
touch type.d.ts
```

type.d.ts là file giúp mình định nghĩa các kiểu dữ liệu của biến trong khi code ts
ta sẽ học nó sau nay
nếu mà file tsconfig bị lỗi, có thể là do nó bị lag
ta phải vào file tsconfig ctrl + shift + p gõ **restart ts server**

### tạo file index.ts để kiểm tra các cấu hình đã làm

trong src ta thêm file index.ts
thử nội dung sau

```ts
const name: string = "Anh điệp đẹp trai";
console.log(name);
```

bạn sẽ thấy nó nói rằng "ai cũng hiểu đây là string k cần phải có keyword string này" và bạn thấy đây là eslint báo cho bạn

nên ta xóa đi

```ts
const name = "Anh điệp đẹp trai";
console.log(name);
```

vscode sẽ báo là k nên đặt tên biến là name

```ts
const fullname = "Anh điệp đẹp trai";
console.log(fullname);
```

# cài đặt xong rồi, giờ ta chạy thử dự án của mình

```bash
npm run dev
```

ta sẽ nhận được kết quả là "Anh điệp đẹp trai" vì nó sẽ chạy index.ts

ta sẽ vào index.ts code thêm tý xíu ts xem nodemon có hoạt động bình thường không, cũng như các format có chạy không ?

index.ts thêm từng dòng sau

```ts
type Handle = () => Promise<string>; //định nghĩa rằng handle là 1 promise trả ra string
const handleF: Handle = () => Promise.resolve(fullname + " ahihi");
//xài thử thử hàm handleF
handleF().then((res) => {
  console.log(res);
});

//có thể thay khúc xài hàm bằng thế này
//handleF().then(console.log);
```

kiểm tra terminal để xem kết quả nhe

### test thử xem eslint có hoạt động không

index.ts thêm nội dung

```ts
const person: any = {};
```

nó k báo gì cả, ta vào .eslintrc
đổi
no-explicit-any: không cho xài any

```json
"@typescript-eslint/no-explicit-any": "off", đổi thành
"@typescript-eslint/no-explicit-any": "warn", để nó báo, hehe
```

ta k cần phải fix nó bằng tay, ta sẽ dùng cái script lint fix

```bash
npm run lint --xem lỗi
npm run lint:fix
```

nhưng mà cái này là một lỗi logic nên k fix đc, nên mình sẽ fix bằng tay
bằng cách nói rỏ là tính lưu object trông như nào

```ts
const person: { name: string; age: number } = { name: "Điệp", age: 15 };
```

### test prettier

ta phải cái format mặt định là prettier trong setting của vscode
sau đó ta thử vào index.ts thêm vài dấu space thừa, sau đó save lại thì nó sẽ tự fix

nếu có nhiều file quá thì mình dùng script nha

```bash
npm run prettier --xem lỗi
npm run prettier:fix
```

**sau này mình có dự án nào cần làm nodejs ts thì mình có thể setting như này, hoặc copy để tiện đỡ phải làm lại mọi người nhe**
