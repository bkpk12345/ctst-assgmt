const { postDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");
const createPosts = async ({ body, params }) => {
  const { userId } = params;
  const { title, description } = body;

  if (!isDef(title)) {
    throw new Error("title is  required");
  }

  let user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw new Error("user not found");
  }

  const postObject = {
    title,
    description,
    author: userId,
  };

  const newPost = await postDb.insert(postObject);

  return newPost;
};

module.exports = createPosts;
