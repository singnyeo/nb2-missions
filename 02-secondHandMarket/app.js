var createError = require("http-errors");
var express = require("express");
var logger = require("./utils/logger");
var path = require("path");

const cors = require('cors');
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const productCommentRouter = require("./routes/comments/productComments");
const articleCommentRouter = require("./routes/comments/articleComments");
const filesRouter = require("./routes/files");

var app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products/:productId/comments", productCommentRouter);
app.use("/articles/:articleId/comments", articleCommentRouter);
app.use("/files", filesRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send("ERROR " + err.message);
});

module.exports = app;