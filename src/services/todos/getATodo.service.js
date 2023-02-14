const { todoDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getATodo = async ({ params, query }) => {
  const { todoId, userId } = params;
  const { includeComments } = query;
  const post = await todoDb.findOne({ _id: todoId, author: userId });

  if (!isDef(post)) {
    throw new Error("todo not found");
  }

  return post;
};

module.exports = getATodo;
