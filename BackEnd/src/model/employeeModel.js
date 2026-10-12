// External Imports
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Name is required"],
    },
    email: {
      type: String,
      required: [true, "An email is required"],
      trim: true,
      unique: [true, "user with this email already exist"],
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email address",
      ],
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      select: false,
      minLength: [6, "password must be at least 6 charecters"],
    },
    age: {
      type: Number,
    },
    salary: {
      type: Number,
      required: [true, "A salary in required"],
      select: false,
    },
    isEmployed: {
      type: Boolean,
      required: [true, "An employee status is required"],
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// hash password on modify
employeeSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return;
});

// compare password
employeeSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel;
