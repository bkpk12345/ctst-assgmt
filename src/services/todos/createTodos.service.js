const { todoDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const createTodos = async ({ body, params }) => {
  const { userId } = params;
  const { title, description } = body;

  if (!isDef(title)) {
    throw new Error("title is  required");
  }

  let user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw new Error("user not found");
  }

  const todoObject = {
    title,
    description,
    author: userId,
  };

  const newtodo = await todoDb.insert(todoObject);

  return newtodo;
};

module.exports = createTodos;
