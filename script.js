/********************************************/
/********* Page Elements *********/
const personalInfo = document.getElementById("personal-info");
const selectPlan = document.getElementById("select-plan");
const addOns = document.getElementById("add-ons");
const summary = document.getElementById("summary");
const confirmed = document.getElementById("confirmed");

/********************************************/
/********* General *********/
// VARIABLES
// Product pricing info
const pricing = {
  monthly: {
    plan: {
      arcade: "9",
      advanced: "12",
      pro: "15",
    },
    addOns: {
      onlineService: "1",
      largerStorage: "2",
      customizableProfile: "2",
    },
  },
  yearly: {
    plan: {
      arcade: "90",
      advanced: "120",
      pro: "150",
    },
    addOns: {
      onlineService: "10",
      largerStorage: "20",
      customizableProfile: "20",
    },
  },
};

// initial current user data
let currentUserInfo = {
  id: crypto.randomUUID(),
  userName: "",
  userEmail: "",
  userPhone: "",
  plan: "arcade-monthly",
  addOns: ["online-service-monthly", "larger storage-monthly"],
};

const stepTitle = document.querySelector(".heading-primary");
const stepSubtitle = document.querySelector(".heading-secondary");

const allNavBtns = document.querySelectorAll(".btn--nav");
const navBtn1 = document.querySelector(".btn--nav-1");
const navBtn2 = document.querySelector(".btn--nav-2");
const navBtn3 = document.querySelector(".btn--nav-3");
const navBtn4 = document.querySelector(".btn--nav-4");

const btnNext = document.querySelector(".btn--next");
const btnBack = document.querySelector(".btn--back");

// FUNCTIONS
// Add / Remove 'hidden' class
function addHiddenClass(target) {
  target.classList.add("hidden");
}
function removeHiddenClass(target) {
  target.classList.remove("hidden");
}

/********************************************/
/********* STEP 1: Personal Info *********/
// VARIABLES
const allInputs = document.querySelectorAll(".input");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");

// FUNCTIONS
// Saving user data
function saveUserInfo() {
  currentUserInfo.userName = userName.value;
  currentUserInfo.userEmail = userEmail.value;
  currentUserInfo.userPhone = userPhone.value;

  console.log("After saving user info: ", currentUserInfo);
}

// Update input value attribute so the input values stay on page
function updateInputValue() {
  userName.setAttribute("value", userName.value);
  userEmail.setAttribute("value", userEmail.value);
  userPhone.setAttribute("value", userPhone.value);
}

// Input Validation
// Add / Remove red border
function addRedBorder(target) {
  target.classList.add("border--red");
}
function removeRedBorder(target) {
  target.classList.remove("border--red");
}

// 1 - Real-time empty input check
function liveEmptyInputCheck(e) {
  const inputHint = e.target
    .closest(".form__item")
    .querySelector(".input__label")
    .querySelector(".input__hint");

  if (e.target.value.trim().length > 0) {
    removeRedBorder(e.target);
    inputHint.textContent = "";
  } else {
    addRedBorder(e.target);
    inputHint.textContent = "This field is required";
  }
}

// when the user types
allInputs.forEach(input => {
  input.addEventListener("input", updateInputValue);
  input.addEventListener("input", liveEmptyInputCheck);
});
// when the user focuses out
allInputs.forEach(input =>
  input.addEventListener("focusout", liveEmptyInputCheck)
);

