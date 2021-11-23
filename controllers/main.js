const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//const variables
const JWT_SECRET = process.env.JWT_SECRET;

//login controller
const login = async (req, res) => {
  const { user, password } = req.body;
  //checking for the empty inputs

  if (!user || !password) {
    res.status(400).send("Invalid");
  }
  const id = new Date().getTime();
  //signing the jmt token
  //try to keep the payload small to ensure user experience

  const token = jwt.sign({ id, user }, JWT_SECRET, { expiresIn: "30d" });
  res.status(200).json({ msg: "User Created!!", token });
};

//dashboard controller

const dashboard = (req, res) => {
  const authHeader = req.headers.authorization;

  //checking for authHeader
  //for now header is passed as statically
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(400).json({
      msg: "error cannot find the token",
    });
  } else {
    try {
      const token = authHeader.split(" ")[1];
      const encoded = jwt.verify(token, JWT_SECRET);
      const user = encoded.user;
      console.log(encoded);
      //after encoding
      const number = Math.floor(Math.random() * 1000);
      res.status(200);
      res.json({
        msg: `hello, ${user}`,
        secret: `Your lucky number is here ${number}`,
      });
    } catch (error) {
      res.status(401).json({
        msg: `${error}`,
      });
    }
  }
};

//exports
module.exports = {
  login,
  dashboard,
};
