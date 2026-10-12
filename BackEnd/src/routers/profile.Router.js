// internal imports
const getProfile = require("../controllers/profile/getProfile.controller");

// external imports
const express = require("express");

// set router
const router = express.Router();

console.log("");

// get profile
router.get("/", getProfile);

module.exports = router;
