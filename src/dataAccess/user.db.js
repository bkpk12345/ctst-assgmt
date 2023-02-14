// /data-access/user.db.js
const { User } = require("../models");

const findOne = async (filter, options = {}) => {
  const { populate, sort } = options;
  const query = User.findOne(filter);
  if (sort) query.sort(sort);
  (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const insert = async (userInfo) => {
  return await User.create(userInfo);
};
const update = async (filter, userInfo) => {
  return await User.findOneAndUpdate(filter, userInfo, { new: true });
};
const remove = async (_id) => {
  const res = await await User.deleteOne({ _id });
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
const find = async (filter, options = {}) => {
  const { populate } = options;
  const query = User.find(filter);
  if (populate) (populate || []).forEach((p) => query.populate(p));
  return query.lean().exec();
};
const aggregate = async (pipeline = []) => {
  return await User.aggregate(pipeline);
};
const paginate = async (query, options) => {
  const { sort, populate, page, limit } = options;
  return await User.find(query).limit(limit).sort(sort).populate(populate);
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
