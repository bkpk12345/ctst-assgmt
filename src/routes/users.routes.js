const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users.controllers");
const todoCtrl = require("../controllers/todos.controllers");
const postCtrl = require("../controllers/posts.controllers");
const commentCtrl = require("../controllers/comments.controllers");

router.get("/", userCtrl.getUsers);
router.get("/:userId", userCtrl.getAUser);

// TODO

router.post("/:userId/todo", todoCtrl.createTodos);
router.get("/:userId/todo/:todoId", todoCtrl.getATodo);
router.get("/:userId/todo", todoCtrl.getAllTodo);
router.patch("/:userId/todo/:todoId", todoCtrl.updateATodo);
router.delete("/:userId/todo/:todoId", todoCtrl.deleteATodo);

//POSTS ROUTES
router.post("/:userId/posts", postCtrl.createAPost);
router.get("/:userId/posts/:postId", postCtrl.getAPost);
router.get("/:userId/posts", postCtrl.getAllPosts);
router.patch("/:userId/posts/:postId", postCtrl.updateAPost);
router.delete("/:userId/posts/:postId", postCtrl.deleteAPost);

//COMMENTS ROUTES
router.post("/:userId/posts/:postId/comments", commentCtrl.createAComment);
router.get("/:userId/posts/:postId/comments", commentCtrl.getAllComments);
router.get("/:userId/posts/:postId/comments/:commentId", commentCtrl.getAComment);

module.exports = router;
