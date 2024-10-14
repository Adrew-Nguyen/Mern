const VALUES = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🫱" },
];

//Dựa vào index để so sánh

//Phân tích logic
//valuePlayer và valueUser => "scissors" | "rock" | "paper"
//từ valuePlayer và valueUser duyệt value tìm ID nào giống
//indexPlayer và indexUser
//Khi nào thắng
// 0 - 2 = -2
// 1 - 0 - 1
// 2 -1 = 1
// => indexPlayer - indexcomputer = 1 || -2 thì thắng     return 1

//Khi nào hòa indexPlayer - indexcomputer = 0 thì         return 0

// còn lại thì thua                                   return -1



// Xử lí trò chơi
let i = 0;
const handleChange = () => {
  let computer = document.querySelector("#computer");
  computer.textContent = VALUES[i].value;
  computer.setAttribute("data-id", VALUES[i].id);
  i = i === VALUES.length - 1 ? 0 : ++i;
};

let interval = setInterval(handleChange, 100);

//Hàm compare: so sánh giá trị phân thắng 1 hòa 0 thua -1

const compare = (valuePlayer, valueComputer) => {
  //tìm index của các value tương ứng
  let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
  let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
  let result = indexPlayer - indexComputer;
  if ([1, -2].includes(result)) return 1;
  else if (result == 0) return 0;
  else return -1;
};

let playerItem = document.querySelectorAll(".user");

//Duyệt qua các item của người dùng
playerItem.forEach((item) => {
  //và tất cả bọn nó đều nghe sự kiện
  item.addEventListener("click", (event) => {
    // Dừng máy lại và lấy data-id
    clearInterval(interval);
    //Lấy data-id của máy
    let computer = document.querySelector("#computer");
    let valueComputer = computer.dataset.id; //.getAttribute("data-id")

    // Lấy ID của hằng vừa nhấn
    let valuePlayer = event.target.id;

    // so sánh

    let result = compare(valuePlayer, valueComputer);

    // Duyệt các nút và xóa actived
    playerItem.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    // Thêm actived cho các nút vừa nhấn
    event.target.classList.add("actived");

    // kết luận và in thông báo
    let newItem = document.createElement("div");
    newItem.classList.add("alert");
    let msg = "";
    if (result == 1) {
      msg = "Bạn Thắng";
      newItem.classList.add("alert-success");
    } else if (result == 0) {
      msg = "Bạn Hòa";
      newItem.classList.add("alert-warning");
    } else {
      msg = "Bạn Thua";
      newItem.classList.add("alert-dark");
    }
    newItem.textContent = msg;
    document.querySelector(".notification").appendChild(newItem);

    // Hiện nút chơi lại
    document.querySelector("#play-again").classList.remove("d-none");
  });
});

// sự kiện click chơi lại
document
  .querySelector(".btn-play-again")
  .addEventListener("click", (event) => {
    clearInterval(interval);
    interval = setInterval(handleChange, 100);
    // xóa actived của các nút
    playerItem.forEach((item) => {
        item.classList.remove("actived");
        item.style.pointerEvents = "";
    })
    //xóa thông báo và khối nút chơi lại
    document.querySelector(".notification").innerHTML = "";
    document.querySelector("#play-again").classList.add("d-none");
  });

  //
