const { todoDb } = require("../../dataAccess");

const deleteAToo = async ({ params }) => {
  let { todoId } = params;

  const deletedtodo = await todoDb.remove(todoId);

  if (deletedtodo?.deleted == 0) {
    throw new Error("todo already deleted or not found");
  }

  return deletedtodo;
};

module.exports = deleteAToo;
