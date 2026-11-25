const ApiResponse = require("../../utils/apiResponse");
const RoleModel = require("../../model/roleModel");
const EmployeeModel = require("../../model/employeeModel");

async function getAllRole(req, res) {
  try {
    const [roles, roleCounts] = await Promise.all([
      RoleModel.find({}).select("-__v").lean(),
      EmployeeModel.aggregate([
        { $match: { role: { $ne: null } } },
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),
    ]);

    const countByRoleId = new Map(
      roleCounts.map((item) => [String(item._id), item.count]),
    );

    const data = roles.map((role) => ({
      ...role,
      employeeCount: countByRoleId.get(String(role._id)) || 0,
    }));

    res
      .status(200)
      .json(new ApiResponse(200, "Data fetched successfully", data, null));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Failed to fetch roles", null, err.message),
      );
  }
}

module.exports = getAllRole;
