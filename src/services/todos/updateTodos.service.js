const { todoDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const updateTodos = async ({ body, params }) => {
  let { todoId } = params;
  let { title, description, completed } = body;
  const post = await todoDb.findOne({ _id: todoId });

  if (!isDef(post)) {
    throw new Error("todo not found");
  }

  let updateTodo = {};

  if (isDef(title)) {
    updateTodo = { title };
  }
  if (isDef(description)) {
    updateTodo = { ...updateTodo, description };
  }
  if (isDef(completed)) {
    updateTodo = { ...updateTodo, completed };
  }

  let updatedData = await todoDb.update({ _id: todoId }, updateTodo);

  return updatedData;
};

module.exports = updateTodos;
