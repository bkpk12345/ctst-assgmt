require("dotenv").config();
const { JWT_SECRET } = process.env;
module.exports = Object.freeze({
  jtwSecret: JWT_SECRET,
});
