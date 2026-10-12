// internal imports
const apiResponse = require("../../utils/apiResponse");
const roleModel = require("../../model/roleModel");

async function createRoleController(req, res, next) {
  try {
    const newRole = await roleModel.create({ ...req.body });

    res.send(newRole);
  } catch (err) {}
}

module.exports = createRoleController;
