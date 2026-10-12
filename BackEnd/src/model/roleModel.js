const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  responsibility: String,
  description: String,
});

const roleModel = mongoose.model("role", rolesSchema);

module.exports = roleModel;
