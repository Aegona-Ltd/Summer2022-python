// Selectors
let loginFields = document.querySelectorAll("#loginForm input");
let loginButton = document.querySelector("#loginbtn");
let loginForm = document.querySelector("#loginForm");
let emptyUnameMessage = document.querySelector(".empty-username-feedback");
let emptyPasswdMessage = document.querySelector(".empty-password-feedback");
let invalUnameMessage = document.querySelector(".invalid-username-feedback");
let invalPasswdMessage = document.querySelector(".invalid-password-feedback");
let maintittle = document.querySelector(".maintitle");

// Operational Valiables
let config = {
  uname: "uname",
  password: "pwd",
  displaynone: "none",
  displayblock: "block",
};

let inputTypes = {
  input: "input",
  click: "click",
};

let condition = {
  truth: true,
  unTruth: false,
};

let textData = {
  empty: "",
  sucessLogin: "Login Suceccfully!",
  userName: "userName",
  password: "password",
  invalid: "Invalid",
  emptyText: "Empty",
};

let errorDict = {
  userNameEmpty: emptyUnameMessage,
  passwordEmpty: emptyPasswdMessage,
  userNameInvalid: invalUnameMessage,
  passwordInvalid: invalPasswdMessage,
};

let dataHolder = [];
let validateResults = [];
let loginStatus = condition.unTruth;
// Logic
/*
When press login buttton : handleLogin will run first. 
*/

function getLoginData() {
  let userNameVal = loginFields[0].value;

  // let userName = e.target.value;
  let item1 = { fieldName: textData.userName, value: userNameVal };
  dataHolder.push(item1);

  let passwordVal = loginFields[1].value;
  // dataHolder.password = password;
  let item2 = { fieldName: textData.password, value: passwordVal };
  dataHolder.push(item2);
}

function validateEmail(mail) {
  let pattern =
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
  return pattern.test(mail);
}

function validatePassword(passwd) {
  // 8 letter password, with at least a symbol, upper and lower case letters and a number
  let pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return pattern.test(passwd);
}

function validate(fieldName) {
  let item = dataHolder.filter((ele) => ele.fieldName == fieldName)[0];
  let itemName = item.fieldName;
  let itemVal = item.value;

  switch (itemName) {
    case textData.userName:
      if (!validateEmail(itemVal)) {
        let data = itemName + textData.invalid;
        validateResults.push(data);
      }
      break;
    case textData.password:
      if (!validatePassword(itemVal)) {
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
    errorDict[item].style.display = config.displayblock;
  }
}

function resetErrorsMessage() {
  emptyUnameMessage.style.display = config.displaynone;
  emptyPasswdMessage.style.display = config.displaynone;
  invalUnameMessage.style.display = config.displaynone;
  invalPasswdMessage.style.display = config.displaynone;
}

function handleLogin(e) {
  dataHolder = [];
  validateResults = [];
  e.preventDefault();
  getLoginData(e);
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
    loginStatus = condition.truth;
  }

  if (loginStatus) {
    loginForm.style.display = config.displaynone;
    maintittle.innerHTML = textData.sucessLogin;
  }
}

function init() {
  loginButton.addEventListener(inputTypes.click, handleLogin);
  resetErrorsMessage();
}

init();
