/********************************************/
/********* Page Elements *********/
const personalInfo = document.getElementById("personal-info");
const selectPlan = document.getElementById("select-plan");
const addOns = document.getElementById("add-ons");
const summary = document.getElementById("summary");
const confirmed = document.getElementById("confirmed");

/********************************************/
/********* General *********/
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

// Add / Remove 'hidden' class
function addHiddenClass(target) {
  target.classList.add("hidden");
}
function removeHiddenClass(target) {
  target.classList.remove("hidden");
}

/********************************************/
/********* STEP 1: Personal Info *********/
const allInputs = document.querySelectorAll(".input");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");

// Saving user data
function saveUserInfo() {
  currentUserInfo.userName = userName.value;
  currentUserInfo.userEmail = userEmail.value;
  currentUserInfo.userPhone = userPhone.value;
}

// Update input value attribute so the input values stay on page
function updateInputValue() {
  userName.setAttribute("value", userName.value);
  userEmail.setAttribute("value", userEmail.value);
  userPhone.setAttribute("value", userPhone.value);
}

// Input Validation
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

allInputs.forEach(input => {
  input.addEventListener("input", updateInputValue);
  input.addEventListener("input", liveEmptyInputCheck);
});
allInputs.forEach(input =>
  input.addEventListener("focusout", liveEmptyInputCheck)
);

// 2 - Form Validation Check (for after btn click)
function validateForm() {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex =
    /^(\+\d{1,3}[- ]?)?(\(\d{3}\)|\d{0,3})?[- ]?\d{3}[- ]?\d{4}$/;

  const nameHint = document.querySelector(".input__hint--name");
  const emailHint = document.querySelector(".input__hint--email");
  const phoneHint = document.querySelector(".input__hint--phone");

  function validateInput(input, inputHint, regex) {
    const inputValue = input.value.trim();

    if (inputValue.length === 0) {
      addRedBorder(input);
      inputHint.textContent = "This field is required";
      return false;
    } else if (!regex.test(inputValue)) {
      addRedBorder(input);
      inputHint.textContent = `Invalid ${input.name}`;
      return false;
    } else {
      removeRedBorder(input);
      inputHint.textContent = "";
      return true;
    }
  }

  const isNameValid = validateInput(userName, nameHint, nameRegex);
  const isEmailValid = validateInput(userEmail, emailHint, emailRegex);
  const isPhoneValid = validateInput(userPhone, phoneHint, phoneRegex);

  if (isNameValid && isEmailValid && isPhoneValid) {
    // Save form info
    saveUserInfo();

    return true;
  }
  return false;
}

