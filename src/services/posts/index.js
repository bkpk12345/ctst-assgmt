// /use-cases/todos/index.js

const createPosts = require("./createPosts.service");
const deletePosts = require("./deletePosts.service");
const getAllPosts = require("./getAllPosts.service");
const getAPost = require("./getAPost.service");
const updatePosts = require("./updatePosts.service");

module.exports = Object.freeze({
  createPosts,
  deletePosts,
  getAllPosts,
  getAPost,
  updatePosts,
});
