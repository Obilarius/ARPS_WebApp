const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql_arps");

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

router.get("/", async (req, res, next) => {
  try {
    const conn = await sql.connect(sqlconfig);
    let users = await conn.query(`SELECT * FROM dbo.adusers`);
    let groups = await conn.query(`SELECT * FROM dbo.adgroups`);
    let computers = await conn.query(`SELECT * FROM dbo.adcomputers`);
    res.send({
      users: users.recordset,
      groups: groups.recordset,
      computers: computers.recordset
    });
  } catch (err) {
    res.status(500).send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
});

router.get("/userandgroupssid", async (req, res, next) => {
  try {
    const conn = await sql.connect(sqlconfig);
    let result = await conn.query(`SELECT SID, DisplayName as Name, 0 as isGroup FROM dbo.adusers UNION SELECT SID, Name, 1 as isGroup FROM dbo.adgroups`);
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
});

module.exports = router;