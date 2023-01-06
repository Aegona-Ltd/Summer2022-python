// Selectors
let table = document.querySelector("#contactList");

function createTable(tableData) {
  console.log(tableData);
  let tableBody = document.createElement("tbody");
  tableData.forEach(function (rowData) {
    let row = document.createElement("tr");

    for (let property in rowData) {
      let cell = document.createElement("td");

      cell.appendChild(document.createTextNode(rowData[property]));

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
}

// createTable([
//   {
//     id: "1",
//     fullName: "Yo",
//     companyName: "n",
//     businessPhone: "",
//     email: "",
//     phone: "",
//   },
//   {
//     id: "1",
//     fullName: "Yo",
//     companyName: "n",
//     businessPhone: "",
//     email: "",
//     phone: "",
//   },
// ]);

async function getData(_url = "",params, data = {}) {
  // Default options are marked with *
//   var url = new URL('https://sl.se')

// var params = {lat:35.696233, long:139.570431} // or:
// var params = [['lat', '35.696233'], ['long', '139.570431']]
let url= new URL(_url)
url.search = new URLSearchParams(params).toString();

fetch(url)
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

getData("http://localhost:8000/contacts/getContacts/", { page: 1 }).then((data) => {
  if(data){
    // console.log(data); // JSON data parsed by `data.json()` call
    createTable(data)
  }

});



// function getContactsData(){

// }
