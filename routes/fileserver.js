const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql");

router.get("/shares", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query`select * from fs.shares`;
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

router.get("/foldercount", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query`SELECT Count(*) as folderCount FROM fs.dirs`;
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

router.get("/sumsize", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query`SELECT sum(_size) as sum FROM fs.shares`;
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

module.exports = router;
