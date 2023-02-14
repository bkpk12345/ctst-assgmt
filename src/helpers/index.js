const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const dictionary = ["", "users", "todo", "posts", "comments"];

const httpResp = (status, message, code, data) => {
  const response = {
    statusCode: code,
    error: false,
    message: message,
    data: data,
  };

  return response;
};

const isDef = (param) => {
  if (param == null || param == undefined) {
    return false;
  } else {
    return true;
  }
};

const errBuilder = (err) => {
  let finalError = err;

  if (err.isBoom) {
    if (isDef(err.data)) {
      err.output.payload.data = err.data;
    }
    err.reformat();

    console.log(err);
    finalError = err.output.payload;
    if (isDef(err.message) && finalError.statusCode == 500) {
      finalError.message = err.message;
    }
  } else {
    err.error = true;
    if (!isDef(err.message) && isDef(err.type)) {
      err.message = err.type;
    }
  }

  return finalError;
};

const errHandler = (error, res) => {
  const resp = httpResp(false, "There is some error occured", 500, error);
  return res.status(resp.code).send(resp);
};

const successHandler = (res, data, message, metadata) => {
  message = message || "Operation successful";
  let resp;
  if (isDef(metadata)) {
    resp = httpResp(false, message, 200, data);
  } else {
    resp = httpResp(false, message, 200, data);
  }

  return res.status(resp.statusCode).send(resp);
};

const cryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

const comparePassword = (plainPass, hashPass) => {
  const isSamePassword = bcrypt.compareSync(plainPass, hashPass);
  if (!isSamePassword) {
    return false;
  }
  return true;
};

const getJWTToken = (payload) => {
  let secret = config.jtwSecret;
  let token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return token;
};

const isPasswordSecure = (password) => {
  if (password.trim().includes(" ")) {
    return false;
  }
  return new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  ).test(password);
};

const alterResource = (resource) => {
  let splitResources = resource.split("/");
  console.log("splitResources");
  console.log(splitResources);
  for (let index = 0; index < splitResources.length; index++) {
    let element = splitResources[index];

    if (!dictionary.includes(element)) {
      element = ":id";
    }
    splitResources[index] = element;
  }

  console.log("splitResources");
  console.log(splitResources);
  resource = splitResources.join("/");
  return resource;
};

const isValidObjectId = (id) => {
  id = `${id}`;
  return mongoose.isValidObjectId(id);
};

module.exports = {
  httpResp,
  isDef,
  errBuilder,
  errHandler,
  successHandler,
  cryptPassword,
  comparePassword,
  getJWTToken,
  isPasswordSecure,
  alterResource,
  isValidObjectId,
};
