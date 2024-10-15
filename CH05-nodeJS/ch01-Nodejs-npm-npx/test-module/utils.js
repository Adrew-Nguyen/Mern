// utils là một file lưu các hàm tiện ích.
// Khi nào cần thì có thể dùng lại

//Commonnjs thì nó xem các file là một object và tất cả mọi thứ trong đây là private
// muốn public ra thì dùng exports và muốn lấy nó thì dùng require
let sum = (a, b) => a + b;

// chia sẽ hàm sum ra ngoài với tên là sumFunction
exports.sumFunction = sum;

