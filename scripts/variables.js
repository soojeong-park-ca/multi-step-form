/********* Global *********/
export const htmlPages = [
  { id: "1", pageNum: 1, url: "/index.html" },
  { id: "2", pageNum: 2, url: "/pages/plan.html" },
  { id: "3", pageNum: 3, url: "/pages/plan.html" },
  { id: "4", pageNum: 4, url: "/pages/summary.html" },
  { id: "5", pageNum: 5, url: "/pages/confirmed.html" },
];

const allInputs = document.querySelectorAll(".input");

const userName = document.getElementById("input-name");
const userEmail = document.getElementById("input-email");
const userPhone = document.getElementById("input-phone");

const btnNext = document.querySelector(".btn-next");

window.allInputs = allInputs;
window.userName = userName;
window.userEmail = userEmail;
window.userPhone = userPhone;
window.btnNext = btnNext;
