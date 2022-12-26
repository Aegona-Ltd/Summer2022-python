//Selectors
let loginFields = document.querySelectorAll("#loginform input");
let loginButton = document.querySelector("#login");
let invalUnameMessage = document.querySelector("#invalUname");
let invalPasswdMessage = document.querySelector("#invalPasswd");
let maintittle = document.querySelector(".maintitle");
let loginForm = document.querySelector("#loginform");

// Operatinal variables
import { config, inputTypes, textData, condition } from "./globalData.js";
let dataHolder = {
  userName: textData.empty,
  password: textData.empty,
};
let loginStatus = condition.truth;

// Logic

function getLoginData(e) {
  if (e.target.name == config.uname) {
    let userName = e.target.value;
    dataHolder.userName = userName;
  }

  if (e.target.name == config.password) {
    let password = e.target.value;
    dataHolder.password = password;
  }
}

function validate() {
  if (dataHolder.userName) {
    invalUnameMessage.style.display = config.displaynone;
  }
  if (!dataHolder.userName) {
    invalUnameMessage.style.display = config.displayblock;
    loginStatus = condition.unTruth;
  }

  if (dataHolder.password) {
    invalPasswdMessage.style.display = config.displaynone;
    loginStatus = condition.unTruth;
  }
  if (!dataHolder.password) {
    invalPasswdMessage.style.display = config.displayblock;
    loginStatus = condition.unTruth;
  }
  if (dataHolder.userName && dataHolder.password) {
    loginStatus = condition.truth;
  }
}

function handleLogin(e) {
  e.preventDefault();
  getLoginData(e);
  validate();
  if (loginStatus) {
    for (let i = 0; i < loginFields.length; i++) {
      let field = loginFields[i];

      field.value = textData.empty;
    }
    loginForm.style.display = config.displaynone;
    maintittle.innerHTML = textData.sucessLogin;
  }
  console.log(dataHolder);
}

function globalInit() {
  invalUnameMessage.style.display = config.displaynone;
  invalPasswdMessage.style.display = config.displaynone;
  // Add handler logic to input elements.
  for (let i = 0; i < loginFields.length; i++) {
    let field = loginFields[i];
    field.addEventListener(inputTypes.input, getLoginData);
  }

  // Press "login"
  loginButton.addEventListener(inputTypes.click, handleLogin);
}

globalInit();
