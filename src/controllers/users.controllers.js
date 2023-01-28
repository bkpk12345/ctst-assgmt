const { successHandler, errBuilder, isDef, isValidObjectId } = require("../helpers");
const Boom = require("@hapi/boom");

const { mongoClient } = require("../mongoClient");

exports.getUsers = async (req, res, next) => {
  try {
    const filters = req.query;
    let nextCurser = filters.nextCurser;
    let limit = filters.limit;
    let query = {};
    if (isDef(filters)) {
      delete filters["nextCurser"];
      delete filters["limit"];
      query = {
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
    let users = await mongoClient.User.find(query, "-password").limit(limit).lean();
    nextCurser = users?.[users?.length - 1]?._id;
    return successHandler(res, { users, nextCurser }, "all users fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getAUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let user = await mongoClient.User.findById(userId, "-password").lean();

    if (!isDef(user)) {
      throw Boom.notFound("User not found");
    }

    return successHandler(res, user, "all users fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};
