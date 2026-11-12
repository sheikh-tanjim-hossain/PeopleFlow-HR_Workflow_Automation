// internal imports
const ApiResponse = require("../../utils/apiResponse");
const RoleModel = require("../../model/roleModel");

async function createRoleController(req, res, next) {
  try {
    const { title, responsibility, description } = req.body;
    const newRole = await RoleModel.create({
      title,
      responsibility,
      description,
    });

    res
      .status(201)
      .send(new ApiResponse(200, "Role created successfully", newRole, null));
  } catch (err) {}
}

module.exports = createRoleController;
