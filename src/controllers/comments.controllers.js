const { successHandler, errBuilder, isDef, isValidObjectId } = require("../helpers");
const Boom = require("@hapi/boom");
const { getAllCommentsFn } = require("./common/comments");
const { mongoClient } = require("../mongoClient");

exports.createAComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { text, commentedBy } = req.body;

    const postDetails = await mongoClient.Post.findById(postId).lean();

    if (!isDef(postDetails)) {
      throw Boom.notFound("given post not found");
    }

    const userDetails = await mongoClient.User.findById(commentedBy).lean();

    if (!isDef(userDetails)) {
      throw Boom.notFound("user not found");
    }

    if (!isDef(text) || text == "") {
      throw Boom.badRequest("comment text required");
    }

    const commentObject = {
      text,
      commentedBy,
      post: postId,
    };

    const newComment = await new mongoClient.Comment(commentObject).save();

    return successHandler(res, newComment, "cooment created");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userDetails = await mongoClient.User.findById(userId).lean();
    const filters = req.query;
    let { limit, nextCurser } = filters;
    if (!isDef(userDetails)) {
      throw Boom.notFound("user not found");
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

    console.log("commentQuery--", JSON.stringify(commentQuery, null, 4));
    const comments = await getAllCommentsFn(commentQuery, limit, nextCurser);
    console.log({ comments });
    return successHandler(res, comments, "all comments fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getAComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await mongoClient.Comment.findById(commentId).lean();
    if (!isDef(comment)) {
      throw Boom.notFound("comment not found");
    }

    return successHandler(res, comment, "comment fetched successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};
