$(document).ready(function () {
    validateForm();
});

function validateForm() {
  $(".ui").form({
    on: "blur",
    fields: {
      userName: {
        identifier: "userName",
        rules: [
          {
            type: "empty",
            prompt: "Please enter username.",
          },
        ],
      },
      passWord: {
        identifier: "passWord",
        rules: [
          {
            type: "empty",
            prompt: "Please enter password.",
          },
        ],
      },
    },
  });
}
