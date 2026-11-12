// external imports
const express = require("express");

// Internal Imports
const authMiddleware = require("../middleware/auth.middleware");
const createAccountController = require("../controller/auth/createAccount.controller");
const loginController = require("../controller/auth/login.controller");
const authVarifyController = require("../controller/auth/authVarify.controller");
const logoutController = require("../controller/auth/logout.controller");

// Set router
const router = express.Router();

/**
 * URL ROUTE = baseurl/auth
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

/*
 * Varify
 */
router.get("/varify", authMiddleware, authVarifyController);

/**
 * Logout
 */

router.post("/logout", logoutController);
module.exports = router;
