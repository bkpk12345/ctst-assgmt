const { userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getAllUsers = async ({ params, query }) => {
  const filters = query;
  let userDetails = null;
  let nextCurser = filters.nextCurser;
  let limit = filters.limit;
  let dbQuery = {};

  if (isDef(filters)) {
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

  let users = await userDb.paginate(dbQuery, options);
  nextCurser = users?.[users?.length - 1]?._id;

  return { users: users, nextCurser };
};

module.exports = getAllUsers;
