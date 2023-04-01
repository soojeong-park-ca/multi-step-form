// import { htmlPages } from "./variables.js";

/********************************************/
/********* Page Elements *********/
const personalInfo = document.getElementById("personal-info");
const selectPlan = document.getElementById("select-plan");
const addOns = document.getElementById("add-ons");
const summary = document.getElementById("summary");
const confirmed = document.getElementById("confirmed");

/********************************************/
/********* General *********/
const personalInfoData = [];
/*
  example:
  {
    id: crypto.randomUUID(),
    userName: "Jane Doe",
    userEmail: "jane@doe.com",
    userPhone: "123 123 1234",
    plan: {planName: "arcade-monthly"},
    addOns: {onlineService: true, largerStorage: false, customizableProfile: true}
  }
*/
let currentUserInfo = {
  id: crypto.randomUUID(),
  userName: "",
  userEmail: "",
  userPhone: "",
  plan: "arcade-monthly",
  addOns: [],
};

const stepTitle = document.querySelector(".heading-primary");
const stepSubtitle = document.querySelector(".heading-secondary");

const allNavBtns = document.querySelectorAll(".nav-btn");
const navBtn1 = document.querySelector(".nav-btn-1");
const navBtn2 = document.querySelector(".nav-btn-2");
const navBtn3 = document.querySelector(".nav-btn-3");
const navBtn4 = document.querySelector(".nav-btn-4");

const btnNext = document.querySelector(".btn-next");
const btnBack = document.querySelector(".btn-back");

/********************************************/
/********* Personal Info Page *********/
// function personalInfoPage() {}
// VARIABLES
const allInputs = document.querySelectorAll(".input");
const userName = document.getElementById("input-name");
const userEmail = document.getElementById("input-email");
const userPhone = document.getElementById("input-phone");

// FUNCTIONS
/*
  // Show corresponding element
  personalInfo.classList.remove("hidden");
  selectPlan.classList.add("hidden");
  addOns.classList.add("hidden");
  summary.classList.add("hidden");

  // Hide Go Back Btn
  btnBack.classList.add("hidden-btn");
  */

// Saving user data
function saveUserInfo() {
  currentUserInfo.userName = userName.value;
  currentUserInfo.userEmail = userEmail.value;
  currentUserInfo.userPhone = userPhone.value;

  console.log("Personal Info Page: ", currentUserInfo);
}

// Update input value attribute so the values stay in place
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

  // Display hint, + border
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

    return true;
    /*
    // Nav button style change
    navBtn1.classList.remove("current-page");
    navBtn3.classList.remove("current-page");
    navBtn4.classList.remove("current-page");
    navBtn2.classList.add("current-page");

    // Showing the corresponding page
    selectPlan.classList.remove("hidden");

    personalInfo.classList.add("hidden");
    addOns.classList.add("hidden");
    summary.classList.add("hidden");

    btnBack.classList.remove("hidden-btn");
    */
  }
  return false;
}

