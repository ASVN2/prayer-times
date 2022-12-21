const boxes = document.querySelectorAll(".pryer-time");
const input = document.querySelector("input");
const nextOne = document.querySelector(".next-prey span");
const thisError = document.querySelector(".error");
const nameError = document.querySelector(".error .name");
const timeError = document.querySelector(".error .time");
let timeing = "Africa/Casablanca";

function getinfo(country) {
  fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${country}&method=4`)
    .then((response) => {
      console.log("work1");
      return response.json();
    })
    .then((data) => {
      console.log("work2");

      document.querySelector(".coutry").innerHTML = data["data"]["meta"].timezone;
      document.querySelector(
        ".date"
      ).innerHTML = `[${data["data"].date.readable}] - [${data["data"].date.hijri.day} ${data["data"].date.hijri.month.en} ${data["data"].date.hijri.year}]`;
      boxes.forEach((box) => {
        box.children[1].innerHTML = data["data"].timings[`${box.classList[0][0].toUpperCase()}${box.classList[0].substring(1)}`];
      });
      timeing = data["data"]["meta"].timezone;
    })
    .catch((error) => {
      console.log(Error("The data doesn't resvoled"));
      getinfo("Morocco");
      nameError.innerHTML = country;
      thisError.classList.add("show");
      const timeOfError = setInterval(() => {
        if (timeError.textContent-- == 1) {
          thisError.classList.remove("show");
          timeError.textContent = 10;
          clearInterval(timeOfError);
        }
      }, 1000);
    });
}
getinfo("morocco");

window.addEventListener("keydown", (e) => {
  if (input.value.trim() != "") {
    if (e.key == "Enter") {
      getinfo(input.value);
      currentTime();
    }
  }
});

function currentTime() {
  fetch(`https://api.aladhan.com/v1/currentTime?zone=${timeing}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      nextOne.textContent = data.data;
    });
}
currentTime();
setInterval(() => {
  currentTime();
}, 60000);
