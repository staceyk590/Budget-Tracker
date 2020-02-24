const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");



const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//Set up Mongo database.
const databaseUrl = process.env.MONGODB_URI || "budget";
const collections = ["budget"];

//Set reference to our database.
const db = mongojs(databaseUrl, collections);

//If there is an  error with the database, throw it.
db.on("error", error => {
  console.log("Database Error:", error);
});

//Routes
app.use(require("./routes/api.js"));

/* ----------------------- */
/* ---- Server set up ---- */
/* ----------------------- */

//Set PORT value.
const PORT = process.env.PORT || 3000;


// routes here

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});