/********************************************/
/********* Select Plan Page *********/
function selectPlanPage() {
  // VARIABLES
  const allPlanItems = document.querySelectorAll(".form-item-plan");
  const monthlyPlans = document.querySelector(".form-monthly-plans");
  const yearlyPlans = document.querySelector(".form-yearly-plans");

  const btnMonthly = document.querySelector(".btn-monthly");
  const btnYearly = document.querySelector(".btn-yearly");
  const btnTogglePlans = document.querySelector(".btn-toggle");

  // Default plan selected - monthly arcade plan
  let selectedPlan = document.querySelector(`.${currentUserInfo.plan}`);
  let selectedPlanInput = selectedPlan.querySelector("input");

  allPlanItems.forEach(item => {
    item.classList.remove("checked");
    item.querySelector("input").setAttribute("checked", false);
  });
  selectedPlan.classList.add("checked");
  selectedPlanInput.setAttribute("checked", true);
  currentUserInfo.plan = selectedPlanInput.value;

  console.log(currentUserInfo);

  // FUNCTIONS
  // // Nav button style change
  // navBtn1.classList.remove("current-page");
  // navBtn3.classList.remove("current-page");
  // navBtn4.classList.remove("current-page");
  // navBtn2.classList.add("current-page");

  // // Showing the corresponding page
  // selectPlan.classList.remove("hidden");

  // personalInfo.classList.add("hidden");
  // addOns.classList.add("hidden");
  // summary.classList.add("hidden");

  // btnBack.classList.remove("hidden-btn");

  // Default plan selected - monthly arcade plan
  /*
  let selectedPlan = monthlyPlans.querySelectorAll(".form-item-plan")[0];
  selectedPlan.classList.add("checked");
  let selectedPlanInput = selectedPlan.querySelector("input");
  selectedPlanInput.setAttribute("checked", true);
  console.log(selectedPlan, selectedPlanInput);
  currentUserInfo.plan = { planName: selectedPlanInput.value };
  console.log(currentUserInfo);
  console.log(personalInfoData);
  */

  // 1 - clicking / unclicking plan item
  // add/remove styles + add/remove checked attribute from radio inputs
  function choosePlan() {
    allPlanItems.forEach(item => {
      item.classList.remove("checked");
      item.querySelector("input").setAttribute("checked", false);
    });

    // update selected plan
    selectedPlan = this;
    selectedPlanInput = this.querySelector("input");

    this.classList.add("checked");
    selectedPlanInput.setAttribute("checked", true);

    // find current user data and update the plan
    currentUserInfo.plan = selectedPlanInput.value;
    console.log(currentUserInfo);
  }

  allPlanItems.forEach(item => item.addEventListener("click", choosePlan));

  // 3 - Toggle Display - Monthly or Yearly
  // display Monthly plans
  function displayMonthlyPlans() {
    // buttons appearance
    btnYearly.classList.remove("chosen-period");
    btnMonthly.classList.add("chosen-period");

    btnTogglePlans
      .querySelector("img")
      .setAttribute("src", "../assets/images/icon-toggle-left.svg");

    // changing plan
    //- unchoose all yearly plans
    yearlyPlans.querySelectorAll(".form-item").forEach(item => {
      item.classList.remove("checked");
      item.querySelector("input").setAttribute("checked", false);
    });
    currentUserInfo.plan = "";

    //- choose first plan from monthly plans
    monthlyPlans
      .querySelectorAll(".form-item-plan")[0]
      .querySelector("input")
      .setAttribute("checked", true);
    monthlyPlans
      .querySelectorAll(".form-item-plan")[0]
      .classList.add("checked");

    // find current user data and update the plan
    currentUserInfo.plan = monthlyPlans
      .querySelectorAll(".form-item-plan")[0]
      .querySelector("input").value;
    console.log(currentUserInfo);

    // hide yearly plans and show monthly plans
    yearlyPlans.classList.add("hidden");
    monthlyPlans.classList.remove("hidden");
  }
  // when Monthly button clicked
  btnMonthly.addEventListener("click", displayMonthlyPlans);

  // display Yearly plans
  function displayYearlyPlans() {
    // buttons appearance
    btnMonthly.classList.remove("chosen-period");
    btnYearly.classList.add("chosen-period");

    btnTogglePlans
      .querySelector("img")
      .setAttribute("src", "../assets/images/icon-toggle-right.svg");

    // changing plan
    //- unchoose all yearly plans
    monthlyPlans.querySelectorAll(".form-item-plan").forEach(item => {
      item.classList.remove("checked");
      item.querySelector("input").setAttribute("checked", false);
    });

    //- choose first plan from yearly plans
    yearlyPlans
      .querySelectorAll(".form-item-plan")[0]
      .querySelector("input")
      .setAttribute("checked", true);
    yearlyPlans.querySelectorAll(".form-item-plan")[0].classList.add("checked");

    // find current user data and update the plan
    currentUserInfo.plan = yearlyPlans
      .querySelectorAll(".form-item")[0]
      .querySelector("input").value;
    console.log(currentUserInfo);

    // hide monthly plans and show yearly plans
    monthlyPlans.classList.add("hidden");
    yearlyPlans.classList.remove("hidden");
  }
  // when Yearly button clicked
  btnYearly.addEventListener("click", displayYearlyPlans);

  // toggle plans
  function togglePlans() {
    if (
      btnTogglePlans.querySelector("img").getAttribute("src") ===
      "../assets/images/icon-toggle-left.svg"
    ) {
      displayYearlyPlans();
    } else if (
      btnTogglePlans.querySelector("img").getAttribute("src") ===
      "../assets/images/icon-toggle-right.svg"
    ) {
      displayMonthlyPlans();
    }
  }

  // when toggle icon clicked
  btnTogglePlans.addEventListener("click", togglePlans);
}

/********************************************/
/********* Add Ons Page *********/
function addOnsPage() {
  const allCheckboxes = document.querySelectorAll(".custom-checkbox");

  // toggle border+background when clicked
  allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      this.classList.toggle("checked");
    });
  });
}

/********************************************/
/********* CALL PAGE ELEMENT FUNCTIONS *********/
selectPlanPage();
addOnsPage();