// 2 - Form Validation Check (for after btn click)
function validateForm() {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

  const userNameVal = userName.value.trim();
  const userEmailVal = userEmail.value.trim();
  const userPhoneVal = userPhone.value.trim();

  const nameHint = document.querySelector(".input__hint--name");
  const emailHint = document.querySelector(".input__hint--email");
  const phoneHint = document.querySelector(".input__hint--phone");

  // add red border + hint for empty input
  function emptyInput(input, inputHint) {
    addRedBorder(input);
    inputHint.textContent = "This field is required";
  }
  // add red border + hint for invalid input
  function invalidInput(input, inputHint) {
    addRedBorder(input);
    inputHint.textContent = `Invalid ${input.name}`;
  }
  // remove red border + hint for valid input
  function validInput(input, inputHint) {
    removeRedBorder(input);
    inputHint.textContent = "";
  }

  // Display hint + border
  // Name input
  if (userNameVal.length === 0) {
    emptyInput(userName, nameHint);
  } else if (!nameRegex.test(userNameVal)) {
    invalidInput(userName, nameHint);
  } else if (nameRegex.test(userNameVal)) {
    validInput(userName, nameHint);
  }
  // Email input
  if (userEmailVal.length === 0) {
    emptyInput(userEmail, emailHint);
  } else if (!emailRegex.test(userEmailVal)) {
    invalidInput(userEmail, emailHint);
  } else if (emailRegex.test(userEmailVal)) {
    validInput(userEmail, emailHint);
  }
  // Phone input
  if (userPhoneVal.length === 0) {
    emptyInput(userPhone, phoneHint);
  } else if (!phoneRegex.test(userPhoneVal)) {
    invalidInput(userPhone, phoneHint);
  } else if (phoneRegex.test(userPhoneVal)) {
    validInput(userPhone, phoneHint);
  }

  // When name, email, phone inputs are all valid
  if (
    nameRegex.test(userNameVal) &&
    emailRegex.test(userEmailVal) &&
    phoneRegex.test(userPhoneVal)
  ) {
    // Save form info
    saveUserInfo();

    return true;
  }
  return false;
}

/********************************************/
/********* STEP 2: Select Plan *********/
function selectPlanPage() {
  // VARIABLES
  const allPlanItems = document.querySelectorAll(".form__item--plan");
  const monthlyPlans = document.querySelector(".form__select-plan--monthly");
  const yearlyPlans = document.querySelector(".form__select-plan--yearly");

  const btnMonthly = document.querySelector(".btn--monthly");
  const btnYearly = document.querySelector(".btn--yearly");
  const btnTogglePlans = document.querySelector(".btn--toggle");

  // Default plan selected - "arcade-monthly"
  let selectedPlan = document.querySelector(`.${currentUserInfo.plan}`);
  let selectedPlanInput = selectedPlan.querySelector("input");

  // FUNCTIONS
  // 1 - clicking / unclicking plan item
  function choosePlan() {
    // remove "checked" classs + set checked=false to selected radio input
    allPlanItems.forEach(item => {
      item.classList.remove("checked");
      item.querySelector("input").setAttribute("checked", false);
    });

    // update selected plan
    selectedPlan = this;
    selectedPlanInput = this.querySelector("input");
    // add "checked" classs + set checked=true to selected radio input
    this.classList.add("checked");
    selectedPlanInput.setAttribute("checked", true);

    // update the plan on current user data
    currentUserInfo.plan = selectedPlanInput.value;
    console.log("after choosing plan: ", currentUserInfo);
  }
  // all plan items listen for click event
  allPlanItems.forEach(item => item.addEventListener("click", choosePlan));

  // 3 - Toggle Display: Monthly or Yearly
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
    yearlyPlans.querySelectorAll(".form__item").forEach(item => {
      item.classList.remove("checked");
      item.querySelector("input").setAttribute("checked", false);
    });
    currentUserInfo.plan = "";

    //- choose first plan from monthly plans and add 'checked'
    monthlyPlans
      .querySelectorAll(".form__item--plan")[0]
      .querySelector("input")
      .setAttribute("checked", true);
    monthlyPlans
      .querySelectorAll(".form__item--plan")[0]
      .classList.add("checked");

    // find current user data and update the plan
    currentUserInfo.plan = monthlyPlans
      .querySelectorAll(".form__item--plan")[0]
      .querySelector("input").value;
    console.log("Switching to monthly plans: ", currentUserInfo);

    // hide yearly plans and show monthly plans
    addHiddenClass(yearlyPlans);
    removeHiddenClass(monthlyPlans);
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
    monthlyPlans.querySelectorAll(".form__item--plan").forEach(item => {
      item.classList.remove("checked");
      item.querySelector("input").setAttribute("checked", false);
    });

    //- choose first plan from yearly plans
    yearlyPlans
      .querySelectorAll(".form__item--plan")[0]
      .querySelector("input")
      .setAttribute("checked", true);
    yearlyPlans
      .querySelectorAll(".form__item--plan")[0]
      .classList.add("checked");

    // find current user data and update the plan
    currentUserInfo.plan = yearlyPlans
      .querySelectorAll(".form__item")[0]
      .querySelector("input").value;
    console.log("Switching to yearly plans: ", currentUserInfo);

    // hide monthly plans and show yearly plans
    addHiddenClass(monthlyPlans);
    removeHiddenClass(yearlyPlans);
  }
  // when Yearly button clicked
  btnYearly.addEventListener("click", displayYearlyPlans);

  // toggle plans
  function togglePlans() {
    if (
      // yearly => monthly
      btnTogglePlans.querySelector("img").getAttribute("src") ===
      "../assets/images/icon-toggle-left.svg"
    ) {
      displayYearlyPlans();
    } else if (
      // monthly => yearly
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

  // toggle border + background when clicked
  allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      this.classList.toggle("checked");
    });
  });
}

