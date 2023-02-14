const { commentDb, userDb, postDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const createAComment = async ({ body, params }) => {
  const { postId } = params;
  const { text, commentedBy } = body;

  const postDetails = await postDb.findOne({ _id: postId });

  if (!isDef(postDetails)) {
    throw new Error("given post not found");
  }

  const userDetails = await userDb.findOne({ _id: commentedBy });

  if (!isDef(userDetails)) {
    throw new Error("user not found");
  }

  if (!isDef(text) || text == "") {
    throw new Error("comment text required");
  }

  const commentObject = {
    text,
    commentedBy,
    post: postId,
  };

  const newComment = await commentDb.insert(commentObject);

  return newComment;
};

module.exports = createAComment;
