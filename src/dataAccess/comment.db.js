// /data-access/user.db.js
const { Comment } = require("../models");

const findOne = async (filter, options = {}) => {
  const { populate, sort } = options;
  const query = Comment.findOne(filter);
  if (sort) query.sort(sort);
  (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const insert = async (commentInfo) => {
  return await Comment.create(commentInfo);
};
const update = async (filter, commentInfo) => {
  return await Comment.findOneAndUpdate(filter, commentInfo, { new: true });
};
const remove = async (_id) => {
  const res = await await Comment.deleteOne({ _id });
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
const find = async (filter, options = {}) => {
  const { populate } = options;
  const query = Comment.find(filter);
  if (populate) (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const aggregate = async (pipeline = []) => {
  return await Comment.aggregate(pipeline);
};
const paginate = async (query, options) => {
  const { sort, populate, page, limit } = options;
  return await Comment.find(query).limit(limit).sort(sort).populate(populate);
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
