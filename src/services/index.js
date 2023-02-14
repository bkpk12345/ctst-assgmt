const postServices = require("./posts");
const todoServices = require("./todos");
const authServices = require("./auth");
const userServices = require("./users");
const commentServices = require("./comments");

module.exports = Object.freeze({
  authServices,
  postServices,
  todoServices,
  commentServices,
  userServices,
});
