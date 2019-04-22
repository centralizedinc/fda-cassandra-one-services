"use strict";

var validate_email = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
var validate_email_msg = `{VALUE} is not a valid email address!`;

var validate_phone = function (phone) {
    return /^[\d-+]*$/.test(phone);
}
var validate_phone_msg = `{VALUE} is not a valid phone number!`;

var validate_password = function (password) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
}
var validate_password_msg = "Password must be at least one number, one lowercase, one uppercase and at least six characters";

function isEmpty(str) {
    return !str || str.length === 0;
}

module.exports = {
    isEmpty,
    validate_email,
    validate_email_msg,
    validate_phone,
    validate_phone_msg,
    validate_password,
    validate_password_msg
}