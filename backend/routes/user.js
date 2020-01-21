const express = require("express");
const router = express.Router();
const os = require('os');

router.get("/", (req, res, next) => {
  res.send(os.userInfo());
});

module.exports = router;