// external imports
const express = require("express");

// Internal Imports
const createRoleController = require("../controllers/hr/createRole.controller");

// Initialize router
const router = express.Router();

/**
 * create role
 */

router.post("/createrole", createRoleController);

module.exports = router;
