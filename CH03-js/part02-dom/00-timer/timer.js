let countDownNode = document.querySelector(".countdown-item");
let timeCountDown = 10;
let time = timeCountDown * 60;

let btnNode = document.querySelector(".button");
btnNode.addEventListener("click", () => {
  setInterval(() => {
    time--;
    let second = time % 60;
    let minute = Math.floor(time / 60);
    if(time < 0) return;
    countDownNode.innerHTML = `${minute} : ${second}`;
    
  }, 1000);
});
