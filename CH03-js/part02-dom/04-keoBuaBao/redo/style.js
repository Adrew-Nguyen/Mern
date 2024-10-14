//indexPlayer - indexComputer
//Thắng: 1, -2
//Hòa: 0
//Thua còn lại

// biến count
let count = 0;

//Xử lí trò chơi
const itemList = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🫱" },
];

// 0: scissors
// 1: rock
// 2: paper

//B1: Cho máy chạy
let i = 0;
const handleChange = () => {
  // Dom tới computer
  let computer = document.querySelector("#computer");
  // Set giá trị
  computer.textContent = itemList[i].value;
  // Set thuộc tính cho nó
  computer.setAttribute("data-id", itemList[i].id);
  // Căn chỉnh i
  i = i === itemList.length - 1 ? 0 : ++i;
};
let interval = setInterval(handleChange, 100);

//B2: hàm  compare 0: Hòa || 1 : Thắng || -1: Thua
const compare = (valuePlayer, valueComputer) => {
  //tìm index của player và computer
  let indexPlayer = itemList.findIndex((item) => item.id == valuePlayer);
  let indexComputer = itemList.findIndex((item) => item.id == valueComputer);
  const result = indexPlayer - indexComputer;
  if ([1, -2].includes(result)) return 1;
  else if (result == 0) return 0;
  else return -1;
};

//B3: Lấy index của user và computer

//1.Cài đặt lắng nghe cho 3 nút của user
// Dom tới các nút có class user
const playerList = document.querySelectorAll(".user"); //NodeList
//Duyệt mảng để cài đặt lắng nghe
playerList.forEach((item) => {
  item.addEventListener("click", (event) => {
    //2. Dừng máy chạy lấy value của máy
    //Dừng chạy
    clearInterval(interval);
    // let valueComputer = document.querySelector("#computer").dataset.id;
    let valueComputer = document
      .querySelector("#computer")
      .getAttribute("data-id");
    //3. Lấy value của player
    let valuePlayer = event.target.id;
    //4. so sánh
    let result = compare(valuePlayer, valueComputer);
    console.log(result);

    //5. Duyệt các nút  để cài actived cho nút đã nhấn và xóa actived cho nút đã ấn trước đó
    //xóa actived và cài đăt không cho ấn được nữa
    playerList.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    //Thêm active cho nút vừa được bấm
    event.target.classList.add("actived");
    //6. Thông báo
    let msg = "";
    let newItem = document.createElement("div");
    newItem.classList.add("alert");
    if (result == 1) {
      msg = "Bạn Thắng";
      newItem.classList.add("alert-success");
      count++;
    } else if (result == 0) {
      msg = "Bạn Hòa";
      newItem.classList.add("alert-warning");
    } else {
      msg = "Bạn Thua";
      newItem.classList.add("alert-danger");
    }
    //Cập nhật chuổi thắng
    //DOM tới chain
    let chain = document.querySelector("#chain");
    chain.textContent = count;
    //Thông báo kết luận
    newItem.textContent = msg;
    document.querySelector(".notification").appendChild(newItem);
    //7. Hiện nút chơi lại
    document.querySelector("#play-again").classList.remove("d-none");
    //8. Hiện bảng modal
    if (result == -1) {
      let agreeNode = document.querySelector("#agree");
      let disagreeNode = document.querySelector("#disagree");
      let modalNode = document.querySelector(".ad_modal");
      modalNode.classList.remove("hiden");
      disagreeNode.addEventListener("click", (event) => {
        count = 0;
        chain.textContent = count;
        modalNode.classList.add("hiden");
      });
      // bật quảng cáo
      agreeNode.addEventListener("click", (event) => {
        let adWindow = window.open(
          "https://www.dimtutac.com/",
          "_blank",
          "width=500,height=700"
        );
        // sau 5s thì quảng cáo coi xong và back ngược lại về chương trình
        setTimeout(() => {
          //Đóng cái cửa sổ trình duyệt lại
          if (adWindow) {
            adWindow.close();
          }
          //lấy lại cửa sổ chính
          window.focus();
          modalNode.classList.add("hiden");
        }, 5000);
      });
    }
  });
});

//B4: Cài đặt chơi lại
//Dom tới nút chơi lại
document.querySelector(".btn-play-again").addEventListener("click", (event) => {
  // vì có bug ấn lại nút chơi lại nhiều lần sẽ làm tăng tốc độ của thay dổi của máy nên phải chặn
  // Cách FIX: cứ thấy ấn nút chơi lại thì việc đầu tiên là xóa interval liền
  clearInterval(interval);
  //sau khi xóa thì cho máy chạy lại
  interval = setInterval(handleChange, 100);
  //xóa active của nút được ấn bằng cách duyệt
  //và mở lại khả năng ấn nút
  playerList.forEach((item) => {
    item.classList.remove("actived");
    item.style.pointerEvents = "";
  });
  // xóa đi thông báo
  document.querySelector(".notification").innerHTML = "";
  // ẩn đi nút chơi lại
  document.querySelector("#play-again").classList.add("d-none");
});
