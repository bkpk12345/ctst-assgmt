const {
  successHandler,
  errBuilder,
  isDef,
  cryptPassword,
  comparePassword,
  getJWTToken,
  isPasswordSecure,
} = require("../helpers");
const Boom = require("@hapi/boom");

const { mongoClient } = require("../mongoClient");

const { USER_ROLES } = require("../helpers/constants");

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, newPassword, role, profile } = req.body;

    if (!isDef(firstName)) {
      throw Boom.badRequest("first name is required");
    }

    if (!isDef(lastName)) {
      throw Boom.badRequest("last name is required");
    }

    if (!isDef(username)) {
      throw Boom.badRequest("username is required");
    } else if (username.trim().includes(" ")) {
      throw Boom.badRequest("no space is allowd in username");
    }

    if (!isDef(password)) {
      throw Boom.badRequest("password is required");
    }

    if (!isDef(newPassword)) {
      throw Boom.badRequest("newPassword is required");
    }

    if (!isPasswordSecure(password)) {
      throw Boom.badRequest("more secure password required");
    }

    if (!isDef(role)) {
      throw Boom.badRequest("role is required");
    } else if (!USER_ROLES.includes(role)) {
      throw Boom.badRequest("valid role is required");
    }

    if (password != newPassword) {
      throw Boom.badRequest("password and reentered password should match");
    }

    //check user already exists
    let dbUser = await mongoClient.User.findOne({
      username: username,
    });

    if (isDef(dbUser)) {
      throw Boom.badRequest("user already exists with this username");
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

    const savedUser = await new mongoClient.User(userObject).save();

    return successHandler(res, savedUser, "new user added");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!isDef(username)) {
      throw Boom.badRequest("username is required");
    }

    if (!isDef(password)) {
      throw Boom.badRequest("password is required");
    }

    const dbUser = await mongoClient.User.findOne({ username }).lean();
    if (!isDef(dbUser)) {
      throw Boom.notFound("user not found");
    }
    let dbPassword = dbUser.password;
    let isPasswordValid = comparePassword(password, dbPassword);

    if (!isPasswordValid) {
      throw Boom.unauthorized("invalid password");
    }

    let userPayload = { _id: dbUser._id, role: dbUser.role };
    let token = getJWTToken(userPayload);
    delete dbUser["password"];
    return successHandler(res, { token, user: dbUser }, "user loggedin successfully");
  } catch (error) {
    const resp = errBuilder(Boom.boomify(error));
    return next(resp);
  }
};
