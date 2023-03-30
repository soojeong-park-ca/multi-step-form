/********* Global *********/
const personalInfoData = [];

const htmlPages = [
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

// NAV
const allNavBtns = document.querySelectorAll(".nav-btn");

function handleNavBtn(e) {
  allNavBtns.forEach(btn => btn.classList.remove("current-page"));
  e.target.classList.add("current-page");
}

allNavBtns.forEach(btn => {
  btn.addEventListener("click", handleNavBtn);
});

/********* Personal Info Page (index.html) *********/
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
    console.log(personalInfoData);
  }

  // Update input value attribute
  function updateInputValue() {
    userName.setAttribute("value", userName.value);
    userEmail.setAttribute("value", userEmail.value);
    userPhone.setAttribute("value", userPhone.value);
  }

  // Input Validation
  // 1 - Empty Input Check
  function liveEmptyInputCheck(e) {
    const inputHint = e.target
      .closest(".form-item")
      .querySelector(".input-label")
      .querySelector(".input-hint");

    if (e.target.value.trim().length > 0) {
      e.target.classList.remove("invalid");
      inputHint.textContent = "";
    } else {
      e.target.classList.add("invalid");
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

  // 2 - Form Validation Check
  function emptyInputCheck(input, inputHint) {
    input.classList.add("invalid");
    input.required = true;
    inputHint.textContent = "This field is required";
    input.setCustomValidity("This field is required");
  }

  function formValidationCheck(e) {
    e.preventDefault();

    allInputs.forEach(input => {
      const inputHint = input
        .closest(".form-item")
        .querySelector(".input-label")
        .querySelector(".input-hint");

      if (input.name === "name") {
        const nameValue = input.value.trim();

        if (nameValue.length === 0) {
          console.log("empty name");
          emptyInputCheck(input, inputHint);
        } else if (nameValue.length < 2 || !/^[A-Za-z\s]+$/.test(nameValue)) {
          console.log("wrong name");
          input.classList.add("invalid");
          input.required = true;
          inputHint.textContent = "Invalid name.";
          input.setCustomValidity("Invalid name.");
        } else {
          console.log("correct name");
          input.classList.remove("invalid");
          input.required = false;
          inputHint.textContent = "";
          input.setCustomValidity("");
        }
      }

      if (input.name === "email") {
        const emailValue = input.value.trim();

        if (emailValue.length === 0) {
          console.log("empty email");
          emptyInputCheck(input, inputHint);
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)
        ) {
          console.log("wrong email");
          input.classList.add("invalid");
          input.required = true;
          inputHint.textContent = "Invalid email address.";
          input.setCustomValidity("Invalid email address.");
        } else {
          console.log("correct email");
          input.classList.remove("invalid");
          input.required = false;
          inputHint.textContent = "";
          input.setCustomValidity("");
        }
      }

      if (input.name === "phone") {
        const phoneValue = input.value.trim();

        if (phoneValue.length === 0) {
          console.log("empty phone");
          emptyInputCheck(input, inputHint);
        } else if (
          !/^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^(\+?\d{1,2}\s)?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/.test(
            phoneValue
          )
        ) {
          console.log("wrong phone");
          input.classList.add("invalid");
          input.required = true;
          inputHint.textContent = "Invalid phone number.";
          input.setCustomValidity("Invalid phone number.");
        } else {
          console.log("correct phone");
          input.classList.remove("invalid");
          input.required = false;
          inputHint.textContent = "";
          input.setCustomValidity("");

          // Save form info
          saveUserInfo();

          // Redirect to next html page
          const nextPageUrl = htmlPages.find(
            page => page.pageNum === currentPageNum + 1
          ).url;
          console.log(nextPageUrl);
          window.location.replace(nextPageUrl);
        }
      }
    });

    const allInvalidInputs = document.querySelectorAll(".input.invalid");
    allInvalidInputs[0]?.focus();
  }

  btnNext.addEventListener("click", formValidationCheck);
}

// CALL FNS
personalInfoPage();
