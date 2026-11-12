const ApiResponse = require("./../../utils/apiResponse");
const EmployeeModel = require("./../../model/employeeModel");

async function getAllEmployee(req, res, next) {
  try {
    const employees = await EmployeeModel.find({})
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean()
      .populate("role");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "All employees fetched successfully",
          employees,
          null,
        ),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Employee fetching failed", null, error.message),
      );
  }
}

module.exports = getAllEmployee;
