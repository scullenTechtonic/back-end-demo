// # packages
const express = require("express");
const logger = require("morgan");

// #
const app = express();
const port = process.env.PORT || 3001;
const { sequelize } = require("./models");

const instructorController = require("./controllers/instructorController");
const apprenticeController = require("./controllers/apprenticeController");


// # sets up morgan to log requests/status codes
app.use(logger("dev"));

// # sets up Express to receive/parse JSON data in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// # sets up a middleware to check the folder below for requests first
app.use(express.static("public"));

app.use("/api/instructors", instructorController);
app.use("/api/apprentices", apprenticeController);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server now listening on http://localhost:${port}!`);
  });
});
