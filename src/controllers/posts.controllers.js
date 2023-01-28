const { successHandler, errBuilder, isDef, isValidObjectId } = require("../helpers");
const Boom = require("@hapi/boom");

const { getAllCommentsFn } = require("./common/comments");

const { mongoClient } = require("../mongoClient");
exports.createAPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    if (!isDef(title)) {
      throw Boom.badRequest("title is  required");
    }

    let user = await mongoClient.User.findById(userId).lean();

    if (!isDef(user)) {
      throw Boom.badRequest("user not found");
    }

    const postObject = {
      title,
      description,
      author: userId,
    };

    const newPost = await new mongoClient.Post(postObject).save();

    return successHandler(res, newPost, "new post created successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const filters = req.query;
    let userDetails = null;
    let nextCurser = filters.nextCurser;
    let limit = filters.limit;
    let query = {};

    if (isDef(userId)) {
      userDetails = await mongoClient.User.findById(userId).lean();

      if (!isDef(userDetails)) {
        throw Boom.notFound("user not found with the id");
      }

      query = {
        author: userId,
      };
    }

    if (isDef(filters)) {
      delete filters["user"];
      delete filters["nextCurser"];
      delete filters["limit"];
      query = {
        ...query,
        ...filters,
      };
    }

    if (isDef(nextCurser) && isValidObjectId(nextCurser)) {
      query = {
        ...query,
        _id: { $gt: nextCurser },
      };
    }
    if (!isDef(limit) || parseInt(limit) > 100) {
      limit = 100;
    }

    let posts = await mongoClient.Post.find(query).limit(limit).lean();
    nextCurser = posts?.[posts?.length - 1]?._id;

    return successHandler(res, { posts, nextCurser }, "all posts fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getAPost = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const { includeComments } = req.query;
    let post = await mongoClient.Post.findOne({ _id: postId, author: userId }).lean();

    if (!isDef(post)) {
      throw Boom.badRequest("post not found");
    }

    if (isDef(includeComments) && includeComments.toLowerCase() == "true") {
      let commentQuery = { post: postId };
      const comments = await getAllCommentsFn(commentQuery);
      post.comments = comments;
    }
    return successHandler(res, post, "post details fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.updateAPost = async (req, res, next) => {
  try {
    let { postId, userId } = req.params;
    let { title, description } = req.body;
    const post = await mongoClient.Post.findById(postId).lean();

    if (!isDef(post)) {
      throw Boom.notFound("post not found");
    }

    let updateQuery = {};

    if (isDef(title)) {
      updateQuery = { title };
    }
    if (isDef(description)) {
      updateQuery = { ...updateQuery, description };
    }

    const updatedPost = await mongoClient.Post.findOneAndUpdate({ _id: postId, author: userId }, updateQuery, {
      new: true,
    });

    return successHandler(res, updatedPost, "post updated successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.deleteAPost = async (req, res, next) => {
  try {
    let { postId, userId } = req.params;

    const deletedPost = await mongoClient.Post.findByIdAndDelete(postId);

    if (!isDef(deletedPost)) {
      throw Boom.notFound("post already deleted or not found");
    }

    return successHandler(res, deletedPost, "post deleted successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};
