const { userDb } = require("../../dataAccess");
const { isDef, cryptPassword, isPasswordSecure } = require("../../helpers");
const { USER_ROLES } = require("../../helpers/constants");
const signup = async ({ body, headers }) => {
  const { firstName, lastName, username, password, newPassword, role, profile } = body;

  if (!isDef(firstName)) {
    throw new Error("first name is required");
  }

  if (!isDef(lastName)) {
    throw new Error("last name is required");
  }

  if (!isDef(username)) {
    throw new Error("username is required");
  } else if (username.trim().includes(" ")) {
    throw new Error("no space is allowd in username");
  }

  if (!isDef(password)) {
    throw new Error("password is required");
  }

  if (!isDef(newPassword)) {
    throw new Error("newPassword is required");
  }

  if (!isPasswordSecure(password)) {
    throw new Error("more secure password required");
  }

  if (!isDef(role)) {
    throw new Error("role is required");
  } else if (!USER_ROLES.includes(role)) {
    throw new Error("valid role is required");
  }

  if (password != newPassword) {
    throw new Error("password and reentered password should match");
  }

  //check user already exists
  let dbUser = await userDb.findOne({
    username: username,
  });

  if (isDef(dbUser)) {
    throw new Error("user already exists with this username");
  }

  let encryptedPassword = await cryptPassword(password);
  const userObject = {
    firstName,
    lastName,
    username,
    password: encryptedPassword,
    role,
    profile: profile ?? "",
  };

  const savedUser = await userDb.insert(userObject);

  return savedUser;
};

module.exports = signup;
