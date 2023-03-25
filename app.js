const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const globalRouter = require("./routers/globalRouter");
const path = require("path");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/static", express.static((__dirname, "static")));
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
app.use(helmet());
app.use(
  expressCspHeader({
    directives: {
      "script-src": [
        SELF,
        INLINE,
        "https://cdnjs.cloudflare.com",
        "https://unpkg.com",
        "https://kit.fontawesome.com",
      ],
    },
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
