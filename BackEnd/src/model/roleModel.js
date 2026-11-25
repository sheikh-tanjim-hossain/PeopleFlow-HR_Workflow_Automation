const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Role title is required"],
    trim: true,
  },
  responsibility: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const RoleModel = mongoose.model("role", rolesSchema);

module.exports = RoleModel;
