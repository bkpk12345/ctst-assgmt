const { successHandler, errBuilder, isDef, isValidObjectId } = require("../helpers");
const Boom = require("@hapi/boom");

const { mongoClient } = require("../mongoClient");

exports.createTodos = async (req, res, next) => {
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

    const todoObject = {
      title,
      description,
      user: userId,
    };

    const todos = await new mongoClient.Todo(todoObject).save();

    return successHandler(res, todos, "new todo created successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const filters = req.query;
    let userDetails = null;
    let nextCurser = filters.nextCurser;
    let limit = filters.limit;

    let query = {};

    if (!isDef(userId)) {
      throw Boom.badRequest("user id required");
    }
    userDetails = await mongoClient.User.findById(userId).lean();

    if (!isDef(userDetails)) {
      throw Boom.notFound("user not found with the id");
    }

    query = {
      user: userId,
    };
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
    console.log("todo query--", JSON.stringify(query, null, 4));

    let todos = await mongoClient.Todo.find(query).limit(limit).lean();
    nextCurser = todos?.[todos?.length - 1]?._id;

    return successHandler(res, { todos, nextCurser }, "all todos fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.getATodo = async (req, res, next) => {
  try {
    const { userId } = req.params;

    let todoId = req.params.todoId;

    let todo = await mongoClient.Todo.findOne({ _id: todoId, userId }).lean();

    if (!isDef(todo)) {
      throw Boom.badRequest("todo not found");
    }

    return successHandler(res, todo, "todo details fetched");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.updateATodo = async (req, res, next) => {
  try {
    let { todoId, userId } = req.params;
    let { title, description, completed } = req.body;
    const todo = await mongoClient.Todo.findById(todoId).lean();

    if (!isDef(todo)) {
      throw Boom.notFound("todo not found");
    }

    let updateQuery = {};

    if (isDef(title)) {
      updateQuery = { title };
    }
    if (isDef(description)) {
      updateQuery = { ...updateQuery, description };
    }

    if (isDef(completed)) {
      updateQuery = { ...updateQuery, completed };
    }

    const updatedTodo = await mongoClient.Todo.findOneAndUpdate({ _id: todoId, user: userId }, updateQuery, {
      new: true,
    });

    return successHandler(res, updatedTodo, "todo updated successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.deleteATodo = async (req, res, next) => {
  try {
    let { todoId, userId } = req.params;

    const deletedTodo = await mongoClient.Todo.findByIdAndDelete(todoId);

    if (!isDef(deletedTodo)) {
      throw Boom.notFound("todo already deleted or not found");
    }

    return successHandler(res, deletedTodo, "todo deleted successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};
