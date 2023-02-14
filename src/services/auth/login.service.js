const { userDb } = require("../../dataAccess");
const { isDef, getJWTToken, cryptPassword, comparePassword } = require("../../helpers");

const login = async ({ body, headers }) => {
  const { username, password } = body;

  if (!isDef(username)) {
    throw new Error("username is required");
  }

  if (!isDef(password)) {
    throw new Error("password is required");
  }

  const dbUser = await userDb.findOne({ username });
  if (!isDef(dbUser)) {
    throw new Error("user not found");
  }
  let dbPassword = dbUser.password;
  let isPasswordValid = comparePassword(password, dbPassword);

  if (!isPasswordValid) {
    throw new Error("invalid password");
  }

  let userPayload = { _id: dbUser._id, role: dbUser.role };
  let token = getJWTToken(userPayload);
  delete dbUser["password"];
  return { token, user: dbUser };
};

module.exports = login;
