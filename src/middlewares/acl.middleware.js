const Boom = require("@hapi/boom");
const { isDef, errBuilder, alterResource } = require("../helpers/index");
const { RBAC_POLICIES } = require("../helpers/constants");
const url = require("url");
const rbacAclCheck = (req, res, next) => {
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
};

module.exports = { rbacAclCheck };
