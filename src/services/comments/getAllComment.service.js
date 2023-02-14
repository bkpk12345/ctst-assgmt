const { commentDb, userDb, postDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const getAllComments = async ({ query, params }) => {
  const { userId } = params;
  const userDetails = await userDb.findOne({ _id: userId });
  const filters = query;
  let { limit, nextCurser } = filters;
  if (!isDef(userDetails)) {
    throw new Error("user not found");
  }
  let commentQuery = {
    commentedBy: userId,
  };

  if (isDef(filters)) {
    delete filters["commentedBy"];
    delete filters["nextCurser"];
    delete filters["limit"];

    commentQuery = {
      ...commentQuery,
      ...filters,
    };
  }

  if (!isDef(limit) || parseInt(limit) > 100) {
    limit = 100;
  }

  // const comments = await commentDb.find(commentQuery);

  if (isDef(nextCurser)) {
    query = {
      ...query,
      _id: { $gt: nextCurser },
    };
  }
  let options = { sort: { _id: 1 }, limit };
  const comments = await commentDb.paginate(query, options);

  if (!isDef(comments)) {
    comments = [];
  }
  return comments;

  return comments;
};

module.exports = getAllComments;
