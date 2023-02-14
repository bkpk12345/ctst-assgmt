require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const apiRoutes = express.Router();
const dbConnect = require("./db");
const { apiLimiter, authTokenCheck, rbacAclCheck, checkError } = require("./middlewares");

// Helmet
app.use(helmet());

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
app.use(cors());

//db connect
dbConnect();

// api limit
apiRoutes.use(apiLimiter);

apiRoutes.use("/auth", authRoutes);

// //Auth token verification
apiRoutes.use(authTokenCheck);

// //ACL check
apiRoutes.use(rbacAclCheck);

apiRoutes.use("/users", routes);

app.use("/api", apiRoutes);

// // Error Handler
app.use(checkError);

module.exports = app;
