const { todoDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getAllTodos = async ({ params, query }) => {
  const { userId } = params;
  const filters = query;
  let userDetails = null;
  let nextCurser = filters.nextCurser;
  let limit = filters.limit;
  let dbQuery = {};

  if (isDef(userId)) {
    userDetails = await userDb.findOne({ _id: userId });

    if (!isDef(userDetails)) {
      throw new Error("user not found with the id");
    }

    dbQuery = {
      author: userId,
    };
  }

  if (isDef(filters)) {
    delete filters["user"];
    delete filters["nextCurser"];
    delete filters["limit"];
    dbQuery = {
      ...dbQuery,
      ...filters,
    };
  }

  if (isDef(nextCurser) && isValidObjectId(nextCurser)) {
    dbQuery = {
      ...dbQuery,
      _id: { $gt: nextCurser },
    };
  }
  if (!isDef(limit) || parseInt(limit) > 100) {
    limit = 100;
  }

  let options = {
    limit,
    sort: { _id: 1 },
  };

  let todos = await todoDb.paginate(dbQuery, options);
  nextCurser = todos?.[todos?.length - 1]?._id;

  return { posts: todos, nextCurser };
};

module.exports = getAllTodos;
