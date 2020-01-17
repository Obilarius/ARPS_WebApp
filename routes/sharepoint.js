const express = require("express");
const router = express.Router();
const sql = require("mssql");
const sqlconfig = require("../config/mssql_sharepoint");

router.get("/getPaths", async (req, res, next) => {
  try {
    const conn = await sql.connect(sqlconfig);

    let retArray = await getAllContentDbs(conn);

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


router.get("/getRights/:webid/:db", async (req, res, next) => {
  if (!req.params.webid || !req.params.db) res.status(500)
  const webid = req.params.webid
  const db = req.params.db

  try {
    const conn = await sql.connect(sqlconfig);

    let query = `SELECT DISTINCT w.FullUrl, r.Title, r.Description, g.Title as GroupTitle, u.tp_Title as UserTitle, u.tp_DomainGroup, u.tp_SiteAdmin FROM
    (SELECT w.FullUrl, w.SiteId, w.ScopeId FROM ${db}.dbo.Webs w
    WHERE Id = '${webid}') as w
    JOIN ${db}.dbo.RoleAssignment ra ON ra.SiteId = w.SiteId AND ra.ScopeId = w.ScopeId
    JOIN ${db}.dbo.Roles r ON r.SiteId = ra.SiteId AND r.RoleId = ra.RoleId
    LEFT JOIN ${db}.dbo.Groups g ON g.SiteId = ra.SiteId AND g.ID = ra.PrincipalId
    LEFT JOIN ${db}.dbo.GroupMembership gm ON gm.SiteId = ra.SiteId AND g.ID = gm.GroupId
    LEFT JOIN ${db}.dbo.UserInfo u ON u.tp_SiteID = ra.SiteId AND (u.tp_ID = ra.PrincipalId OR gm.MemberId = u.tp_ID)
    WHERE r.Title != 'Beschränkter Zugriff'
    ORDER BY  GroupTitle, UserTitle`;

    let result = await conn.query(query);

    const groupBy = key => array =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (
          objectsByKeyValue[value] || []
        ).concat(obj);
        return objectsByKeyValue;
      }, {});

    const grouped = groupBy("GroupTitle");
    // console.log(grouped(result.recordset));

    res.send(grouped(result.recordset));
  } catch (err) {
    res.send("Fehler: " + err);
  } finally {
    sql.close(); //closing connection after request is finished.
  }
});


var getAllContentDbs = async (conn) => {
  let allContentDBs = await conn.query(`SELECT name FROM master.dbo.sysdatabases WHERE name LIKE 'SharePoint_Content%'`);

  const rs = allContentDBs.recordset;
  const retArray = [];

  rs.forEach(db => {
    retArray.push(db.name);
  });

  return retArray;
}

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