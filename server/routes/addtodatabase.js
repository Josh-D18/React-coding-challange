const axios = require("axios");
var express = require("express");
var router = express.Router();
const api = `https://api.unsplash.com/photos/`;
const { PhotoModel } = require("../database/models/Schema");

router.get("/", async function (req, res, next) {
  let photosArray = [];
  try {
    await axios
      .get(`${api}/random?client_id=${process.env.client_id}&count=10`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          photosArray.push(response.data[i]);
        }
      })
      .catch((err) => {
        res.json({ error: err });
      });
  } catch (error) {
    res.send({ error });
  }

  let photo;
  for (let i = 0; i < photosArray.length; i++) {
    photo = new PhotoModel({
      photoId: photosArray[i].id,
      username: photosArray[i].user.username,
      name: photosArray[i].user.name,
      bio: photosArray[i].user.bio,
      likes: photosArray[i].likes,
      views: photosArray[i].views,
      portfolioUrl: photosArray[i].user.portfolio_url,
      image: photosArray[i].urls.regular,
      imageSmall: photosArray[i].urls.small,
    });
  }
  try {
    await photo.save(function (err) {
      if (err) return console.error(err);
      res.status(201).send("Document inserted succussfully!");
    });
  } catch (err) {
    res.status(500).send({
      message: err.errors,
    });
  }
});

module.exports = router;
