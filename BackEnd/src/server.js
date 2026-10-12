//  external imports
const env = require("dotenv").config();

// Internal Exports
const app = require("./app");
const connectToDB = require("./config/config.db");

// initialaze DB
connectToDB();

// initialize server
app.listen(process.env.PORT_NUMBER, () => {
  console.log("Backend Server is running on prot : " + process.env.PORT_NUMBER);
});
