const express = require("express");

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => {
  res.render("home");
});
globalRouter.get("/test", (req, res) => {
  res.send({data:"test success"});
});

module.exports = globalRouter;
