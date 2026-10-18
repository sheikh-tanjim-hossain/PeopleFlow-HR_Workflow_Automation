// internal imports
const getProfileController = require("../controller/employee/getEmployee.controller");
const getEmployeeByID = require("../controller/employee/getEmployeeByID.controller");
const updateEmployeeController = require("../controller/employee/updateEmployee.controller");

// external imports
const express = require("express");

// set router
const router = express.Router();

// get profile
router.get("/", getProfileController);

// Get Employee profile by id
router.get("/:employeeId", getEmployeeByID);

router.patch("/:employeeId", updateEmployeeController);

module.exports = router;
