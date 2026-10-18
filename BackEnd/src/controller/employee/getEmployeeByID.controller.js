// internal imports
const ApiResponse = require("../../utils/apiResponse");
const EmployeeModel = require("../../model/employeeModel");

async function getEmployeeByID(req, res, next) {
  try {
    const employee = await EmployeeModel.findOne({
      _id: req.params.employeeId,
    }).select("-createdAt -updatedAt -__v ");

    // employee not found
    if (!employee) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            `no employee found with id: ${req.params.employeeId}`,
            null,
            "Employee not found",
          ),
        );
    }

    // process employee data
    const employeeData = employee.toObject();
    employeeData.id = employeeData._id;
    delete employeeData._id;

    return res
      .status(200)
      .json(new ApiResponse(200, "Employee found", employeeData, null));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "coudn't find the employee", null, err.message),
      );
  }
}

module.exports = getEmployeeByID;
