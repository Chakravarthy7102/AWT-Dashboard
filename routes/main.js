const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/main");

//login router

router.route("/login").post(login);

//dashboard router

router.route("/dashboard").get(dashboard);

//exports

module.exports = router;
