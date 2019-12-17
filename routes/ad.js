const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql");

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

router.get("/users", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query `SELECT * FROM dbo.adusers`;
    })
    .then(result => {
      res.send(result.recordset);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

router.get("/groups", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query `SELECT * FROM dbo.adgroups`;
    })
    .then(result => {
      res.send(result.recordset);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

router.get("/computers", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query `SELECT * FROM dbo.adcomputers`;
    })
    .then(result => {
      res.send(result.recordset);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});



router.get("/userandgroupssid", (req, res, next) => {
  sql
    .connect(sqlconfig)
    .then(() => {
      // Query
      return sql.query `SELECT SID, DisplayName as Name, 0 as isGroup FROM dbo.adusers UNION SELECT SID, Name, 1 as isGroup FROM dbo.adgroups`;
    })
    .then(result => {
      res.send(result.recordset);
    })
    .catch(err => {
      res.status(500).send("ERROR");
    });
});

module.exports = router;