/********************************************/
/********* Summary Page *********/
// Add / Remove 'current-page' class
function removeCurrentPageClass(target) {
  target.classList.remove("current-page");
}
function addCurrentPageClass(target) {
  target.classList.add("current-page");
}

function summaryPage() {
  // when clicking on "change" btn to change plans
  const allChangePlanBtns = document.querySelectorAll(".btn--change-plan");
  function goToSelectPlanPage() {
    // Nav button style change
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn3);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn2);

    // Show Select Plan Page
    removeHiddenClass(selectPlan);
    addHiddenClass(personalInfo);
    addHiddenClass(addOns);
    addHiddenClass(summary);

    // Change headings
    stepTitle.textContent = "Select your plan";
    stepSubtitle.textContent =
      "You have the option of monthly or yearly billing.";
  }

  allChangePlanBtns.forEach(btn =>
    btn.addEventListener("click", goToSelectPlanPage)
  );
}

/********************************************/
/********* CALL PAGE ELEMENT FUNCTIONS *********/
selectPlanPage();
addOnsPage();
summaryPage();

/********************************************/
/********* Next Step Button *********/
function nextStep() {
  if (!personalInfo.classList.contains("hidden")) {
    // Going from STEP 1 to STEP 2
    // save validated user info(name, email, phone)
    validateForm();
    // If everything on form is valid
    if (validateForm()) {
      // Nav button style change
      removeCurrentPageClass(navBtn1);
      removeCurrentPageClass(navBtn3);
      removeCurrentPageClass(navBtn4);
      addCurrentPageClass(navBtn2);

      // Change headings
      stepTitle.textContent = "Select your plan";
      stepSubtitle.textContent =
        "You have the option of monthly or yearly billing.";

      // Showing the corresponding page
      removeHiddenClass(selectPlan);
      addHiddenClass(personalInfo);
      addHiddenClass(addOns);
      addHiddenClass(summary);

      // Un-hide the Go Back btn
      btnBack.classList.remove("hidden-btn");
    } else return;
  } else if (!selectPlan.classList.contains("hidden")) {
    // Going from STEP 2 to STEP 3
    // Nav button style change
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn3);

    // Change headings
    stepTitle.textContent = "Pick add-ons";
    stepSubtitle.textContent = "Add-ons help enhance your gaming experience.";

    // Showing the corresponding page
    removeHiddenClass(addOns);
    addHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(summary);

    // Showing either monthly add-ons or yearly add-ons
    if (
      document
        .querySelector(".form__item--plan.checked")
        .closest(".form__select-plan--monthly")
    ) {
      document
        .querySelector(".custom-checkbox--monthly")
        .classList.remove("hidden");
      document
        .querySelector(".custom-checkbox--yearly")
        .classList.add("hidden");
    } else if (
      document
        .querySelector(".form__item--plan.checked")
        .closest(".form__select-plan--yearly")
    ) {
      document
        .querySelector(".custom-checkbox--yearly")
        .classList.remove("hidden");
      document
        .querySelector(".custom-checkbox--monthly")
        .classList.add("hidden");
    }
  } else if (!addOns.classList.contains("hidden")) {
    // Going from STEP 3 to STEP 4
    // Save chosen add-ons in the currentUserInfo
    const chosenAddOnsPeriod = Array.from(
      document.querySelectorAll(".custom-checkbox__container")
    ).find(item => !item.classList.contains("hidden"));

    const allChosenAddOnInputs = Array.from(
      chosenAddOnsPeriod.querySelectorAll("input")
    ).filter(item => item.checked);

    const chosenAddOns = allChosenAddOnInputs.map(item => item.value);
    currentUserInfo.addOns = chosenAddOns;
    console.log(currentUserInfo);

    // Nav button style change
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn3);
    addCurrentPageClass(navBtn4);

    // Change headings
    stepTitle.textContent = "Finishing up";
    stepSubtitle.textContent =
      "Double-check everything looks OK before confirming.";

    // Showing the corresponding page
    removeHiddenClass(summary);
    addHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(addOns);

    // Which summary to display: monthly or yearly
    if (chosenAddOnsPeriod.classList.contains("custom-checkbox--monthly")) {
      // MONTHLY
      document.querySelector(".summary--monthly").classList.remove("hidden");
      document.querySelector(".summary--yearly").classList.add("hidden");
    } else if (
      chosenAddOnsPeriod.classList.contains("custom-checkbox--yearly")
    ) {
      // YEARLY
      document.querySelector(".summary--monthly").classList.add("hidden");
      document.querySelector(".summary--yearly").classList.remove("hidden");
    }

    // bring and apply correct data
    // Plan Title
    const planTitleStr = currentUserInfo.plan.split("-")[0]; // arcade
    // Plan Period
    const planPeriodStr = currentUserInfo.plan.split("-")[1]; // monthly
    // Plan Price
    const planPriceNum = pricing[planPeriodStr].plan[planTitleStr];

    // AddOns
    const currentAddOns = currentUserInfo.addOns; // ['online-service-monthly', 'larger-storage-monthly'] or []

    function addOnsToCamelCase(str) {
      return `${str.split("-")[0]}${str
        .split("-")[1]
        .slice(0, 1)
        .toUpperCase()}${str.split("-")[1].slice(1)}`;
    }
    // 'onlineService'

    function addOnsToCapitalized(str) {
      return `${str.split("-")[0].slice(0, 1).toUpperCase()}${str
        .split("-")[0]
        .slice(1)} ${str.split("-")[1].slice(0, 1).toUpperCase()}${str
        .split("-")[1]
        .slice(1)}`;
    }
    // ['Online Service', 'Larger Storage']

    const addOnTextContentArr = currentAddOns.map(addon => {
      const camelCaseTitle = addOnsToCamelCase(addon);
      const capitalizedTitle = addOnsToCapitalized(addon);
      return {
        addOnTitle: capitalizedTitle,
        addOnPrice: pricing[planPeriodStr].addOns[camelCaseTitle],
      };
    });
    /* 
      [
        {
          addOnTitle: 'Online Service',
          addOnPrice: '1'
        },
        {
          addOnTitle: 'Larger Storage',
          addOnPrice: '2'
        }
      ]  
      */
    console.log("addOnTextContentArr: ", addOnTextContentArr);

    // Display different summary depending on payment term (monthly / yearly)
    // prices
    const addOnsPriceNums = addOnTextContentArr.map(i => +i.addOnPrice);
    const totalPriceNum =
      +planPriceNum + addOnsPriceNums.reduce((acc, cur) => acc + cur, 0);

    // monthly
    if (planPeriodStr === "monthly") {
      const planTitle = document.querySelector(
        ".chosen-plan__name-title.chosen-plan__name-title--monthly"
      );
      const planPrice = document.querySelector(
        ".chosen-plan__price-num.chosen-plan__price-num--monthly"
      );
      planTitle.textContent = `${planTitleStr
        .slice(0, 1)
        .toUpperCase()}${planTitleStr.slice(1)}`; // Arcade
      planPrice.textContent = planPriceNum;

      const addOnTextContent = addOnTextContentArr
        .map(i => {
          return `
            <div class="add-on">
              <p class="add-on-name cool-gray-text">
                <span class="add-on-name-title">${i.addOnTitle}</span>
              </p>
              <p class="add-on-price">
                +$<span class="add-on-price-num">${i.addOnPrice}</span>/mo
              </p>
            </div>
          `;
        })
        .join("");

      const addOnsContainer = document.querySelector(
        ".chosen-add-ons.chosen-add-ons--monthly"
      );
      addOnsContainer.innerHTML = addOnTextContent;

      // Total Price
      const totalPrice = document.querySelector(
        ".total-cost__price-num.total-cost__price-num--monthly"
      );
      totalPrice.textContent = totalPriceNum;
    } else if (planPeriodStr === "yearly") {
      // yearly
      const planTitle = document.querySelector(
        ".chosen-plan__name-title.chosen-plan__name-title--yearly"
      );
      const planPrice = document.querySelector(
        ".chosen-plan__price-num.chosen-plan__price-num--yearly"
      );
      planTitle.textContent = `${planTitleStr
        .slice(0, 1)
        .toUpperCase()}${planTitleStr.slice(1)}`; // Arcade
      planPrice.textContent = planPriceNum;

      const addOnTextContent = addOnTextContentArr
        .map(i => {
          return `
          <div class="add-on">
            <p class="add-on-name cool-gray-text">
              <span class="add-on-name-title">${i.addOnTitle}</span>
            </p>
            <p class="add-on-price">
              +$<span class="add-on-price-num">${i.addOnPrice}</span>/yr
            </p>
          </div>
        `;
        })
        .join("");

      const addOnsContainer = document.querySelector(
        ".chosen-add-ons.chosen-add-ons--yearly"
      );
      addOnsContainer.innerHTML = addOnTextContent;

      // Total Price
      const totalPrice = document.querySelector(
        ".total-cost__price-num.total-cost__price-num--yearly"
      );
      totalPrice.textContent = totalPriceNum;
    }
    // }
  } else if (!summary.classList.contains("hidden")) {
    // Going from SUMMARY to CONFIRMED (thank you page)
    // remove main headings
    stepTitle.textContent = "";
    stepSubtitle.textContent = "";

    // Showing the corresponding page
    removeHiddenClass(confirmed);
    addHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(addOns);
    addHiddenClass(summary);

    // remove all btns
    const footer = document.querySelector(".footer");
    footer.classList.add("hidden");

    // change default styles
    document.querySelector(".main").style.padding = "35px 20px";
    document.querySelector(".heading-secondary").style.margin = "0";
  }
}

