// /routes/users.routes.js

const express = require("express");

const userCtrl = require("../controllers/users.controllers");
const postCtrl = require("../controllers/posts.controllers");
const todoCtrl = require("../controllers/todos.controllers");
const commentCtrl = require("../controllers/comments.controllers");
const makeExpressCallback = require("./expressCallback");
const router = express.Router();

router.route("/").get(makeExpressCallback(userCtrl.getAllUsers));
router.route("/:userId").get(makeExpressCallback(userCtrl.getAUser));

// POSTS ROUTES
router.route("/:userId/posts").post(makeExpressCallback(postCtrl.createPosts));
router.route("/:userId/posts").get(makeExpressCallback(postCtrl.getAllPosts));
router.route("/:userId/posts/:postId").get(makeExpressCallback(postCtrl.getAPost));
router.route("/:userId/posts/:postId").patch(makeExpressCallback(postCtrl.updatePosts));
router.route("/:userId/posts/:postId").delete(makeExpressCallback(postCtrl.deletePosts));

// TODO ROUTES
router.route("/:userId/todos").post(makeExpressCallback(todoCtrl.createTodos));
router.route("/:userId/todos").get(makeExpressCallback(todoCtrl.getAllTodos));
router.route("/:userId/todos/:todoId").get(makeExpressCallback(todoCtrl.getATodo));
router.route("/:userId/todos/:todoId").patch(makeExpressCallback(todoCtrl.updateTodos));
router.route("/:userId/todos/:todoId").delete(makeExpressCallback(todoCtrl.deleteTodos));

// COMMENTS ROUTES
router.route("/:userId/posts/:postId/comments").post(makeExpressCallback(commentCtrl.createAComment));
router.route("/:userId/posts/:postId/comments").get(makeExpressCallback(commentCtrl.getAllComment));
router.route("/:userId/posts/:postId/comments/:commentId").get(makeExpressCallback(commentCtrl.getAComment));

module.exports = router;
