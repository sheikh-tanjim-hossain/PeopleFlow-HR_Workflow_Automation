const ApiResponse = require("../../utils/apiResponse");
const RoleModel = require("../../model/roleModel");
async function getAllRole(req, res) {
  try {
    const data = await RoleModel.find({}).select("-__v");

    res
      .status(200)
      .json(new ApiResponse(200, "Data fetched successfully", data, null));
  } catch (error) {
    console.log(err);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "coudn't find the employee", null, err.message),
      );
  }
}

module.exports = getAllRole;
