const { errBuilder } = require("../helpers");
const checkError = (err, req, res, next) => {
  const final_error = errBuilder(err);
  console.log("final_error");
  console.log(final_error);
  return res.status(final_error.statusCode).send(final_error);
};

module.exports = { checkError };
