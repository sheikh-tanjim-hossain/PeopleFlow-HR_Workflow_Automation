const EmployeeModel = require("./../../model/employeeModel");
const ApiResponse = require("./../../utils/apiResponse");
async function updateEmployeeController(req, res, next) {
  try {
    const employeeId = req.params.employeeId;
    // if (req.jwt.role != "hr" && req.jwt._id != employeeId) {
    //   return res
    //     .status(401)
    //     .json(
    //       new ApiResponse(
    //         401,
    //         "You are not allowed to access this functionality",
    //         null,
    //         "Unauthorize access",
    //       ),
    //     );
    // } else {
    const payload = req.body;

    // password varification
    if (req.jwt._id != employeeId && payload.password) {
      delete payload.password;
    }

    // role varification
    if (req.jwt.role != "hr" && payload.role) {
      delete payload.role;
    }

    // salary
    if (req.jwt.role != "hr" && payload.salary) {
      delete payload.salary;
    }

    const employeeData = await EmployeeModel.findOneAndUpdate(
      { _id: employeeId },
      { ...payload },
      { returnDocument: "after" },
    ).select("-createdAt -updatedAt -__v");

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
    // }
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
