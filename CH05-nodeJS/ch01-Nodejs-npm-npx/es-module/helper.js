// helper là file chứa các hàm tiện ích
// và được viết bằng ES6 module (ES module)
// trong một file chỉ đc 1 default
// default thì khi import không cần trong để hoặc mà để thẳng ngoài cx đc.

export const sum = (a, b) => a + b;

const logName = () => {
    console.log("Ahihi đồ chó");
}
export default logName();