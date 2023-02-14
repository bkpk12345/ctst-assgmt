const { postDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const deletePosts = async ({ params }) => {
  let { postId } = params;

  const deletedPost = await postDb.remove(postId);

  if (deletedPost.deleted == 0) {
    throw new Error("post already deleted or not found");
  }

  return deletedPost;
};

module.exports = deletePosts;