/********************************************/
/********* STEP 2: Select Plan *********/
function selectPlanPage() {
  const planItems = document.querySelectorAll(".form__item--plan");
  const monthlyPlans = document.querySelector(".form__select-plan--monthly");
  const yearlyPlans = document.querySelector(".form__select-plan--yearly");
  const btnMonthly = document.querySelector(".btn--monthly");
  const btnYearly = document.querySelector(".btn--yearly");
  const btnTogglePlans = document.querySelector(".btn--toggle");
  let currentUserPlan = document.querySelector(
    `.${currentUserInfo.plan} input`
  );

  function choosePlan() {
    planItems.forEach(item => {
      item.classList.remove("checked");
    });
    this.classList.add("checked");
    currentUserPlan = this.querySelector(".input-radio");
    currentUserInfo.plan = currentUserPlan.value;
  }

  function displayPlans(planType) {
    const plansToHide = planType === "monthly" ? yearlyPlans : monthlyPlans;
    const plansToShow = planType === "monthly" ? monthlyPlans : yearlyPlans;
    const defaultPlan = plansToShow.querySelector(
      ".form__item--plan .input-radio" // first plan out of three
    );

    btnMonthly.classList.toggle("chosen-period", planType === "monthly");
    btnYearly.classList.toggle("chosen-period", planType === "yearly");
    btnTogglePlans.querySelector("img").src =
      planType === "monthly"
        ? "../assets/images/icon-toggle-left.svg"
        : "../assets/images/icon-toggle-right.svg";

    addHiddenClass(plansToHide);
    removeHiddenClass(plansToShow);

    // remove previously checked plan and show default plan when switching to monthly/yearly plan
    planItems.forEach(item => {
      item.classList.remove("checked");
    });
    defaultPlan.closest(".form__item--plan").classList.add("checked");
    currentUserPlan = defaultPlan;
    currentUserInfo.plan = currentUserPlan.value;
  }

  function togglePlans() {
    const currentPlanType = btnMonthly.classList.contains("chosen-period")
      ? "monthly"
      : "yearly";
    const newPlanType = currentPlanType === "monthly" ? "yearly" : "monthly";
    displayPlans(newPlanType);
  }

  planItems.forEach(item => {
    item.addEventListener("click", choosePlan);
  });

  btnMonthly.addEventListener("click", togglePlans);
  btnYearly.addEventListener("click", togglePlans);
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
function removeCurrentPageClass(target) {
  target.classList.remove("current-page");
}
function addCurrentPageClass(target) {
  target.classList.add("current-page");
}

function summaryPage() {
  const allChangePlanBtns = document.querySelectorAll(".btn--change-plan");

  function goToSelectPlanPage() {
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn3);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn2);

    stepTitle.textContent = "Select your plan";
    stepSubtitle.textContent =
      "You have the option of monthly or yearly billing.";

    removeHiddenClass(selectPlan);
    addHiddenClass(personalInfo);
    addHiddenClass(addOns);
    addHiddenClass(summary);
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
    validateForm();

    if (validateForm()) {
      removeCurrentPageClass(navBtn1);
      removeCurrentPageClass(navBtn3);
      removeCurrentPageClass(navBtn4);
      addCurrentPageClass(navBtn2);

      stepTitle.textContent = "Select your plan";
      stepSubtitle.textContent =
        "You have the option of monthly or yearly billing.";

      removeHiddenClass(selectPlan);
      addHiddenClass(personalInfo);
      addHiddenClass(addOns);
      addHiddenClass(summary);

      btnBack.classList.remove("hidden-btn");
    } else return;
  } else if (!selectPlan.classList.contains("hidden")) {
    // Going from STEP 2 to STEP 3
    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn3);

    stepTitle.textContent = "Pick add-ons";
    stepSubtitle.textContent = "Add-ons help enhance your gaming experience.";

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
    const chosenAddOnsPeriod = Array.from(
      document.querySelectorAll(".custom-checkbox__container")
    ).find(item => !item.classList.contains("hidden"));

    const allChosenAddOnInputs = Array.from(
      chosenAddOnsPeriod.querySelectorAll("input")
    ).filter(item => item.checked);

    const chosenAddOns = allChosenAddOnInputs.map(item => item.value);
    currentUserInfo.addOns = chosenAddOns;

    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn3);
    addCurrentPageClass(navBtn4);

    stepTitle.textContent = "Finishing up";
    stepSubtitle.textContent =
      "Double-check everything looks OK before confirming.";

    removeHiddenClass(summary);
    addHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(addOns);

    // Which summary to display: monthly or yearly
    if (chosenAddOnsPeriod.classList.contains("custom-checkbox--monthly")) {
      document.querySelector(".summary--monthly").classList.remove("hidden");
      document.querySelector(".summary--yearly").classList.add("hidden");
    } else if (
      chosenAddOnsPeriod.classList.contains("custom-checkbox--yearly")
    ) {
      document.querySelector(".summary--monthly").classList.add("hidden");
      document.querySelector(".summary--yearly").classList.remove("hidden");
    }

    // bring and apply correct data
    const [planTitleStr, planPeriodStr] = currentUserInfo.plan.split("-");
    const planPriceNum = pricing[planPeriodStr].plan[planTitleStr];
    const currentAddOns = currentUserInfo.addOns;

    const addOnTextContentArr = currentAddOns.map(addon => {
      function addOnsToCamelCase(str) {
        return `${str.split("-")[0]}${str
          .split("-")[1]
          .slice(0, 1)
          .toUpperCase()}${str.split("-")[1].slice(1)}`;
      }

      function addOnsToCapitalized(str) {
        return `${str.split("-")[0].slice(0, 1).toUpperCase()}${str
          .split("-")[0]
          .slice(1)} ${str.split("-")[1].slice(0, 1).toUpperCase()}${str
          .split("-")[1]
          .slice(1)}`;
      }

      const camelCaseTitle = addOnsToCamelCase(addon);
      const capitalizedTitle = addOnsToCapitalized(addon);
      return {
        addOnTitle: capitalizedTitle,
        addOnPrice: pricing[planPeriodStr].addOns[camelCaseTitle],
      };
    });

    // Display different summary depending on payment term (monthly / yearly)
    // prices
    const planTitle = document.querySelector(
      `.chosen-plan__name-title.chosen-plan__name-title--${planPeriodStr}`
    );
    const planPrice = document.querySelector(
      `.chosen-plan__price-num.chosen-plan__price-num--${planPeriodStr}`
    );

    const addOnsPriceNums = addOnTextContentArr.map(i => +i.addOnPrice);
    const totalPriceNum =
      +planPriceNum + addOnsPriceNums.reduce((acc, cur) => acc + cur, 0);

    // text content
    planTitle.textContent = `${planTitleStr
      .slice(0, 1)
      .toUpperCase()}${planTitleStr.slice(1)}`;
    planPrice.textContent = planPriceNum;

    function createAddOnTextContent() {
      if (addOnTextContentArr.length > 0) {
        return addOnTextContentArr
          .map(i => {
            return `
            <div class="add-on">
              <p class="add-on-name cool-gray-text">
                <span class="add-on-name-title">${i.addOnTitle}</span>
              </p>
              <p class="add-on-price">
                +$<span class="add-on-price-num">${i.addOnPrice}</span>/${
              planPeriodStr === "monthly" ? "mo" : "yr"
            }
              </p>
            </div>
          `;
          })
          .join("");
      } else {
        return `
          <div class="add-on">
            <p class="add-on-name cool-gray-text">
              <span class="add-on-name-title">No add-ons selected</span>
            </p>
            <button class="btn--change-addons cool-gray-text">Add</button>
          </div>
        `;
      }
    }

    const addOnsContainer = document.querySelector(
      `.chosen-add-ons.chosen-add-ons--${planPeriodStr}`
    );
    addOnsContainer.innerHTML = createAddOnTextContent();

    const totalPrice = document.querySelector(
      `.total-cost__price-num.total-cost__price-num--${planPeriodStr}`
    );
    totalPrice.textContent = totalPriceNum;

    // add addons btn
    const changeAddOnsBtn = document.querySelector(".btn--change-addons");

    function goToSelectAddOnsPage() {
      removeCurrentPageClass(navBtn1);
      removeCurrentPageClass(navBtn2);
      removeCurrentPageClass(navBtn4);
      addCurrentPageClass(navBtn3);

      stepTitle.textContent = "Pick add-ons";
      stepSubtitle.textContent = "Add-ons help enhance your gaming experience.";

      removeHiddenClass(addOns);
      addHiddenClass(personalInfo);
      addHiddenClass(selectPlan);
      addHiddenClass(summary);
    }

    changeAddOnsBtn?.addEventListener("click", goToSelectAddOnsPage);
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

