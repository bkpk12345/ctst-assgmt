// /use-cases/comments/index.js

const createAComment = require("./createAllComment.service");
const getAComment = require("./getAComment.service");
const getAllComment = require("./getAllComment.service");

module.exports = Object.freeze({
  createAComment,
  getAComment,
  getAllComment,
});
