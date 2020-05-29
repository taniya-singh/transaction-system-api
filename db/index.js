/*
 * @file: index.js
 * @description: It Contain db setup function.
 * @author: Taniya
 */

import mongoose from "mongoose";
import config from "config";
const { auth, name, host, username, password, port } = config.get("db");
const databaseUrl = auth
  ? `mongodb://${username}:${password}@${host}:${port}/${name}`
  : `mongodb://${host}:${port}/${name}`;

// Mongose setup with server
mongoose.connect(databaseUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

export const connection = () => {
  mongoose.connection.on("connected", function() {
    console.log("****Mongoose connected!**** ");
  });
};
