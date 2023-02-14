const postDb = require("./post.db");
const userDb = require("./user.db");
const todoDb = require("./todo.db");
const commentDb = require("./comment.db");

module.exports = Object.freeze({
  postDb,
  userDb,
  todoDb,
  commentDb,
});
