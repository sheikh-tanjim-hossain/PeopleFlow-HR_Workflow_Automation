/**
 * POST: Base_URL/api/v1/auth/createaccount
 */

const fs = require("fs");

// internal imports
const EmployeeModel = require("../../model/employeeModel");
const ApiResponse = require("../../utils/apiResponse");

async function createAccountController(req, res, next) {
  const { name, email, password, age, salary, isEmployed, role, address } =
    req.body || {};

  const hasNewFile = Boolean(req.file && req.file.path);
  const imagePath = hasNewFile ? req.file.path.replace(/\\/g, "/") : null;

  const cleanupUploadedFile = async () => {
    if (hasNewFile && fs.existsSync(req.file.path)) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (cleanupErr) {
        console.error(
          "Failed to delete uploaded file after error:",
          cleanupErr.message,
        );
      }
    }
  };

  try {
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : email;

    // check if user exist
    if (normalizedEmail) {
      const userExist = await EmployeeModel.findOne({ email: normalizedEmail });
      if (userExist) {
        await cleanupUploadedFile();
        return res
          .status(409)
          .json(
            new ApiResponse(
              409,
              "User with this email already exist",
              null,
              "User creation failed. Same email found",
            ),
          );
      }
    }

    const employeeData = {
      name,
      email: normalizedEmail,
      password,
      salary,
      role,
      address,
    };

    if (age !== undefined && age !== "") {
      employeeData.age = age;
    }

    if (isEmployed !== undefined && isEmployed !== "") {
      employeeData.isEmployed = isEmployed;
    }

    if (imagePath) {
      employeeData.img = imagePath;
    }

    // save to database
    const employee = await EmployeeModel.create(employeeData);

    return res.status(201).json(
      new ApiResponse(
        201,
        "user created successfully",
        {
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          age: employee.age,
          salary: employee.salary,
          isEmployed: employee.isEmployed,
          role: employee.role,
          address: employee.address,
          img: employee.img || null,
        },
        null,
      ),
    );
  } catch (err) {
    await cleanupUploadedFile();

    const isValidationError =
      err.name === "ValidationError" || err.name === "CastError";
    const statusCode = isValidationError ? 400 : 500;

    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          statusCode,
          isValidationError ? err.message : "User Creation Failed",
          null,
          err.message,
        ),
      );
  }
}

module.exports = createAccountController;
