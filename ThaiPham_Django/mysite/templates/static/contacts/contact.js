// // Selectors
let submitFields = document.querySelectorAll("#submitForm input");
let messageArea = document.querySelector("#message");
let submitButton = document.querySelector("#submitbtn");
let submitForm = document.querySelector("#submitForm");
let emptyNameMessage = document.querySelector(".empty-fullname-feedback");
let emptyCompanyNameMessage = document.querySelector(
  ".empty-companyname-feedback"
);
let invalNameMessage = document.querySelector(".invalid-fullname-feedback");
let invalCompanyNameMessage = document.querySelector(
  ".invalid-companyname-feedback"
);

let emptyBizPhoneMessage = document.querySelector(
  ".empty-businessphone-feedback"
);
let emptyEmailMessage = document.querySelector(".empty-email-feedback");
let invalBizPhoneMessage = document.querySelector(
  ".invalid-businessphone-feedback"
);
let invalEmailMessage = document.querySelector(".invalid-email-feedback");
let emptyMessage = document.querySelector(".empty-message-feedback");
let invalMessage = document.querySelector(".invalid-message-feedback");

// let maintittle = document.querySelector(".maintitle");
let formLabels = document.querySelectorAll(".form-label");

// // Operational Valiables
let config = {
  fName: "uname",
  password: "pwd",
  displaynone: "none",
  displayblock: "block",
  formLabel: "form-label",
  clickedFormLabel: "clicked-form-label",
};

let inputTypes = {
  input: "input",
  click: "click",
  mouseDown: "mousedown",
  focus:"focus"
};

let condition = {
  truth: true,
  unTruth: false,
};

let textData = {
  empty: "",
  sucessLogin: "Login Suceccfully!",
  fName: "Full_Name",
  cName: "Company_Name",
  bizPhone: "Business_Phone",
  email: "Email",
  message: "Message",
  invalid: "Invalid",
  emptyText: "Empty",
};

let errorDict = {
  Full_NameEmpty: emptyNameMessage,
  Company_NameEmpty: emptyCompanyNameMessage,
  Business_PhoneEmpty: emptyBizPhoneMessage,
  EmailEmpty: emptyEmailMessage,
  EmailInvalid: invalEmailMessage,
  MessageEmpty: emptyMessage,
  // userNameInvalid: invalUnameMessage,
  // passwordInvalid: invalPasswdMessage,
};

let dataHolder = [];
let validateResults = [];
let submitStatus = condition.unTruth;
let capchaStatus=condition.unTruth;
// // Logic
// /*
// When press submit buttton : handleSubmit will run first.
// */

function getFormData() {
  for (let i = 0; i < submitFields.length; i++) {
    let item = {
      fieldName: submitFields[i].name,
      value: submitFields[i].value,
    };
    dataHolder.push(item);
  }
  let messageVal = messageArea.value;
  let item = { fieldName: textData.message, value: messageVal };
  dataHolder.push(item);
}

function validateEmail(mail) {
  let pattern =
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
  return pattern.test(mail);
}

function validate(fieldName) {
  let item = dataHolder.filter((ele) => ele.fieldName == fieldName)[0];
  let itemName = item.fieldName;
  let itemVal = item.value;

  switch (itemName) {
    case textData.email:
      if (!validateEmail(itemVal)) {
        let data = itemName + textData.invalid;
        validateResults.push(data);
      }
      break;
    default:
  }
}

function validateEmpty(data) {
  let emptyLog = [];
  for (let i = 0; i < data.length; i++) {
    let fieldVal = data[i].value;
    let fieldName = data[i].fieldName;
    if (fieldVal) {
      let item1 = { field: fieldName, mode: condition.truth };
      emptyLog.push(item1);
    } else {
      let item2 = { field: fieldName, mode: condition.unTruth };
      emptyLog.push(item2);
    }
  }
  return emptyLog;
}

function displayErrorsMessage() {
  resetErrorsMessage();
  for (let i = 0; i < validateResults.length; i++) {
    let item = validateResults[i];
    console.log(item);
    errorDict[item].style.display = config.displayblock;
  }
}

function resetErrorsMessage() {
  let arr=[emptyNameMessage,emptyCompanyNameMessage,emptyBizPhoneMessage,emptyEmailMessage,emptyMessage,invalEmailMessage];
  for (let i = 0; i < arr.length; i++) {
     arr[i].style.display = config.displaynone;
  }
}

function handleSubmit(e) {
  dataHolder = [];
  validateResults = [];
  e.preventDefault();
  getFormData(e);
  let emptyResult = validateEmpty(dataHolder);

  for (let i = 0; i < emptyResult.length; i++) {
    let emptyItem = emptyResult[i].mode;
    let itemName = emptyResult[i].field;
    if (!emptyItem) {
      let data = itemName + textData.emptyText;
      validateResults.push(data);
    }
    if (emptyItem) {
      validate(itemName);
    }
  }

  displayErrorsMessage();
  if (validateResults.length == 0) {
    submitStatus = condition.truth;
  }

  if (submitStatus && capchaStatus) {
    submitForm.style.display = config.displaynone;
    submitForm.submit();
    submitForm.reset();
  }
}



function init() {

  submitButton.addEventListener(inputTypes.click, handleSubmit);
  resetErrorsMessage();
}

init();
