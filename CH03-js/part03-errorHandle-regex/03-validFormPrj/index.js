// Mỗi business rule có chuẩn validate khác nhau
// Tùy vào quốc gia, công ty mà mình validate theo chuẩn đó

// rule validate (những yêu cầu để công nhận là validate)
// email: isRequired, isEmail
// name: isRequired, isName(có thể tiếng việt, tiếng anh, max 50)
// gender: isRequired
// country: isRequired
// password: isRequired, min 8 , max 30
// confirmedPassword: isRequired, min 8 , max 30, isSame(password)
// agree: isRequired
const REG_EMAIL =
  /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
  /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;

// 1. Viết hàm nhận vào value và kiểm tra value theo một tiêu chí nào đó.
// + Nếu value thõa điều kiện thì return "".
// + Nếu value không thõa điều kiện thì chữi.
//Lưu ý: null và "" có giá trị là fasle
const isRequired = (value) => (value ? "" : "That field is required");
const isEmail = (value) => (REG_EMAIL.test(value) ? "" : "Email is invalid");
const isName = (value) => (REG_NAME.test(value) ? "" : "Name is invalid");
const min = (numberBound) => (value) => {
  return value.length >= numberBound ? "" : `Min is ${numberBound}`;
};
const max = (numberBound) => (value) => {
  return value.length <= numberBound ? "" : `Max is ${numberBound}`;
};
const isSame = (paramValue, fieldName1, fieldName2) => (value) => {
  return value == paramValue ? "" : `${fieldName1} is not same ${fieldName2}`;
};

/**
 * Ta đang có 1 object có cấu trúc như sau:(ParamObject)
 * {
 *  value: giá trị input cần kiểm tra.
 *  funcs: mảng chứa những hàm dùng để kiểm tra value | (value) => chữi.
 *  parentNode: Lưu những div cha của controlNodes( .parent()) để thêm một cái <div invalid-feedback msg> để hiện thị câu chữi.
 *  controlNodes: mảng chứa những input Node của value đó trong trường dữ liệu của nó|| công dụng: nếu có lỗi thì dom tới để chỉnh is-invalid(tô đỏ).
 * }
 */

// Mô phỏng node name
// let nameNode = document.querySelector("#name");
// let paramsObject = {
//   value: nameNode.value,
//   funcs: [isRequired, isName],
//   parentNode: nameNode.parentElement,
//   controlNodes: [nameNode],
// };

// 2. Viết hàm tạo ra thông báo chữi
const createMsg = (parentNode, controlNodes, msg) => {
  //2.1 Tạo div có thông điệp chữi và chèn vô cuối
  let invalidDiv = document.createElement("div");
  invalidDiv.innerHTML = msg;
  invalidDiv.className = "invalid-feedback";
  parentNode.appendChild(invalidDiv);
  //2.2 Đánh đỏ những hằng input(controlNodes)
  controlNodes.forEach((inputNode) => {
    inputNode.classList.add("is-invalid");
  });
};

// Demo nhẹ cái hiệu ứng thông báo chữi
// let nameNode = document.querySelector("#name");
// createMsg(nameNode.parentElement, [nameNode], "Đồ ngu");

// 3. isValid(): hàm nhận vào paramObject{value, funcs, parentNode, controlNodes}.
//               hàm duyệt qua danh sách các func và bỏ value vào để kiểm tra.
//                  + Nếu chuỗi rỗng thì thôi.
//                  + Nếu nhận được chuỗi chữi thì gọi createMsg
//               - Nếu duyệt hết tất cả funcs mà không bị chũi thì return "".

const isValid = ({ value, funcs, parentNode, controlNodes }) => {
  //destructuring
  //const { value, funcs, parentNode, controlNodes } = paramObject;
  //3.1 Duyệt danh sách mảng các funcs và chạy cùng value
  for (const funcCheck of funcs) {
    let msg = funcCheck(value);
    if (msg) {
      createMsg(parentNode, controlNodes, msg);
      return msg;
    }
  }
  return "";
};

//test hàm isValid
// let nameNode = document.querySelector("#name");
// isValid({
//   value: nameNode.value,
//   funcs: [isRequired, isName],
//   parentNode: nameNode.parentElement,
//   controlNodes: [nameNode],
// });

//4. Hàm xóa trạng thái đỏ
const clearMsg = () => {
  //xóa trạng thái báo đỏ ở tất cả thẻ inout
  document.querySelectorAll(".is-invalid").forEach((inputNode) => {
    inputNode.classList.remove("is-invalid");
  });
  //xóa hết các div chữi đã thêm
  document.querySelectorAll(".invalid-feedback").forEach((item) => {
    item.remove();
  });
};

// 5. Hàm sự kiện diễn ra
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //chặn reset trang
  clearMsg();
  //5.1 DOM đến các input node
  let emailNode = document.querySelector("#email");
  let nameNode = document.querySelector("#name");
  let genderNode = document.querySelector("#gender");
  let passwordNode = document.querySelector("#password");
  let confirmedPasswordNode = document.querySelector("#confirmedPassword");
  let countryNode = document.querySelector("input[name='country']:checked");
  let agreeNode = document.querySelector("input#agree:checked");
  //5.2 Tiến hành valid cho từng node
  let errorMsgs = [
    //email
    isValid({
      value: emailNode.value,
      funcs: [isRequired, isEmail],
      parentNode: emailNode.parentElement,
      controlNodes: [emailNode],
    }),
    //name
    isValid({
      value: nameNode.value,
      funcs: [isRequired, isName, max(50)],
      parentNode: nameNode.parentElement,
      controlNodes: [nameNode],
    }),

    //gender
    isValid({
      value: genderNode.value,
      funcs: [isRequired],
      parentNode: genderNode.parentElement,
      controlNodes: [genderNode],
    }),
    //password
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(30)],
      parentNode: passwordNode.parentElement,
      controlNodes: [passwordNode],
    }),

    //confirmpassword
    isValid({
      value: confirmedPasswordNode.value,
      funcs: [
        isRequired,
        min(8),
        max(30),
        isSame(passwordNode.value, "Confirm password", "password"),
      ],
      parentNode: confirmedPasswordNode.parentElement,
      controlNodes: [confirmedPasswordNode],
    }),
    //country
    isValid({
      value: countryNode ? countryNode.value : "",
      funcs: [isRequired],
      parentNode: document.querySelector(".form-check-country").parentElement,
      controlNodes: document.querySelectorAll("input[name='country']"),
    }),

    //agree
    isValid({
      value: agreeNode ? agreeNode.value : "",
      funcs: [isRequired],
      parentNode: document.querySelector("#agree").parentElement,
      controlNodes: [document.querySelector("#agree")],
    }),
  ];
  let isValidForm = errorMsgs.every((msg) => msg == "");
  if (isValidForm) {
    alert("Form is valid");
  }
});
