// Helper là file chứa các hàm tiện ích

//      Module này được viết bằng ES6 module (ES module).

// ** Lưu ý: trong một file chỉ đc 1 default.
// ** Khi `default` thì khi import không cần để trong dấu {} mà để thẳng ngoài luôn.

// Dùng `export` để public ra để người khác có thể thấy và dùng `import` để lấy.
// Dù là common hay es thì cái nào không export thì sẽ k được sử dụng ở file khác

export const sum = (a, b) => a + b;

const logName = () => {
    console.log("Ahihi đồ chó");
}

export default logName;