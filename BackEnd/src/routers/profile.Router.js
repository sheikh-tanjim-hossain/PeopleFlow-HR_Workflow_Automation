// internal imports
const getProfileController = require("../controller/profile/getProfile.controller");

// external imports
const express = require("express");

// set router
const router = express.Router();


// get profile
router.get("/", getProfileController);

module.exports = router;
