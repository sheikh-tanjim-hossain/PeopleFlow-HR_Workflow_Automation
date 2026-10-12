/**
 *POST: Base_URL/api/v1/auth/createaccount
 */

// internal exports
const EmployeeModel = require("../../model/employeeModel");
const apiResponse = require("../../utils/apiResponse");

// external imports
const bcrypt = require("bcryptjs");

async function createAccountController(req, res, next) {
  try {
    const userExist = await EmployeeModel.findOne({ email: req.body.email });

    // check if user exist
    if (userExist) {
      return res
        .status(409)
        .json(
          new apiResponse(
            409,
            "User with this email already exist",
            null,
            "User creation failed. Same email found",
          ),
        );
    }
    // Encrypt password
    const password = await bcrypt.hash(req.body.password, 10);

    // save to database
    const employee = await EmployeeModel.create({ ...req.body, password });

    // api response
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          "user created successfully",
          { ...req.body, password },
          null,
        ),
      );
  } catch (err) {
    return res
      .status(500)
      .json(new apiResponse(500, "User Creation Failed", null, err.message));
  }
}

module.exports = createAccountController;
