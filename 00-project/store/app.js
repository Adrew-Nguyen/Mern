//Mảng chứa các src ảnh
const listImg = [
  "./1.png",
  "./2.png",
  "./3.png",
  "./4.png",
  "./5.png",
  "./6.png",
  "./7.png",
  "./8.png",
  "./9.png",
  "./10.png",
  "./11.png",
  "./12.png",
];
let countImg = 0;

//Add function
document.querySelector(".detail__form").addEventListener("submit", (event) => {
  //Chặn reset trang
  event.preventDefault();
  //lấy thông tin
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const amount = document.querySelector("#amount").value;
  const description = document.querySelector("#description").value;
  //nén vào 1 object
  const item = {
    name: name.trim(),
    price: price, //giá thật
    amount: amount,
    description: description,
    id: new Date().toISOString(),
    src: countImg,
  };
  //Lưu trữ lên Local storage
  addItemToLS(item);
  //Xóa nội dung của các nút input
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#description").value = "";
});

const getList = () => JSON.parse(localStorage.getItem("list")) || [];

//Nhận vào 1 item rồi lưu vào local storange
const addItemToLS = (item) => {
  const list = getList();
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};

//Nhận vào một item và hiện thị lên UI
const addItemToUI = (item) => {
  //destructuring
  const { name, price, amount, description, id, src } = item;
  //Tạo DOM ảo
  const newItem = document.createElement("div");
  newItem.className = "card__product";
  newItem.setAttribute("id", `${id}`);
  newItem.innerHTML = `
    <div class="card__img">
              <img
                src="${listImg[src]}"
                alt=""
              />
            </div>
            <div class="card__content">
              <p data-id="name">${name}</p>
              <div class="card__price">
                <p data-id="price-discount">${price / 2}</p>
                <p data-id="price">${price}</p>
              </div>
            </div>
    `;
  countImg == listImg.length - 1 ? 0 : ++countImg;
  document.querySelector(".store__product").appendChild(newItem);
};

//Hàm render mỗi khi reset trang
(() => {
  const list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
})();

document.querySelector(".store__product").addEventListener("click", (event) => {
  let node = event.target;
  while (!node.classList.contains("card__product")) {
    node = node.parentElement;
  }
  const id = node.id;
  const list = getList();
  list.forEach((item) => {
    if (item.id === id) {
      document.querySelector("#name").value = item.name;
      document.querySelector("#price").value = item.price;
      document.querySelector("#amount").value = item.amount;
      document.querySelector("#description").value = item.description;
      document.querySelector("#delete").dataset.id = item.id;
    }
  });
});

//Xóa từng item
document.querySelector("#delete").addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  const list = document.querySelectorAll(".card__product");
  list.forEach((item) => {
    if (item.id == id) {
      const isConfirmed = confirm(
        `Bạn có chắc là muốn xóa item: ${item.children[1].children[0].textContent} không?`
      );
      if (isConfirmed) {
        //Xóa ở UI
        item.remove();
        //Xóa trên local Storage
        removeItemFormLS(id);
      }
    }
  });
  //xóa nội dung khi ấn nút delete
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#description").value = "";
});

//Hàm nhận vào môt id dùng id đó tìm và xóa item trên LS
const removeItemFormLS = (id) => {
  let list = getList();
  list = list.filter((item) => item.id != id);
  localStorage.setItem("list", JSON.stringify(list));
};

//Hàm remove all
document.querySelector("#clear").addEventListener("click", (event) => {
  // const isConfirmed = confirm("Bạn có chắc là muốn xóa hết item không ?");
  // if (isConfirmed) {
  //   document.querySelector(".store__product").innerHTML = "";
  //   localStorage.removeItem("list");
  // }

  //xóa nội dung khi ấn vào nút clear
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#description").value = "";
});

//Hàm filter
document.querySelector("#search").addEventListener("click", (event) => {
  let inputValue = document.querySelector("#search-text").value;
  let list = getList();
  if (inputValue != "") {
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  document.querySelector(".store__product").innerHTML = "";
  list.forEach((item) => {
    addItemToUI(item);
  });
  document.querySelector("#search-text").value = "";
});
