const EmployeeModel = require("./../../model/employeeModel");
const ApiResponse = require("./../../utils/apiResponse");
async function updateEmployeeController(req, res, next) {
  try {
    const employeeId = req.params.employeeId;
    const payload = req.body;

    const employeeData = await EmployeeModel.findOneAndUpdate(
      { _id: employeeId },
      { ...payload },
      { returnDocument: "after" },
    ).select("-createdAt -updatedAt -__v");

    employeeData.id = employeeData._id;
    delete employeeData._id;

    return res
      .status(202)
      .json(
        new ApiResponse(
          200,
          "Employee data updated successfully",
          employeeData,
          null,
        ),
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "Failed to update employee data",
          req.payload,
          err.message,
        ),
      );
  }
}

module.exports = updateEmployeeController;
