# Assignment

A blog post and todo list backend apis enabled with RBAC

## Things taken care during assignment

## in terms of security

1.  strong password policy
2.  RBAC/ ACL to prevent users from accessing other's contant with self creds
3.  jwt tokens to maintain the code users session
4.  encrypted passwords so others can not see/guess the pasword from the the encrypted string
5.  No password(even encrypted string) is being passed in the API response since anyone can compare password from pre existed dictionary.
6.  Proper user data validation while signinig user in to the system.
7.  non sensitive data is being added in the jwt payload, since anyone can decode the token and can easily see the jwt payload by decoding it.

## in terms of perfromance

1. Added curser based pagination instead of basic skip/limit approach. Curser based approach is much more efficient than basic skip/limit pagination.
2. users can not manipulate the page limit in any pagination.
3. Api rate Limit so user can not do many requests at once which may reduce performance

## Installation

Install Assignment packages with npm

```bash
npm install
```

Run API Server with

```bash
npm start
```

Run API test cases with

```bash
npm run test
```

## API Reference

#### API Base URL

```http
https://ctsht-blg-asg0.onrender.com/api

```

#### API JTW Headers key

##### Add this token in headers of every request

```http
x-access-token -  {jwt token}
```

## AUTH

#### Sign up user

```http
  POST /auth/signup
```

| Parameter     | Type     | Description                               |
| :------------ | :------- | :---------------------------------------- |
| `firstName`   | `string` | **Required**. first name                  |
| `lastName`    | `string` | **Required**. last name                   |
| `username`    | `string` | **Required and Unique**. unique username  |
| `password`    | `string` | **Required and secured**. strong password |
| `newPassword` | `string` | **Required**. re-enter password           |
| `role`        | `string` | **Required**. User role                   |
| `profile`     | `string` | **Optional**. pic                         |

##

#### Login user

```http
  POST /auth/login
```

| Parameter  | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `username` | `string` | **Required and Unique**. unique username  |
| `password` | `string` | **Required and secured**. strong password |

## Todo

##

#### Create Todo

```http
  POST /users/{userId}/todo
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Required**. todo title       |
| `description` | `string` | **Optional**. todo description |

#### Get all Todo List with pagination

```http
  GET /users/{userId}/todo?limit=10&nextCurser={nextCurserId}
```

##

#### Get Single Todo

```http
  GET /users/{userId}/todo/{todoId}
```

##

#### Update Single Todo details

```http
  PATCH /users/{userId}/todo/{todoId}
```

| Parameter     | Type      | Description                    |
| :------------ | :-------- | :----------------------------- |
| `title`       | `string`  | **Oprional**. todo title       |
| `description` | `string`  | **Optional**. todo description |
| `completed`   | `boolean` | **Optional**. todo description |

##

#### Delete A Single Todo

```http
  DELETE /users/{userId}/todo/{todoId}
```

##

## POSTS

#### Create Posts

```http
  POST /users/{userId}/posts
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Required**. post title       |
| `description` | `string` | **Optional**. post description |

##

#### Get all posts List with pagination

```http
  GET /users/{userId}/posts?limit=10&nextCurser={nextCurserId}
```

##

#### Get Single post details

```http
  GET /users/{userId}/posts/{postId}
```

##

#### Update Single post details

```http
  PATCH /users/{userId}/posts/{postId}
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Oprional**. post title       |
| `description` | `string` | **Optional**. post description |

##

#### Delete A Single Todo

```http
  DELETE /users/{userId}/posts/{postId}
```

##

## Post Comments

#### Create comments on a Post

```http
  POST /users/{userId}/posts/{postId}/comments
```

| Parameter     | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `text`        | `string` | **Required**. comment text |
| `commentedBy` | `string` | **Optional**. user id      |

##

#### Get all comments on a Post

```http
  GET /users/{userId}/posts/{postId}/comments?limit=10?nextCurser={nextCurserId}
```

##

#### Get a single comment on a Post

```http
  GET /users/{userId}/posts/{postId}/comments/{commentId}
```
