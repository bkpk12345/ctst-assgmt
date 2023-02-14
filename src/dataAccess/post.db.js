// /data-access/post.db.js
const { Post } = require("../models");
const findOne = async (filter, options = {}) => {
  const { populate, sort } = options;
  const query = Post.findOne(filter);
  if (sort) query.sort(sort);
  (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const insert = async (postInfo) => {
  return await Post.create(postInfo);
};
const update = async (filter, postInfo) => {
  return await Post.findOneAndUpdate(filter, postInfo, { new: true });
};
const remove = async (_id) => {
  const res = await await Post.deleteOne({ _id });
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
const find = async (filter, options = {}) => {
  const { populate } = options;
  const query = Post.find(filter);
  if (populate) (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const aggregate = async (pipeline = []) => {
  return await Post.aggregate(pipeline);
};
const paginate = async (query, options) => {
  const { sort, populate, limit } = options;

  return await Post.find(query).limit(limit).sort(sort).populate(populate);
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
