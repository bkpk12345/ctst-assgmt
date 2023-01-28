const { Comment } = require("./comment");
const { Post } = require("./post");
const { Todo } = require("./todo");
const { User } = require("./user");

const mongoClient = {
  Comment,
  Post,
  Todo,
  User,
};

module.exports = mongoClient;
