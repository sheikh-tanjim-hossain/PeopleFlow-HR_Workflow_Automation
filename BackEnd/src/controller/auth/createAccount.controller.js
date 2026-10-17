/**
 *POST: Base_URL/api/v1/auth/createaccount
 */

// internal exports
const EmployeeModel = require("../../model/employeeModel");
const ApiResponse = require("../../utils/apiResponse");

async function createAccountController(req, res, next) {
  const { name, email, password, age, salary, isEmployed, role } = req.body;
  try {
    // check if user exist
    const userExist = await EmployeeModel.findOne({ email });
    if (userExist) {
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

    // save to database
    const employee = await EmployeeModel.create({
      name,
      email,
      password,
      age,
      salary,
      isEmployed,
      role,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "user created successfully",
          { name, email, age, salary, isEmployed, role, id: employee._id },
          null,
        ),
      );
  } catch (err) {
    return res
      .status(500)
      .json(new ApiResponse(500, "User Creation Failed", null, err.message));
  }
}

module.exports = createAccountController;
