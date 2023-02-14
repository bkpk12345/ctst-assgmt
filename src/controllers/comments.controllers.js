const { commentServices } = require("../services");

module.exports = Object.freeze({
  createAComment: commentServices.createAComment,
  getAComment: commentServices.getAComment,
  getAllComment: commentServices.getAllComment,
});
