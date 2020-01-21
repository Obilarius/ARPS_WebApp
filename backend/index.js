const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// set up express app
const app = express();

var corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/fileserver", require("./routes/fileserver"));
app.use("/directory", require("./routes/directory"));
app.use("/fsdetails", require("./routes/fileserverDetails"));
app.use("/user", require("./routes/user"));
app.use("/ad", require("./routes/ad"));
app.use("/ldap", require("./routes/ldap"));
app.use("/wss", require("./routes/sharepoint"));

// error handling middleware
app.use((err, req, res, next) => {
  res.status(400).send({
    error: err.message
  });
});

// port
const port = process.env.PORT || 8000;
// listen for requests
app.listen(port, function () {
  console.log(`Server now listening on port ${port}`);
});