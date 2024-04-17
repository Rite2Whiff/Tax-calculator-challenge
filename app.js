const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const myModal = document.querySelector("#myModal");
const modalButton = document.querySelector(".close-modal");
const form = document.querySelector("form");
const inputFields = document.querySelector("input");
const annualIncome = document.querySelector("#GrossIncome");
const extraIncome = document.querySelector("#ExtraIncome");
const ageGroup = document.querySelector("#AgeGroup");
const appDeductions = document.querySelector("#ApplicableDeductions");

const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

modalButton.addEventListener("click", () => {
  myModal.classList.remove("show-modal");
});

// Validating form inputs
const validateInput = () => {
  const value = annualIncome.value;
  if (!value.match(/^\d+$/)) {
    errorIcon.classList.add("show-error-icon");
  } else {
    errorIcon.classList.remove("show-error-icon");
    return true;
  }
};

annualIncome.addEventListener("blur", (e) => {
  if (!e.target.value.match(/^\d+$/)) {
    document.querySelector(".annual-income-validation").innerHTML = "error";
  } else {
    document.querySelector(".annual-income-validation").innerHTML = "";
  }
});

extraIncome.addEventListener("blur", (e) => {
  if (!e.target.value.match(/^\d+$/)) {
    document.querySelector(".extra-income-validation").innerHTML = "error";
  } else {
    document.querySelector(".extra-income-validation").innerHTML = "";
  }
});

appDeductions.addEventListener("blur", (e) => {
  if (!e.target.value.match(/^\d+$/)) {
    document.querySelector(".total-deduction-validation").innerHTML = "error";
  } else {
    document.querySelector(".total-deduction-validation").innerHTML = "";
  }
});

ageGroup.addEventListener("change", (e) => {
  if (
    e.target.value === "1" ||
    e.target.value === "2" ||
    e.target.value === "3"
  ) {
    document.querySelector(".age-range-validation").innerHTML = "";
  } else {
  }
});

// Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !annualIncome.value.match(/^\d+$/) ||
    !extraIncome.value.match(/^\d+$/) ||
    !appDeductions.value.match(/^\d+$/)
  ) {
    alert(
      "Hover over the warning signs in order to know about the errors and fix them before form submission"
    );
  } else if (!ageGroup.value) {
    document.querySelector(".age-range-validation").innerHTML = "error";
  } else {
    taxableIncome();
    myModal.classList.add("show-modal");
  }
});

// Total salary calculation
const calculateTotalIncome = () => {
  const totalIncome =
    Number(annualIncome.value) +
    Number(extraIncome.value) -
    Number(appDeductions.value);
  return totalIncome;
};

// Taxable salary calculation
const taxableIncome = () => {
  let taxableIncome;
  taxableIncome = calculateTotalIncome();
  if (taxableIncome <= 800000) {
  } else {
    if (ageGroup.value === "1") {
      taxableIncome = taxableIncome - (30 / 100) * (taxableIncome - 800000);
    } else if (ageGroup.value === "2") {
      taxableIncome = taxableIncome - (40 / 100) * (taxableIncome - 800000);
    } else {
      taxableIncome = taxableIncome - (10 / 100) * (taxableIncome - 800000);
    }
  }
  document.querySelector(
    ".modal-heading"
  ).innerHTML = `Your overall income will be ${taxableIncome} after deductions`;
};
