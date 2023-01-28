// const { app, server } = require("../server");
const { describe, expect, test, beforeAll, afterAll } = require("@jest/globals");

const Axios = require("axios");
const baseUrl = "http://localhost:8001/api";

const validSignupCreds = {
  firstName: "Balkrushna",
  lastName: "Jadhav",
  username: `bk-${Date.now()}`,
  password: "Aa1?Aa1?",
  newPassword: "Aa1?Aa1?",
  role: "user",
  profile: "",
};
//will be used to store testing user
let signedUpUser = {};
let todos = [];
let posts = [];
let comments = [];
let validToken = null;

//default route test
describe("User Signup test POST /auth/signup ", () => {
  // first test
  test("weak password test", (done) => {
    let userCreds = {
      firstName: "Balkrushna",
      lastName: "Jadhav",
      username: `bk-${Date.now()}`,
      password: "1234",
      newPassword: "1234",
      role: "user",
      profile: "",
    };

    Axios.post(`${baseUrl}/auth/signup`, userCreds)
      .then((response) => {})
      .catch((e) => {
        expect(e.response.data.statusCode).toBe(400);
        expect(e.response.data.message).toBe("more secure password required");
        done();
      });
  });

  //second test
  test("invalid field test", (done) => {
    let userCreds = {
      firstName: null,
      lastName: null,
      username: `bk-${Date.now()}`,
      password: "Aa1?Aa1?",
      newPassword: "Aa1?Aa1?",
      role: "user",
      profile: "",
    };

    Axios.post(`${baseUrl}/auth/signup`, userCreds)
      .then((response) => {})
      .catch((e) => {
        expect(e.response.data.statusCode).toBe(400);
        expect(e.response.data.message).toBe("first name is required");
        done();
      });
  });

  // //third test
  test("empty field test", (done) => {
    let userCreds = {
      firstName: "balkrushna",
      lastName: "jadhav",
      username: `bk-${Date.now()}`,
      password: "1234",
      newPassword: "1234",
      role: "user",
      profile: "",
    };

    Axios.post(`${baseUrl}/auth/signup`, userCreds)
      .then((response) => {})
      .catch((e) => {
        expect(e.response.data.statusCode).toBe(400);
        // expect(response.data.message).toBe("more secure password required");
        done();
      });
  });

  // valid test
  test("valid cred signup test", (done) => {
    Axios.post(`${baseUrl}/auth/signup`, validSignupCreds)
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("new user added");
        done();
      })
      .catch((e) => {});
  });
});

describe("User login test POST /auth/login ", () => {
  // 1
  test("invalid creds test", (done) => {
    Axios.post(`${baseUrl}/auth/login`, {
      username: "wrongUsername",
      password: "wrongpassword",
    })
      .then((response) => {})
      .catch((e) => {
        expect(e.response.data.statusCode).toBe(404);
        expect(e.response.data.message).toBe("user not found");
        done();
      });
  });

  // 2
  test("valid login test", (done) => {
    Axios.post(`${baseUrl}/auth/login`, {
      username: validSignupCreds.username,
      password: validSignupCreds.password,
    })
      .then((response) => {
        validToken = response.data.data.token;
        signedUpUser = response.data.data.user;

        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("user loggedin successfully");
        expect(response.data.data).toHaveProperty("token");
        done();
      })
      .catch((e) => {});
  });
});

describe("add todo POST /users/:id/todo", () => {
  // 1
  test("create new todo list", (done) => {
    const newTodo = {
      title: "new todo",
      description: "todo desc",
    };
    Axios.post(`${baseUrl}/users/${signedUpUser._id}/todo`, newTodo, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        const todo = response.data.data;
        todos.push(todo);

        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("new todo created successfully");

        done();
      })
      .catch((e) => {});
  });

  // 2
  test("get all todo lists", (done) => {
    const newTodo = {
      title: "new todo",
      description: "todo desc",
    };
    Axios.get(`${baseUrl}/users/${signedUpUser._id}/todo`, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("all todos fetched");

        done();
      })
      .catch((e) => {});
  });

  // 3
  test("get a todo detail", (done) => {
    const newTodo = {
      title: "new todo",
      description: "todo desc",
    };
    const todoId = todos[0]._id;
    Axios.get(`${baseUrl}/users/${signedUpUser._id}/todo/${todoId}`, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("todo details fetched");
        done();
      })
      .catch((e) => {});
  });
});

describe("add posts POST /users/:id/posts", () => {
  // 1
  test("create a new post", (done) => {
    const postsApi = `${baseUrl}/users/${signedUpUser._id}/posts`;
    const newPost = {
      title: "new post",
      description: "post desc",
    };

    Axios.post(postsApi, newPost, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        const post = response.data.data;
        posts.push(post);

        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("new post created successfully");

        done();
      })
      .catch((e) => {});
  });

  // // 2
  test("get all posts", (done) => {
    const postsApi = `${baseUrl}/users/${signedUpUser._id}/posts`;
    Axios.get(postsApi, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("all posts fetched");

        done();
      })
      .catch((e) => {});
  });

  // 3
  test("get a post detail", (done) => {
    const postsApi = `${baseUrl}/users/${signedUpUser._id}/posts`;

    const postId = posts[0]._id;
    Axios.get(`${postsApi}/${postId}`, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("post details fetched");

        done();
      })
      .catch((e) => {});
  });
});

describe("comments on posts POST /users/:id/posts/:id/comments", () => {
  // 1
  test("create a new comment ", (done) => {
    const postId = posts[0]._id;
    const commentsApi = `${baseUrl}/users/${signedUpUser._id}/posts/${postId}/comments`;
    const newComment = {
      text: "new comment",
      commentedBy: signedUpUser._id,
    };

    Axios.post(commentsApi, newComment, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        const comment = response.data.data;
        comments.push(comment);

        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("cooment created");

        done();
      })
      .catch((e) => {});
  });

  // 2
  test("get all comments", (done) => {
    const postId = posts[0]._id;
    const commentApi = `${baseUrl}/users/${signedUpUser._id}/posts/${postId}/comments`;
    Axios.get(commentApi, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("all comments fetched");
        done();
      })
      .catch((e) => {});
  });

  // 3
  test("get a comment detail", (done) => {
    const postId = posts[0]._id;
    const commentId = comments[0]._id;
    const commentApi = `${baseUrl}/users/${signedUpUser._id}/posts/${postId}/comments/${commentId}`;

    Axios.get(commentApi, {
      headers: { "x-access-token": validToken },
    })
      .then((response) => {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("comment fetched successfully");

        done();
      })
      .catch((e) => {});
  });
});
