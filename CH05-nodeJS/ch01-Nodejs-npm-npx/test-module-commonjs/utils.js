// utils là một file lưu các hàm tiện ích.
// Khi nào cần thì có thể dùng lại

//Commonnjs: xem các file là một object và tất cả mọi thứ trong file đều là private.
//**Muốn public ra thì dùng exports và muốn lấy nó thì dùng require.
let sum = (a, b) => a + b;

// chia sẽ hàm sum ra ngoài với tên là sumFunction(public nó ra cho người ta thấy để có thể require về).
exports.sumFunction = sum;

