var express = require("express");
var router = express.Router();
const { PhotoModel } = require("../database/models/Schema");

// Get Request That Returns All Of The Images
router.get("/", async function (req, res, next) {
  let photos = await PhotoModel.find();

  try {
    res.json(photos);
  } catch (err) {
    res.status(400).send({ err });
    next(err);
  }
});

// Get Request That Returns Only One Picture
router.get("/:id", async function (req, res, next) {
  let photo = await PhotoModel.findOne({ _id: req.params.id });

  try {
    res.status(200).json(photo);
  } catch (err) {
    res.status(400).send({ err });
    next(err);
  }
});

module.exports = router;
