// /data-access/todo.db.js
const { Todo } = require("../models");
const findOne = async (filter, options = {}) => {
  const { populate, sort } = options;
  const query = Todo.findOne(filter);
  if (sort) query.sort(sort);
  (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const insert = async (todoInfo) => {
  return Todo.create(todoInfo);
};
const update = async (filter, todoInfo) => {
  return Todo.findOneAndUpdate(filter, todoInfo, { new: true });
};
const remove = async (_id) => {
  const res = await Todo.deleteOne({ _id });
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
const find = async (filter, options = {}) => {
  const { populate } = options;
  const query = Todo.find(filter);
  if (populate) (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const aggregate = async (pipeline = []) => {
  return Todo.aggregate(pipeline);
};
const paginate = async (query, options) => {
  const { sort, populate, page, limit } = options;
  return await Todo.find(query).limit(limit).sort(sort).populate(populate);
};
module.exports = Object.freeze({
  findOne,
  insert,
  update,
  remove,
  find,
  aggregate,
  paginate,
});
