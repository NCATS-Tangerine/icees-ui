const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const routes = require("./routes");

// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

// require('ssl-root-cas/latest')
//   .inject()
//   .addFile(__dirname, '/DigiCertHighAssuranceEVRootCA.crt');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("client/src"));
}

// Add routes, both API and view
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
