const axios = require("axios");
var express = require("express");
var router = express.Router();
const api = `https://api.unsplash.com/photos/`;

router.get("/", async function (req, res, next) {
  try {
    await axios
      .get(`${api}?client_id=${process.env.client_id}`)
      .then((response) => {
        res.json({ response });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
