const express = require("express");
const logger = require("morgan");

const app = express();
const { sequelize } = require("./models");
const port = process.env.PORT || 3001;


// # sets up morgan to log requests/status codes
app.use(logger("dev"));

// # sets up Express to receive/parse JSON data in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// # sets up a middleware to check the folder below for requests first
app.use(express.static("public"));

// app.use("/instructors", instructorController);
// app.use("/students", studentController);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server now listening on http://localhost:${port}!`);
  });
});
