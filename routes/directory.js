const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql");

router.get("/ace/:pathId", (req, res, next) => {
  const pathId = req.params.pathId;

  if (!pathId) res.status(500)

  const pool = new sql.ConnectionPool(sqlconfig);
  pool.connect().then(() => {
    var ps = new sql.PreparedStatement(pool);
    ps.input('id', sql.Int);
    ps.prepare(`
      SELECT ug._is_group, ug._identity_name, ug._distinguished_name, aces._ace_id, aces._sid, aces._rights, aces._type, aces._fsr, aces._is_inherited, aces._inheritance_flags, aces._propagation_flags
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
      WHERE dirs._path_id = @id`, function (err) {
      if (err) return res.status(500).send(err)

      ps.execute({
        id: req.params.pathId
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