const { successHandler, errBuilder } = require("../helpers");
const Boom = require("@hapi/boom");
module.exports = (controller) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    user: req.user,
    logger: req.logger,
    source: {
      ip: req.ip,
      browser: req.get("User-Agent"),
    },
    headers: {
      "Content-Type": req.get("Content-Type"),
      Referer: req.get("referer"),
      "User-Agent": req.get("User-Agent"),
      "x-access-token": req.get("x-access-token"),
    },
  };

  controller(httpRequest)
    .then((httpResponse) => {
      res.set("Content-Type", "application/json");
      res.type("json");
      successHandler(res, httpResponse);
    })
    .catch((error) => {
      const resp = errBuilder(Boom.boomify(error));
      return next(resp);
    });
};
