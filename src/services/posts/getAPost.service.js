const { postDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getAPost = async ({ params, query }) => {
  const { postId, userId } = params;
  const { includeComments } = query;
  const post = await postDb.findOne({ _id: postId, author: userId });

  if (!isDef(post)) {
    throw new Error("post not found");
  }

  return post;
};

module.exports = getAPost;
