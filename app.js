const express = require("express");
const notFound = require("./middleware/not-found");
const handleError = require("./middleware/error-handler");
const routes = require("./routes/main");
const app = express();
require("dotenv").config();
const router = require("./routes/main");

const PORT_NUM = process.env.PORT || 3000;

//middlewares
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1", routes);

//not found always last~!!
app.use(notFound);
app.use(handleError);

const start = async () => {
  try {
    app.listen(PORT_NUM, () => {
      console.log("listeningg....");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
