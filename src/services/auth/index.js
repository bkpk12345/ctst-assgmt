// /use-cases/orders/index.js

const signup = require("./signup.service");
const login = require("./login.service");

// Export a service containing all Use Cases ...

module.exports = Object.freeze({
  signup,
  login,
});
