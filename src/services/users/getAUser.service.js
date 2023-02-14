const { userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getAUser = async ({ params, query }) => {
  const { userId } = params;
  const { includeComments } = query;
  const user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw new Error("post not found");
  }

  return user;
};

module.exports = getAUser;
