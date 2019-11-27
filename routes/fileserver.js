const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql");

router.get("/shares", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query `select * from fs.shares`;
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

router.get("/children/:parentPathId", (req, res, next) => {
  const parentPathId = req.params.parentPathId;

  if (!parentPathId) res.status(500)

  const pool = new sql.ConnectionPool(sqlconfig);
  pool.connect().then(() => {
    var ps = new sql.PreparedStatement(pool);
    ps.input('id', sql.Int);
    ps.prepare('select * from fs.dirs where _parent_path_id = @id', function (err) {
      if (err) return res.status(500).send(err)

      ps.execute({
        id: req.params.parentPathId
      }, function (err, result) {
        ps.unprepare(function (err) {
          if (err) return res.status(500).send(err)
        });

        if (err) return res.status(500).send(err)
        res.send(result.recordset)
      });
    });
  })

});

router.get("/foldercount", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query `SELECT Count(*) as folderCount FROM fs.dirs`;
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
      return sql.query `SELECT sum(_size) as sum FROM fs.shares`;
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

module.exports = router;