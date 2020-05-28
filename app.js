/*
 * @file: app.js
 * @description: It Contain server setup function.
 * @author: Taniya
 */


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import config from "config";
import * as DB from "./db";
import SwaggerJsDocs from "./swagger-config";
import api from "./api";
import { failAction } from "./utilities/response";
const app = express();
const http = require("http");
const { port } = config.get("app");
// Access-Control-Allow-Origin
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(fileUpload());


app.use(bodyParser.urlencoded({
  limit: '5000mb',
  extended: true
}));
// parse application/json

app.use(bodyParser.json({
  limit: '5000mb',
  extended: true
}));
app.use('*/images', express.static('public/images'));

/*********** Swagger UI setup ********************/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerJsDocs));
/*********** All Routes ********************/
app.use("/api/v1", api);
// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res
      .status(400)
      .json(failAction(err.error.message.toString().replace(/[\""]+/g, "")));
  } else {
    // pass on to another error handler
    next(err);
  }
});
// Run static setup
app.use(express.static(__dirname + "/views"));

app.get("/*", function (req, res) {
  return res.sendFile(
    path.join(__dirname + "/views", "index.html")
  );
});

// check mongose connection
DB.connection();
// create server connection
const server = http.createServer(app);
// const port = process.env.PORT || 3001
// Start the app by listening on the default Heroku port
server.listen(port, () => {

  console.log(`server is running on port ${port}-env=${process.env.NODE_ENV}`);
});
