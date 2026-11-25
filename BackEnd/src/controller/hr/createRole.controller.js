// internal imports
const ApiResponse = require("../../utils/apiResponse");
const RoleModel = require("../../model/roleModel");

async function createRoleController(req, res, next) {
  try {
    const { title, responsibility, description } = req.body || {};

    if (!title || !String(title).trim()) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "Role title is required",
            null,
            "Validation failed",
          ),
        );
    }

    const newRole = await RoleModel.create({
      title: String(title).trim(),
      responsibility:
        typeof responsibility === "string" ? responsibility.trim() : "",
      description: typeof description === "string" ? description.trim() : "",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Role created successfully", newRole, null));
  } catch (err) {
    const isValidationError = err.name === "ValidationError";
    const statusCode = isValidationError ? 400 : 500;

    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          statusCode,
          isValidationError ? err.message : "Failed to create role",
          null,
          err.message,
        ),
      );
  }
}

module.exports = createRoleController;
