//02-axios.js
/**
 * Axios: 1 http client dùng để gữi request và nhận reponse từ server.
 * 1 thư viện giúp tương tác với api như get, post, put, delete, patch.
 * Axios không có sẳn trong trình duyệt => phải cài đặt.
 * Công dụng: dùng để giao tiếp giữa các server trong back.
 * Axios là thư viện phổ biến nhất hiện giờ.
 * */
//Môi trường Nodejs không có wedApis => không fetch được => phải dùng axios.

const baseURL = "https://66fb75a68583ac93b40bd367.mockapi.io";
//Lấy dữ liệu từ server các user trong table users bằng công nghệ axios
// axios({
//     method: "get",
//     url: `${baseURL}/users`,
// }).then((response) => {
//     if ([200, 201].includes(response.status)) {
//         return response.data;
//     } else {
//         throw new Error(response.statusText);
//     }
// }).then((users) => {
//     console.log(users);  
// }).catch(error => {
//     console.log(error);   
// })


//Thêm một user vào users
// axios({
//     method: "post",
//     url: `${baseURL}/users`,
//     data: {
//         name: "Điệp nguyên tử",
//     }
// }).then((response) => {
//     if ([200, 201].includes(response.status)) {
//         return response.data;
//     } else {
//         throw new Error(response.statusText);
//     }
// }).then((users) => {
//     console.log(users);
// }).catch(error => {
//     console.log(error);
// })

//Dùng aliases post
// axios.post(`${baseURL}/users`, {
//     name: "Điệp nguyên tử",
// }).then((response) => {
//     if ([200, 201].includes(response.status)) {
//         return response.data;
//     } else {
//         throw new Error(response.statusText);
//     }
// }).then((users) => {
//     console.log(users);
// }).catch(error => {
//     console.log(error);
// })

//istance(Bản thể)
//cho phép mình tạo 1 bản thể của nó nhưng có thể config.

// const instance = axios.create({
//     baseURL: baseURL,
//     timeout: 10000,//sau 10s thì tự hủy
//     headers: {
//         "Content-Type": "application/json",
//     }
// })

// instance.post(`/users`, {
//     name: "Điệp nguyên tử 1",
// }).then((response) => {
//     if ([200, 201].includes(response.status)) {
//         return response.data;
//     } else {
//         throw new Error(response.statusText);
//     }
// }).then((users) => {
//     console.log(users);
// }).catch(error => {
//     console.log(error);
// })

//**  Cách dùng axios hay:
// class + instance + interceptors để cấu hình
class Http {
    constructor() {
        this.instance = axios.create({
            baseURL: baseURL,
            timeout: 10000,//sau 10s thì tự hủy
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.instance.interceptors.response.use(
            //giống then có thể chứa hai hàm xử lý thành công và thất bại
            (response) => {
                return {
                    data: response.data,
                    status: response.status,
                };
            },
            (response) => {
                throw {
                    status: response.status,
                    statusText: response.statusText,
                };
            },
        );
    }
}

//test
let http = new Http().instance;
http.post(`users`, {
    name: "Nguyễn Nhật Trường 1",
}).then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
})