// Click the Next Step Button
btnNext.addEventListener("click", nextStep);

/********************************************/
/********* Go Back Button *********/
function goBack() {
  if (!selectPlan.classList.contains("hidden")) {
    // Going from STEP 2 to STEP 1
    // Change headings
    stepTitle.textContent = "Personal info";
    stepSubtitle.textContent =
      "Please provide your name, email address, and phone number.";

    // Nav button style change
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn3);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn1);

    // Showing the corresponding page
    removeHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(addOns);
    addHiddenClass(summary);

    // Hide Go Back button
    btnBack.classList.add("hidden-btn");
  } else if (!addOns.classList.contains("hidden")) {
    // Going from STEP 3 to STEP 2
    // Change headings
    stepTitle.textContent = "Select your plan";
    stepSubtitle.textContent =
      "You have the option of monthly or yearly billing.";

    // Nav button style change
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn3);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn2);

    // Showing the corresponding page
    removeHiddenClass(selectPlan);
    addHiddenClass(personalInfo);
    addHiddenClass(addOns);
    addHiddenClass(summary);
  } else if (!summary.classList.contains("hidden")) {
    // Going from STEP 4 to STEP 3
    // Change headings
    stepTitle.textContent = "Pick add-ons";
    stepSubtitle.textContent = "Add-ons help enhance your gaming experience.";

    // Nav button style change
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn3);

    // Showing the corresponding page
    removeHiddenClass(addOns);
    addHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(summary);
    addHiddenClass(confirmed);
  }
}
// Click the Go Back Button
btnBack.addEventListener("click", goBack);
