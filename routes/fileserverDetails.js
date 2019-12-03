const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql");

router.get("/owner/:sid", (req, res, next) => {
  const sid = req.params.sid;

  if (!sid) res.status(500)

  const pool = new sql.ConnectionPool(sqlconfig);
  pool.connect().then(() => {
    var ps = new sql.PreparedStatement(pool);
    ps.input('id', sql.VarChar);
    ps.prepare(
      `SELECT * FROM (
        SELECT SID, DisplayName name, UserPrincipalName secName, 0 as isGroup FROM dbo.adusers
        UNION ALL
        SELECT SID, Name name, SamAccountName secName, 1 as isGroup FROM dbo.adgroups) 
          as UsersAndGroups
      WHERE SID = @id`,
      function (err) {
        if (err) return res.status(500).send(err)

        ps.execute({
          id: req.params.sid
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

router.get("/fsr/:pathid", (req, res, next) => {
  const pathid = req.params.pathid;


  if (!pathid) res.status(500)

  const pool = new sql.ConnectionPool(sqlconfig);
  pool.connect().then(() => {
    var ps = new sql.PreparedStatement(pool);
    ps.input('id', sql.Int);
    ps.prepare(
      `SELECT ug._is_group, ug._identity_name, ug._distinguished_name, aces._ace_id, aces._sid, aces._rights, aces._type, aces._fsr, aces._is_inherited, aces._inheritance_flags, aces._propagation_flags
      FROM fs.dirs dirs
      JOIN fs.acls acls ON dirs._path_id = acls._path_id
      JOIN fs.aces aces ON aces._ace_id = acls._ace_id
      JOIN(
          SELECT 0 as _is_group, SID _sid, DisplayName _identity_name, DistinguishedName _distinguished_name
          FROM dbo.adusers
          UNION ALL
          SELECT 1, SID, Name, DistinguishedName
          FROM dbo.adgroups) ug
      ON aces._sid = ug._sid
      WHERE dirs._path_id = @id
      ORDER BY _identity_name, _rights DESC`,
      function (err) {
        if (err) return res.status(500).send(err)

        ps.execute({
          id: req.params.pathid
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

module.exports = router;