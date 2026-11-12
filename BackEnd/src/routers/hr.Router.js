// external imports
const express = require("express");

// Internal Imports
const createRoleController = require("../controller/hr/createRole.controller");
const getAllRole = require("../controller/hr/getAllRole.controller");

// Initialize router
const router = express.Router();

/**
 * create role
 */

router.post("/role/create", createRoleController);

/**
 * Get all role
 */

router.get("/role/all", getAllRole);

module.exports = router;
