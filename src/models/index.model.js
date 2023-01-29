const { Comment } = require("./comment.model");
const { Post } = require("./post.model");
const { Todo } = require("./todo.model");
const { User } = require("./user.model");

const mongoClient = {
  Comment,
  Post,
  Todo,
  User,
};

module.exports = mongoClient;
