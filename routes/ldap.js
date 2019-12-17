const express = require("express");
const router = express.Router();
const ldap = require("ldapjs");
var ActiveDirectory = require("activedirectory");

const ldapConnect = () => {
  var client = ldap.createClient({
    url: "ldap://arges.local:389"
  });

  client.bind(
    "CN=Administrator,CN=Builtin,DC=arges,DC=local",
    "dkvm4#2",
    function(err) {}
  );

  return client;
};

router.get("/sid/:sid", async (req, res, next) => {
  if (!req.params.sid) res.status(500);

  try {
    var client = ldapConnect();

    var opts = {
      filter: "(objectSid=" + req.params.sid + ")",
      scope: "sub",
      attributes: []
    };

    client.search("dc=arges,dc=local", opts, function(err, cres) {
      if (err) return;

      cres.on("searchEntry", function(entry) {
        // console.log('entry: ' + JSON.stringify(entry.object));
        client.unbind();
        res.send(entry.object);
      });
      cres.on("searchReference", function(referral) {
        // console.log('referral: ' + referral.uris.join());
      });
      cres.on("error", function(err) {
        // console.error('error: ' + err.message);
      });
      cres.on("end", function(result) {
        // console.log('status: ' + result.status);
      });
    });
  } catch (error) {
    console.error("ERROR: " + error);
  }

  client.unbind();
});

router.get("/thumbnail/:sid", async (req, res, next) => {
  if (!req.params.sid) res.status(500);

  try {
    var client = ldapConnect();

    var opts = {
      filter: "(objectSid=" + req.params.sid + ")",
      scope: "sub",
      attributes: []
    };

    client.search("dc=arges,dc=local", opts, function(err, cres) {
      if (err) return;

      cres.on("searchEntry", function(entry) {
        // console.log('entry: ' + JSON.stringify(entry.object));
        client.unbind();

        const attr = entry.attributes;
        const tn = attr.find(element => element.type === "thumbnailPhoto");

        if (tn) res.send(tn._vals);
        else res.send(null);
      });
      cres.on("searchReference", function(referral) {
        // console.log('referral: ' + referral.uris.join());
      });
      cres.on("error", function(err) {
        // console.error('error: ' + err.message);
      });
      cres.on("end", function(result) {
        // console.log('status: ' + result.status);
      });
    });
  } catch (error) {
    console.error("ERROR: " + error);
  }

  client.unbind();
});

module.exports = router;
