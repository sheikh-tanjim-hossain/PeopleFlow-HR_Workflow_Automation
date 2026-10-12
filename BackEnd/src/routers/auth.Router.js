// external imports
const express = require("express");

// Internal Imports
const authMiddleware = require("../middleware/auth.middleware");
const createAccountController = require("../controller/auth/createAccount.controller");
const loginController = require("../controller/auth/login.controller");

// Set router
const router = express.Router();

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
