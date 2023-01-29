require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const { apiLimiter, authTokenCheck, rbacAclCheck, checkError } = require("./middlewares");

// Helmet
app.use(helmet());

//CORS
app.use(cors());

const apiRoutes = express.Router();

const Boom = require("@hapi/boom");
const connection = require("./config/connection");
connection();

// ROUTES
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");

// api limit
apiRoutes.use(apiLimiter);

apiRoutes.use("/auth", authRoutes);

//Auth token verification
apiRoutes.use(authTokenCheck);

//ACL check
apiRoutes.use(rbacAclCheck);

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

apiRoutes.use("/users", userRoutes);

app.use("/api", apiRoutes);

// Error Handler
app.use(checkError);

const port = process.env.PORT ?? 8001;

let server = app.listen(port, () => {
  console.log("server listening to port:", port);
});
