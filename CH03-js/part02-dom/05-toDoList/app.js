document.querySelector("form").addEventListener("submit", (event) => {
  // Chặn reset trang khi submit
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const item = {
    name: name.trim(),
    id: new Date().toISOString(),
  };
  //Hiển thị object item lên UI
  addItemToUI(item);
  //Lưu trữ item lên local storage
  addItemToLS(item);
});

// hàm nhận vào item và hiển thị lên UI
const addItemToUI = (item) => {
  //destructuring
  const { name, id } = item;
  const newCard = document.createElement("div");
  newCard.className =
    "f-flex flex-row card justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `
        <span>${name}</span>
        <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">Remove</button>
    `;
  document.querySelector(".list").appendChild(newCard);
};

//getList: lấy danh sách các item từ ls về
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

const addItemToLS = (item) => {
  const list = getList();
  list.push(item);
  //Lưu list đã nhét item lên lại localStarage
  localStorage.setItem("list", JSON.stringify(list));
};

// hàm render tất cá item lên UI mỗi khi vào trang
const init = () => {
  const list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};
init();


//Chức năng xóa
document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    const nameItem = event.target.previousElementSibling.textContent;
    const isConfirmed = confirm(
      `Bạn có chắc là muốn xóa item: ${nameItem} không?`
    );
    if (isConfirmed) {
      //xóa trên UI trước
      event.target.parentElement.remove();
      // xóa trên local Starage
      const idRemove = event.target.dataset.id; //Lấy ID cần remove từ data-id của nút đó
      removeItemFormLS(idRemove);
    }
  }
});

//Hàm nhận vào id từ btn-remove và đã nhấn, dùng id đó tìm và xóa item trong LS
const removeItemFormLS = (idRemove) => {
  let list = getList(); //lấy danh dách item về
  list = list.filter((item) => item.id != idRemove); // lọc những thằng id khác id cần xóa
  localStorage.setItem("list", JSON.stringify(list));
};

// remove all
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
  const isConfirmed = confirm("Bạn có chắc là muốn xóa hết item không ?");
  if (isConfirmed) {
    document.querySelector(".list").innerHTML = "";
    localStorage.removeItem("list");
  }
});

//chức năng filter
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value; //lấy value từ ô diễn ra sự kiện
  let list = getList();
  list = list.filter((item) => item.name.includes(inputValue));
  //xóa các item củ
  document.querySelector(".list").innerHTML = "";
  list.forEach((item) => {
    addItemToUI(item);
  });
});
