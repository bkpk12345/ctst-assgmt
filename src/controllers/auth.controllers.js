const { authServices } = require("../services");

module.exports = Object.freeze({
  signup: authServices.signup,
  login: authServices.login,
});
