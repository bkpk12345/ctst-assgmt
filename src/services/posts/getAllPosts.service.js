const { postDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getPosts = async ({ params, query }) => {
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

  if (isDef(nextCurser)) {
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

  let posts = await postDb.paginate(dbQuery, options);
  nextCurser = posts?.[posts?.length - 1]?._id;

  return { posts, nextCurser };
};

module.exports = getPosts;
