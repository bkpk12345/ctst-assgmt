const { commentDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const getAllComments = async ({ params }) => {
  const { commentId } = params;

  const comment = await commentDb.findOne({ _id: commentId });
  if (!isDef(comment)) {
    throw new Error("comment not found");
  }

  return comment;
};

module.exports = getAllComments;
