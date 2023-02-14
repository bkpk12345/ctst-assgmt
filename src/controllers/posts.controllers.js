const { postServices } = require("../services");

module.exports = Object.freeze({
  createPosts: postServices.createPosts,
  getAllPosts: postServices.getAllPosts,
  getAPost: postServices.getAPost,
  updatePosts: postServices.updatePosts,
  deletePosts: postServices.deletePosts,
});
