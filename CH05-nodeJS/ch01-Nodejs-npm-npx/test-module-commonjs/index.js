// index giống hàm main
// muốn dùng hàm sum trong utils

//Kết nối utils.js
//Có hai cách nè:
const { sumFunction } = require("./utils.js");
const helper = require("./utils.js");

const result = sumFunction(1, 5);
const result1 = helper.sumFunction(1, 5); 

console.log(result);
console.log(result1);
