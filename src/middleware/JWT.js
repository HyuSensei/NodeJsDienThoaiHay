const jwt = require("jsonwebtoken");
const apiAuth = require("../api/user/apiAuth");
require("dotenv").config();

const createJWT = (payload) => {
  let token = null;
  let key = process.env.JWT_SECRET;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let decoded = null;
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};

const checkAuth = async (req, res) => {
  let cookie = req.cookies;
  let erro = req.flash("erro");
  if (cookie && cookie.token) {
    let token = cookie.token;
    let check = await apiAuth.handleAuth(token);
    if (check.detail) {
      return res.render("user/login.ejs", { erro: erro });
    }
    return res.redirect("/");
  } else {
    return res.render("user/login.ejs", { erro: erro });
  }
};

const checkRequireLogin = async (req, res, next) => {
  let cookie = req.cookies;
  let erro = req.flash("erro");
  if (cookie && cookie.token) {
    let token = cookie.token;
    let check = await apiAuth.handleAuth(token);
    if (check.detail) {
      return res.render("user/login.ejs", { erro: erro });
    }
    if (check.success == true) {
      next();
    }
  } else {
    return res.render("user/login.ejs", { erro: erro });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkAuth,
  checkRequireLogin,
};
