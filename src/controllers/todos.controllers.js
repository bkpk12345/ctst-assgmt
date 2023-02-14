const { todoServices } = require("../services");

module.exports = Object.freeze({
  createTodos: todoServices.createTodos,
  getAllTodos: todoServices.getAllTodos,
  getATodo: todoServices.getATodo,
  updateTodos: todoServices.updateTodos,
  deleteTodos: todoServices.deleteTodos,
});
