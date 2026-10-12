const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connection is successful");
  } catch (err) {
    console.log("Database connection failed: ", err.message);
  }
}

module.exports = connectToDB;
