// external imports
const express = require("express");
const cookieParser = require("cookie-parser");

// internal imports
const authMiddleware = require("./middleware/auth.middleware");
const hrRouter = require("./routers/hr.Router");
const authRouter = require("./routers/auth.Router");
const ApiResponse = require("./utils/apiResponse");
const testRouter = require("./routers/testRouter");
const employeeRouter = require("./routers/employee.Router");

// initialize the server
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

/*
HR Routes
*/
app.use(
  `/api/v1/hr`,
  (req, res, next) => {
    authMiddleware(req, res, next, [{ role: "hr" }]);
  },
  hrRouter,
);

/**
 * Auth Router
 */
app.use("/api/v1/auth", authRouter);

/**
 *
 * Test route
 */

app.use("/api/v1/test", testRouter);

/**
 * Profile Router
 */

app.use("/api/v1/employee", authMiddleware, employeeRouter);

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res
    .status(statusCode)
    .json(new ApiResponse(false, "Operation Failed", null, err.message));
});

module.exports = app;
