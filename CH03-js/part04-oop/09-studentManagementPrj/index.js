//Quản lí sinh viên bằng OOP
//tất nhiên không dùng class
function Student(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  this.id = new Date().toISOString();
}


//Khi mà mình tạo ra sinh viên rồi thì mình sẽ lưu vào localStorage
// ------Store
//class Store chứa method xử lý localStorage
function Store() {}

//1 .getStudents() : hàm lấy danh sách students từ ls
Store.prototype.getStudents = function () {
  return JSON.parse(localStorage.getItem("students")) || [];
};

//2 .add(student) : hàm nhận vào student và thêm vào ls
Store.prototype.add = function (student) {
  //Lấy danh sách students về
  let students = this.getStudents();
  //nhét student vào students
  students.push(student);
  //lưu lại localStorage
  localStorage.setItem("students", JSON.stringify(students));
};

//3. getStudent(idRemoved): hàm nhận id tìm student trong students trong ls
Store.prototype.getStudent = function (idRemove) {
  let students = this.getStudents();
  let student = students.find((student) => student.id == idRemove);
  return student;
};

//4. remove(id): hàm nhận vào id, tìm và xóa student == id
Store.prototype.remove = function(id){
  let students = this.getStudents();
  //ôn bài nên dùng cách này
  //từ id tìm vị trí của student trong students
  //xong rồi từ vị trí đó xóa bằng splice
  let indexRemove = students.findIndex((student) => student.id == id);
  students.splice(indexRemove, 1);
  localStorage.setItem("students", JSON.stringify(students));
}

//Dùng student có được để hiển thị lên giao diện
//-------------------RenderUI
//RenderUI là thằng chuyên các method xử lí giao diện

function RenderUI() {};

//1 .add(student): hàm nhận student và biến nó thành tr để hiển thị table
RenderUI.prototype.add = function ({ id, name, birthday }) {
  //lấy students
  let store = new Store(); //intance: object tạo từ store
  let students = store.getStudents();

  let newTr = document.createElement("tr");
  newTr.innerHTML = `
        <td>${students.length}</td>
        <td>${name}</td>
        <td>${birthday}</td>
        <td>
            <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">
            Xóa
            </button>
        </td>`;
  document.querySelector("tbody").appendChild(newTr);
  //reset các input field
  document.querySelector("#name").value = "";
  document.querySelector("#birthday").value = "";
};

//2. .alert(): làm hàm hiển thị thông báo lên ui.
RenderUI.prototype.alert = function (msg, type = "success") {
  let divAlert = document.createElement("div");
  divAlert.className = `alert alert-${type}`;
  divAlert.innerHTML = msg;
  document.querySelector("#notification").appendChild(divAlert);
  setTimeout(() => {
    divAlert.remove();
  }, 2000);
};

//3. .renderAll(): vào ls lấy danh sách students và biến 
//từng student thành tr và hiển thị lên table.
RenderUI.prototype.renderAll = function (){
  //Lấy danh sách students từ ls.
  let store = new Store();//tạo instance của Store
  let students = store.getStudents();
  //duyệt students và biến mỗi student thành tr rồi đẩy lên table
  let htmlContent = students.reduce((total, {id, name, birthday}, studentIndex) => {
    let str = `
      <tr>
        <td>${studentIndex + 1}</td>
        <td>${name}</td>
        <td>${birthday}</td>
        <td>
            <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">
            Xóa
            </button>
        </td>
      </tr>`;
    return total + str;
  }, "");
  document.querySelector("tbody").innerHTML = htmlContent;
}

//*** Main flow(dòng chảy sự kiện chính)
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //chặn reset trang
  //lấy data từ các input
  let name = document.querySelector("#name").value;
  let birthday = document.querySelector("#birthday").value;
  //dùng data thu được từ các input tạo student
  let newStudent = new Student(name, birthday);  
  //lưu vào ls
  const store = new Store();
  store.add(newStudent);
  //hiển thị UI
  let renderUi = new RenderUI();
  renderUi.add(newStudent);
  renderUi.alert(`Đã thêm thành công sv có tên ${name}`);
});

document.addEventListener("DOMContentLoaded", (event) => {
  let ui = new RenderUI();
  ui.renderAll();
});

// sự kiện xóa 
document.querySelector("tbody").addEventListener("click", (event) => {
    if(event.target.classList.contains("btn-remove")){
      let idRemove = event.target.dataset.id;
      //idRemove là mã của student cần xóa
      //từ idRemove này tìm student cần xóa trong student
      let store = new Store();
      let student = store.getStudent(idRemove);
      //getStudent() là hàm tìm student bằng id trong students trong ls
      let isConfirmed = confirm(`Có chắc là bạn muốn xóa sv: ${student.name}`);
      if(isConfirmed){
        //xóa ls
      store.remove(idRemove);
      //xóa ui
      let ui = new RenderUI();
      //Không nên sài cách này 
      ui.renderAll();
      //hiện thông báo thông báo thành công
      ui.alert(`SV ${student.name} đã xóa thành công`, "danger");
      }
    }
});