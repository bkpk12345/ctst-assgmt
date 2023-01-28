require("dotenv").config();
const express = require("express");
const config = require("./config/index");
const jwt = require("jsonwebtoken");
const app = express();
const url = require("url");
const apiRoutes = express.Router();

const { errBuilder, isDef, alterResource } = require("./helpers");
const { RBAC_POLICIES } = require("./helpers/constants");
const Boom = require("@hapi/boom");
const connection = require("./config/connection");
connection();

// ROUTES
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");

apiRoutes.use("/auth", authRoutes);

//token verification
apiRoutes.use(async (req, res, next) => {
  const method = req.method.toLowerCase();
  if (method == "options") {
    return next();
  }
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (isDef(token)) {
    try {
      // verifies secret and checks exp
      let decoded = jwt.verify(token, config.jtwSecret);
      req.decoded = decoded;
      console.log("decoded");
      console.log(decoded);
      req.decoded = decoded;

      next();
    } catch (error) {
      let resp;
      console.log("error");
      console.log(error);
      if (error.name == "JsonWebTokenError" || "TokenExpiredError") {
        resp = errBuilder(Boom.unauthorized("Not authorized"));
      } else {
        resp = errBuilder(Boom.boomify(error));
      }
      return next(resp);
    }
  } else {
    const resp = errBuilder(Boom.unauthorized("Please provide the access token"));
    return next(resp);
  }
});

//ACL check
apiRoutes.use(async (req, res, next) => {
  try {
    const { role } = req.decoded;
    const incomingPathName = url.parse(req.url).pathname;
    const method = req.method.toLowerCase();
    let splitRoutes = incomingPathName.split("/");
    let usersIndex = splitRoutes.indexOf("users");
    const userId = splitRoutes[usersIndex + 1];

    let alterName = alterResource(incomingPathName);
    const newResource = `${alterName}_${method.toLowerCase()}__${role}`;
    console.log({ alterName, newResource });
    let policies = RBAC_POLICIES;
    const allowed = policies.includes(newResource);

    if (userId == req.decoded._id || allowed) {
      next();
    } else {
      throw Boom.unauthorized("you are not allowed to use this resource");
    }
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
});

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apiRoutes.use("/users", );
apiRoutes.use("/users", userRoutes);

app.use("/api", apiRoutes);

// Error Handler
app.use((err, req, res, next) => {
  const final_error = errBuilder(err);
  console.log("final_error");
  console.log(final_error);
  return res.status(final_error.statusCode).send(final_error);
});

const port = process.env.PORT ?? 8001;

let server = app.listen(port, () => {
  // console.log("server listening to port:", port);
});

module.exports = { app, server };
