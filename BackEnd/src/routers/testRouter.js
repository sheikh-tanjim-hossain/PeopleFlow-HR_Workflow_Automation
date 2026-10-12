// external imports
const express = require("express");

// internal imports
const authenticationMiddleware = require("../middleware/auth.middleware");

// initiate router
const router = express.Router();

router.get("/", authenticationMiddleware, (req, res) => {
  console.log(req.jwt);
  res.send("test route");
});

module.exports = router;
