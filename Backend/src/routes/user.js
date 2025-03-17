const route = require("express").Router();
const user = require("../controllers/user");

route.get("/getUser", user.getUser);

module.exports = route;
