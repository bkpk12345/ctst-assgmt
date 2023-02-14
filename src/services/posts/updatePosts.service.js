const { postDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const updatePosts = async ({ body, params }) => {
  let { postId } = params;
  let { title, description } = body;
  const post = await postDb.findOne({ _id: postId });

  if (!isDef(post)) {
    throw new Error("post not found");
  }

  let updatePost = {};

  if (isDef(title)) {
    updatePost = { title };
  }
  if (isDef(description)) {
    updatePost = { ...updatePost, description };
  }

  let updatedData = await postDb.update({ _id: postId }, updatePost);

  return updatedData;
};

module.exports = updatePosts;