/********************************************/
/********* Next Step Button *********/
function nextStep() {
  if (!personalInfo.classList.contains("hidden")) {
    // save validated user info(name, email, phone)
    validateForm();
    if (validateForm()) {
      // Nav button style change
      navBtn1.classList.remove("current-page");
      navBtn3.classList.remove("current-page");
      navBtn4.classList.remove("current-page");
      navBtn2.classList.add("current-page");

      // Showing the corresponding page
      selectPlan.classList.remove("hidden");

      personalInfo.classList.add("hidden");
      addOns.classList.add("hidden");
      summary.classList.add("hidden");

      btnBack.classList.remove("hidden-btn");

      // Change headings
      stepTitle.textContent = "Select your plan";
      stepSubtitle.textContent =
        "You have the option of monthly or yearly billing.";
    }
  } else if (!selectPlan.classList.contains("hidden")) {
    // Nav button style change
    navBtn1.classList.remove("current-page");
    navBtn2.classList.remove("current-page");
    navBtn4.classList.remove("current-page");
    navBtn3.classList.add("current-page");

    // Showing the corresponding page
    addOns.classList.remove("hidden");

    personalInfo.classList.add("hidden");
    selectPlan.classList.add("hidden");
    summary.classList.add("hidden");

    if (
      document
        .querySelector(".form-item-plan.checked")
        .closest(".form-monthly-plans")
    ) {
      document
        .querySelector(".custom-checkbox-monthly")
        .classList.remove("hidden");
      document.querySelector(".custom-checkbox-yearly").classList.add("hidden");
    } else if (
      document
        .querySelector(".form-item-plan.checked")
        .closest(".form-yearly-plans")
    ) {
      document
        .querySelector(".custom-checkbox-yearly")
        .classList.remove("hidden");
      document
        .querySelector(".custom-checkbox-monthly")
        .classList.add("hidden");
    }

    // Change headings
    stepTitle.textContent = "Pick add-ons";
    stepSubtitle.textContent = "Add-ons help enhance your gaming experience.";
  } else if (!addOns.classList.contains("hidden")) {
    // Save chosen add-ons in the currentUserInfo
    const allCustomCheckboxes = document.querySelectorAll(
      ".custom-checkbox-container"
    );
    const chosenPeriod = Array.from(allCustomCheckboxes).find(
      item => !item.classList.contains("hidden")
    );
    console.log(chosenPeriod);
    const allChosenAddOns = chosenPeriod.querySelectorAll(
      ".custom-checkbox.checked"
    );
    allChosenAddOns.forEach(chosen => {
      currentUserInfo.addOns.push(chosen.querySelector("input").value);
    });
    console.log(currentUserInfo);

    // Nav button style change
    navBtn1.classList.remove("current-page");
    navBtn2.classList.remove("current-page");
    navBtn3.classList.remove("current-page");
    navBtn4.classList.add("current-page");

    // Showing the corresponding page
    summary.classList.remove("hidden");

    personalInfo.classList.add("hidden");
    selectPlan.classList.add("hidden");
    addOns.classList.add("hidden");

    // Change headings
    stepTitle.textContent = "Finishing up";
    stepSubtitle.textContent =
      "Double-check everything looks OK before confirming.";
  } else if (!summary.classList.contains("hidden")) {
    // Showing the corresponding page

    personalInfo.classList.add("hidden");
    selectPlan.classList.add("hidden");
    addOns.classList.add("hidden");
    summary.classList.add("hidden");
    confirmed.classList.remove("hidden");

    /*
    Thank you! Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
    */
  }
}
// Click the Next Step Button
btnNext.addEventListener("click", nextStep);

/********************************************/
/********* Go Back Button *********/
function goBack() {
  if (!selectPlan.classList.contains("hidden")) {
    // Hide Go Back button
    btnBack.classList.add("hidden-btn");

    // Nav button style change
    navBtn2.classList.remove("current-page");
    navBtn3.classList.remove("current-page");
    navBtn4.classList.remove("current-page");
    navBtn1.classList.add("current-page");

    // Showing the corresponding page
    personalInfo.classList.remove("hidden");

    selectPlan.classList.add("hidden");
    addOns.classList.add("hidden");
    summary.classList.add("hidden");
  } else if (!addOns.classList.contains("hidden")) {
    // Nav button style change
    navBtn1.classList.remove("current-page");
    navBtn3.classList.remove("current-page");
    navBtn4.classList.remove("current-page");
    navBtn2.classList.add("current-page");

    // Showing the corresponding page
    selectPlan.classList.remove("hidden");

    personalInfo.classList.add("hidden");
    addOns.classList.add("hidden");
    summary.classList.add("hidden");
  } else if (!summary.classList.contains("hidden")) {
    // Nav button style change
    navBtn1.classList.remove("current-page");
    navBtn3.classList.remove("current-page");
    navBtn4.classList.remove("current-page");
    navBtn2.classList.add("current-page");

    // Showing the corresponding page
    addOns.classList.remove("hidden");

    personalInfo.classList.add("hidden");
    selectPlan.classList.add("hidden");
    summary.classList.add("hidden");
    confirmed.classList.add("hidden");
  }
}
// Click the Go Back Button
btnBack.addEventListener("click", goBack);

/*
  // Go Back Button
  btnBack.addEventListener("click", function () {
    // Hide Select Plan + Go Back btn
    selectPlan.classList.add("hidden");
    btnBack.classList.add("hidden-btn");
    // Show Personal Info
    personalInfo.classList.remove("hidden");
  });
*/
