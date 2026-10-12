// external imports
const express = require("express");

// Internal Imports
const authMiddleware = require("../middleware/auth.middleware");
const createAccountController = require("../controllers/auth/createAccount.controller");
const loginController = require("../controllers/auth/login.controller");

// Set router
const router = express.Router();
/**
 * This location
 * Base_URL/api/v1/auth
 */

/**
 * Create account
 */

router.post(
  "/createaccount",
  (req, res, next) => {
    authMiddleware(req, res, next, [{ role: "hr" }]);
  },
  createAccountController,
);

/**
 * Login
 */

router.post("/login", loginController);

module.exports = router;
