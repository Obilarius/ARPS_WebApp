const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql_sharepoint");

router.get("/getPaths", async (req, res, next) => {
  // sql
  //   .connect(sqlconfig)
  //   .then((conn) => {
  //     // Query
  //     return conn.query(`SELECT name FROM master.dbo.sysdatabases WHERE name LIKE 'SharePoint_Content%'`);
  //   })
  //   .then(result => {
  //     const rs = result.recordset;
  //     const retArray = [];

  //     rs.forEach(db => {
  //       retArray.push(db.name);
  //     });

  //     if (retArray.length === 0) {
  //       res.status(500);
  //       return;
  //     }

  //     let query = `SELECT FullUrl, Title, Id, ParentWebId FROM ${retArray[0]}.dbo.Webs`;

  //     for (let i = 1; i < retArray.length; i++) {
  //       const element = retArray[i];
  //       query += ` UNION ALL SELECT FullUrl, Title, Id, ParentWebId FROM ${element}.dbo.Webs`;
  //     }
  //     query += ` ORDER BY FullUrl`;

  //     // executeQuery(res, query);
  //     console.log(query);
  //   })
  //   .catch(err => {
  //     res.status(500).send(err);
  //   });

  try {
    const conn = await sql.connect(sqlconfig);
    let allContentDBs = await conn.query(`SELECT name FROM master.dbo.sysdatabases WHERE name LIKE 'SharePoint_Content%'`);

    const rs = allContentDBs.recordset;
    const retArray = [];

    rs.forEach(db => {
      retArray.push(db.name);
    });

    if (retArray.length === 0) {
      res.status(500);
      return;
    }

    let query = `SELECT FullUrl, Title, Id, ParentWebId, '${retArray[0]}' as ContentDB FROM ${retArray[0]}.dbo.Webs`;

    for (let i = 1; i < retArray.length; i++) {
      const element = retArray[i];
      query += ` UNION ALL SELECT FullUrl, Title, Id, ParentWebId, '${element}' as ContentDB FROM ${element}.dbo.Webs`;
    }
    query += ` ORDER BY FullUrl`;

    let result = await conn.query(query);
    res.send(result.recordset);
  } catch (err) {
    res.send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
});


//Function to connect to database and execute query
var executeQuery = (res, query) => {
  sql.connect(sqlconfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.send(err);
    } else {
      // create Request object
      var request = new sql.Request();
      // query to the database
      request.query(query, function (err, result) {
        if (err) {
          console.log("Error while querying database :- " + err);
          res.send(err);
        } else {
          res.send(result.recordset);
        }
      });
    }
  });
}

module.exports = router;