// /use-cases/todos/index.js

const createTodos = require("./createTodos.service");
const deleteTodos = require("./deleteTodos.service");
const getAllTodos = require("./getAllTodos.service");
const getATodo = require("./getATodo.service");
const updateTodos = require("./updateTodos.service");

module.exports = Object.freeze({
  createTodos,
  deleteTodos,
  getAllTodos,
  getATodo,
  updateTodos,
});
