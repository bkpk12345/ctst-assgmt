const { mongoClient } = require("../../mongoClient");
const Boom = require("@hapi/boom");
const { isDef } = require("../../helpers");

const getAllCommentsFn = async (query, limit, nextCurser) => {
  try {
    if (isDef(nextCurser) && isValidObjectId(nextCurser)) {
      query = {
        ...query,
        _id: { $gt: nextCurser },
      };
    }
    const comments = await mongoClient.Comment.find(query).limit(limit).sort({ createdAt: 1 });

    if (!isDef(comments)) {
      comments = [];
    }
    return comments;
  } catch (error) {
    throw Boom.boomify(error);
  }
};

module.exports = {
  getAllCommentsFn,
};
