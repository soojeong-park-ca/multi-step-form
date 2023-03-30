import { htmlPages } from "./variables.js";

export const personalInfoData = [];

const allInputs = document.querySelectorAll(".input");

const userName = document.getElementById("input-name");
const userEmail = document.getElementById("input-email");
const userPhone = document.getElementById("input-phone");

const btnNext = document.querySelector(".btn-next");

// NAV
const allNavBtns = document.querySelectorAll(".nav-btn");

function handleNavBtn(e) {
  allNavBtns.forEach(btn => btn.classList.remove("current-page"));
  e.target.classList.add("current-page");
}

allNavBtns.forEach(btn => {
  btn.addEventListener("click", handleNavBtn);
});

/********* Personal Info Page *********/
function personalInfoPage() {
  // VARIABLES
  const currentPageNum = 1;

  // FUNCTIONS
  // Saving user data
  function saveUserInfo() {
    personalInfoData.push({
      id: crypto.randomUUID(),
      userName: userName.value,
      userEmail: userEmail.value,
      userPhone: userPhone.value,
    });
    console.log("script: ", personalInfoData);
  }

  // Update input value attribute
  function updateInputValue() {
    userName.setAttribute("value", userName.value);
    userEmail.setAttribute("value", userEmail.value);
    userPhone.setAttribute("value", userPhone.value);
  }

  // Input Validation
  // 1 - Live Empty Input Check
  function liveEmptyInputCheck(e) {
    const inputHint = e.target
      .closest(".form-item")
      .querySelector(".input-label")
      .querySelector(".input-hint");

    if (e.target.value.trim().length > 0) {
      e.target.classList.remove("red-border");
      inputHint.textContent = "";
    } else {
      e.target.classList.add("red-border");
      inputHint.textContent = "This field is required";
    }
  }

  allInputs.forEach(input => {
    input.addEventListener("input", updateInputValue);
    input.addEventListener("input", liveEmptyInputCheck);
  });
  allInputs.forEach(input =>
    input.addEventListener("focusout", liveEmptyInputCheck)
  );

  // 2 - Form Validation Check (for after btn click)
  function validateForm() {
    const nameRegex = /^[a-zA-Z ]{2,30}$/; // Only letters and spaces, 2-30 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^(\+?\d{1,2}\s)?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/;
    const userNameVal = userName.value.trim();
    const userEmailVal = userEmail.value.trim();
    const userPhoneVal = userPhone.value.trim();

    const nameHint = document.querySelector(".name-hint");
    const emailHint = document.querySelector(".email-hint");
    const phoneHint = document.querySelector(".phone-hint");

    function emptyInput(input, inputHint) {
      input.classList.add("red-border");
      inputHint.textContent = "This field is required";
    }

    function invalidInput(input, inputHint) {
      input.classList.add("red-border");
      inputHint.textContent = `Invalid ${input.name}`;
    }

    function validInput(input, inputHint) {
      input.classList.remove("red-border");
      inputHint.textContent = "";
    }

    if (userNameVal.length === 0) {
      emptyInput(userName, nameHint);
    } else if (!nameRegex.test(userNameVal)) {
      invalidInput(userName, nameHint);
    } else if (nameRegex.test(userNameVal)) {
      validInput(userName, nameHint);
    }

    if (userEmailVal.length === 0) {
      emptyInput(userEmail, emailHint);
    } else if (!emailRegex.test(userEmailVal)) {
      invalidInput(userEmail, emailHint);
    } else if (emailRegex.test(userEmailVal)) {
      validInput(userEmail, emailHint);
    }

    if (userPhoneVal.length === 0) {
      emptyInput(userPhone, phoneHint);
    } else if (!phoneRegex.test(userPhoneVal)) {
      invalidInput(userPhone, phoneHint);
    } else if (phoneRegex.test(userPhoneVal)) {
      validInput(userPhone, phoneHint);
    }

    if (
      nameRegex.test(userNameVal) &&
      emailRegex.test(userEmailVal) &&
      phoneRegex.test(userPhoneVal)
    ) {
      // Save form info
      saveUserInfo();

      // Redirect to next html page
      const nextPageUrl = htmlPages.find(
        page => page.pageNum === currentPageNum + 1
      ).url;

      window.location.replace(nextPageUrl);
    }
  }
  btnNext.addEventListener("click", validateForm);
}

/********* Select Plan Page *********/
function selectPlanPage() {}

// CALL FNS
personalInfoPage();
