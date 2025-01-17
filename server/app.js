require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const addtodatabaseRouter = require("./routes/addtodatabase");
const photosRouter = require("./routes/photos");
const cors = require("cors");

const app = express();
app.use(cors());
// view engine setup

app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "https://distracted-stonebraker-d5cbc6.netlify.app/",
    ],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/addtodatabase", addtodatabaseRouter);
app.use("/", photosRouter);

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
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
