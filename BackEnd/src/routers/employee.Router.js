/**
 * url : /api/v1/employee
 */
// internal imports
const getProfileController = require("../controller/employee/getEmployee.controller");
const getEmployeeByID = require("../controller/employee/getEmployeeByID.controller");
const updateEmployeeController = require("../controller/employee/updateEmployee.controller");
const authMiddleware = require("./../middleware/auth.middleware");
const getAllEmployee = require("./../controller/employee/getAllEmployee.controller.js");

// external imports
const express = require("express");

// set router
const router = express.Router();

// get profile
router.get("/", getProfileController);

// get all employee
router.get("/all", getAllEmployee);

// Get Employee profile by id
router.get("/:employeeId", getEmployeeByID);

// Update employee
router.patch(
  "/:employeeId",
  (req, res, next) => {
    authMiddleware(req, res, next, [
      { role: "hr" },
      { _id: req.params.employeeId },
    ]);
  },
  updateEmployeeController,
);

module.exports = router;
