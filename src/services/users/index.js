// /use-cases/todos/index.js

const getAllUsers = require("./getAllUsers.service");
const getAUser = require("./getAUser.service");

module.exports = Object.freeze({
  getAllUsers,
  getAUser,
});
