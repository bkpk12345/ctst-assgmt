const { userServices } = require("../services");

module.exports = Object.freeze({
  getAllUsers: userServices.getAllUsers,
  getAUser: userServices.getAUser,
});
