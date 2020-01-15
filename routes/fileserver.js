const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql_arps");

router.get("/", async (req, res, next) => {
  try {
    const conn = await sql.connect(sqlconfig);
    let shares = await conn.query(`select * from fs.shares`);
    let foldercount = await conn.query(`SELECT Count(*) as count FROM fs.dirs`);
    res.send({
      shares: shares.recordset,
      foldercount: foldercount.recordset[0].count
    });
  } catch (err) {
    res.status(500).send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
});

router.get("/shares/:servername", async (req, res, next) => {
  if (!req.params.servername) res.status(500)
  const servername = "\\\\" + req.params.servername + "%"

  try {
    const conn = await sql.connect(sqlconfig);
    let result = await conn.query(`SELECT * FROM fs.shares WHERE _unc_path_name LIKE '${servername}'`);
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
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

router.get("/sumsize", async (req, res, next) => {
  try {
    const conn = await sql.connect(sqlconfig);
    let result = await conn.query(`SELECT sum(_size) as sum FROM fs.shares`);
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
});

module.exports = router;