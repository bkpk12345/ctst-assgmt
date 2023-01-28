require("dotenv").config();
const { JTW_SECRET } = process.env;
module.exports = {
  jtwSecret: JTW_SECRET,
};
