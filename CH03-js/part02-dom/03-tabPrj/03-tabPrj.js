let btnList = document.querySelectorAll(".navtab-btn"); // NodeList
let contentList = document.querySelectorAll(".tab-content-item");
// Duyệt qua từng nút
btnList.forEach((btn) => {
  //nút nào cũng chờ được click
  btn.addEventListener("click", (event) => {
    //Nếu như một nut bị click thì duyệt danh sách các nút
    
    //và xóa active của các nút trước.
    btnList.forEach((_btn) => {
      _btn.classList.remove("actived");
    });

    //Xóa actived của các content trươc
    contentList.forEach((content) => {
      content.classList.remove("actived");
    });

    // Thêm active cho tab vừa được nhấn
    event.target.classList.add("actived");
    //Lấy id của hằng vừa bị bấm
    let id = event.target.id;

    //Dom đến content của hằng vừa bị bấm
    let contentChecked = document.querySelector(
      `.tab-content-item[data-id= "${id}"]`
    );

    //thêm active cho content của bút vừa bấm để nó hiện lên
    contentChecked.classList.add("actived");
  });
});
