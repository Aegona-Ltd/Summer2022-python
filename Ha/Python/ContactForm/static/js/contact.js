$(document).on('click', '#btn2', function () {
    var response = grecaptcha.getResponse();
    if (response == 0) {
        alert("Please check reCaptcha failed");
        return false;
    }
});