btnNext.addEventListener("click", nextStep);

/********************************************/
/********* Go Back Button *********/
function goBack() {
  if (!selectPlan.classList.contains("hidden")) {
    // Going from STEP 2 to STEP 1
    stepTitle.textContent = "Personal info";
    stepSubtitle.textContent =
      "Please provide your name, email address, and phone number.";

    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn3);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn1);

    removeHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(addOns);
    addHiddenClass(summary);

    btnBack.classList.add("hidden-btn");
  } else if (!addOns.classList.contains("hidden")) {
    // Going from STEP 3 to STEP 2
    stepTitle.textContent = "Select your plan";
    stepSubtitle.textContent =
      "You have the option of monthly or yearly billing.";

    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn3);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn2);

    removeHiddenClass(selectPlan);
    addHiddenClass(personalInfo);
    addHiddenClass(addOns);
    addHiddenClass(summary);
  } else if (!summary.classList.contains("hidden")) {
    // Going from STEP 4 to STEP 3
    stepTitle.textContent = "Pick add-ons";
    stepSubtitle.textContent = "Add-ons help enhance your gaming experience.";

    removeCurrentPageClass(navBtn1);
    removeCurrentPageClass(navBtn2);
    removeCurrentPageClass(navBtn4);
    addCurrentPageClass(navBtn3);

    removeHiddenClass(addOns);
    addHiddenClass(personalInfo);
    addHiddenClass(selectPlan);
    addHiddenClass(summary);
    addHiddenClass(confirmed);
  }
}

btnBack.addEventListener("click", goBack);
