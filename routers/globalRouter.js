const express = require("express");

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => {
  console.log(req.user);
  res.render("home", { user: req.user });
});

module.exports = globalRouter;
