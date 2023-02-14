const jwt = require("jsonwebtoken");
const config = require("../config");
const Boom = require("@hapi/boom");
const { isDef, errBuilder } = require("../helpers/index");

const authTokenCheck = async (req, res, next) => {
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
    console.log("hereeeeee");
    const resp = errBuilder(Boom.unauthorized("Please provide the access token"));
    return next(resp);
  }
};

module.exports = { authTokenCheck };
