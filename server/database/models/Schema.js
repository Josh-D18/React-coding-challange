const mongoose = require("mongoose");
const mongodb = require("../connection/connection");

const PhotoSchema = new mongoose.Schema({
  photoId: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  likes: {
    type: Number,
  },
  views: {
    type: Number,
  },
  portfolioUrl: {
    type: String,
  },
  image: {
    type: String,
  },
  imageSmall: {
    type: String,
  },
});

const PhotoModel = mongoose.model("Photo", PhotoSchema);

module.exports = { PhotoModel };
