// Falsy:  đối với JS những gì không chứa giá trị là fasle
// null, undefined, 0, -0, false, NaN.
// Truthy: ngược lại vs Falsy
// chuỗi khác rỗng, số khác 0 và -0, object đều là true.

console.log("Phần 1");

console.log(2 == "2"); // true // so sánh giá trị
console.log(2 !== "2"); //true //khác kiểu nên true
console.log(2 !== 2); //false //giống cả giá trị và kiểu nên false
console.log(2 != "2"); //false //giống nhau về giá trị nên false auto-unboxing

console.log("Phần 2");
let diep = "đẹp trai";
let isDepTrai = diep == "đẹp trai"; //true
console.log(isDepTrai); //true

console.log("b" + "a" + +"a" + "a"); //baNaNa

console.log("Phần 3");

console.log(0 && 1); //0
console.log(0 || 1 || 4); // 1
console.log(0); //0
console.log(!0); //true
console.log(""); // chuỗi rỗng
console.log(!""); //true
console.log(!"" && 0 && 1); //0

console.log("Phần 4");
let str1 = "Ahihi";
str1 = new String("Ahihi1");
console.log(str1); //Ahihi1
console.log(str1 == "Ahihi1"); //true //so sánh giá trị //auto-unboxing
console.log(str1 === "Ahihi1"); //so sánh địa chỉ // false
console.log(str1.valueOf() === "Ahihi1"); //true

console.log("Phần 5");

console.log(Boolean(1999)); //true
console.log(Boolean(0)); //false
console.log(Boolean("0")); //true
console.log(Boolean("")); // /0 = 0 => false
console.log(Boolean(" ")); //space => true
console.log(Boolean(null)); //false
console.log(Boolean({})); //một cái địa chỉ => true
console.log(Boolean([])); //một cái địa chỉ => true
console.log(Boolean(10 / "d")); //NaN
console.log(Boolean(false)); //false

console.log("Phần 6");

console.log(!!"0"); //true
console.log(!!""); //false
console.log(!!0); // false không phải 0 mà phải false
console.log(!![]); //true
console.log((b = 3)); // 3
console.log(!!{}); //true
console.log(!!null); //false
console.log(10 / "d"); //NaN
console.log(!!(10 / "d")); //false
console.log(2 + "2"); //22
console.log(3 - "2"); //1
console.log(!!"22"); //true
console.log(!"22"); // false
console.log(!!NaN); //false

let regax1 = /SE\d{9}/;
console.log(Boolean(regax1)); // true

console.log(NaN == Number); // false
console.log(NaN === Number); //false
console.log(NaN !== Number); //true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(NaN !== NaN); // true

console.log(null == null); //true
console.log(null === null); //true
console.log(null !== null); //false
console.log(null == 0); // false
console.log(null == "null"); // false
console.log(null == ""); // false

console.log(null == undefined); // true
console.log(undefined === null); //false

console.log(undefined == undefined); //true
console.log(undefined === undefined); //true
console.log(undefined !== undefined); //false

console.log(1 + 2 + +"a" + 4); //"NaN"
console.log(1 + 2 + -"a" + 4); //"NaN"
console.log(1 + 2 + "a" + 4); // "3a4"
console.log("a" + "b" + +"c" + "a"); //"abNaNa"
console.log("a" + "b" + -"1" + "a"); // ab-1a

console.log(1 && 0 && 4); //0

function fA() {
  console.log("Ahihi");
}

let fe = function () {
  console.log("Ahihi");
};

let fa = () => {
  console.log("Ahihi");
};

(function () {
  //IIFE
  console.log("Ahihi");
})();

let product = [
  { id: "SE11", name: "Quần 1" },
  { id: "SE12", name: "Quần 2" },
  { id: "SE13", name: "Quần 3" },
];
// biến cái mang product thành mảng các chuỗi có dạng.
// ma la SE11 co san pham Quần 1`.
// let str = product.reduce((total, item, key) => {
//   let str1 = `ma la ${item.id} co san pham ${item.name}`;
//   total[key] = str1;
//   return total;
// }, []);
// console.log(str);

let tmp = product.map((item, key, array) => {
  return (item = `ma la ${item.id} co san pham ${item.name}`);
});
console.log(tmp);

let arr = [2, 4, 7, 8, 10];
console.log(arr.every((item) => item % 2 == 0)); //F

let handle = (a, b) => {
  return a * b;
};
handle = (a) => (b) => a * b;

let workerList = ["Huệ", "Lan", "Trà"];
console.log(workerList.slice(-3, -1));

console.log("20" > "100");
