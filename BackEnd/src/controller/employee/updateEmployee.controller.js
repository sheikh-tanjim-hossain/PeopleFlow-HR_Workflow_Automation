const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const EmployeeModel = require("../../model/employeeModel");
const ApiResponse = require("../../utils/apiResponse");

async function updateEmployeeController(req, res, next) {
  const { employeeId } = req.params;
  const payload = { ...req.body };

  const hasNewFile = Boolean(req.file && req.file.path);
  const newImagePath = hasNewFile ? req.file.path.replace(/\\/g, "/") : null;

  try {
    // 1. Validate employeeId format
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      if (hasNewFile && fs.existsSync(req.file.path)) {
        await fs.promises.unlink(req.file.path);
      }
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "Invalid employee ID format",
            null,
            `Invalid ID: ${employeeId}`
          )
        );
    }

    // 2. Role-based field restrictions & data cleanup
    // Password restrictions & empty check
    if (!payload.password) {
      delete payload.password;
    } else if (
      req.jwt &&
      req.jwt._id != employeeId &&
      req.jwt.role !== "hr"
    ) {
      delete payload.password;
    }

    // Role modification restricted to HR
    if (req.jwt && req.jwt.role !== "hr" && payload.role) {
      delete payload.role;
    }

    // Salary modification restricted to HR
    if (req.jwt && req.jwt.role !== "hr" && payload.salary) {
      delete payload.salary;
    }

    // 3. Set image field if a new photo was uploaded
    if (hasNewFile) {
      payload.img = newImagePath;
    } else if (payload.img !== undefined) {
      // Disallow direct arbitrary string manipulation of img without file upload
      delete payload.img;
    }

    // 4. Fetch existing employee to verify existence and get the old image path
    const existingEmployee = await EmployeeModel.findById(employeeId);

    if (!existingEmployee) {
      // Delete the newly uploaded photo since employee doesn't exist
      if (hasNewFile && fs.existsSync(req.file.path)) {
        await fs.promises.unlink(req.file.path);
      }

      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            "Employee not found",
            null,
            `Employee with id ${employeeId} not found`
          )
        );
    }

    const oldImagePath = existingEmployee.img || existingEmployee.imn;

    // 5. Update database record
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { ...payload },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-createdAt -updatedAt -__v");

    // 6. Delete old photo from directory after successful DB update
    if (hasNewFile && oldImagePath) {
      try {
        const absoluteOldPath = path.resolve(
          process.cwd(),
          oldImagePath.replace(/^\/+/, "")
        );
        const absoluteNewPath = path.resolve(process.cwd(), req.file.path);
        const uploadsRoot = path.resolve(process.cwd(), "uploads", "profiles");

        // Delete only if file is within uploads/profiles, exists, and is distinct from new photo
        if (
          absoluteOldPath.startsWith(uploadsRoot) &&
          fs.existsSync(absoluteOldPath) &&
          absoluteOldPath !== absoluteNewPath
        ) {
          await fs.promises.unlink(absoluteOldPath);
        }
      } catch (fileErr) {
        console.error("Warning: Failed to delete old image:", fileErr.message);
      }
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Employee data updated successfully",
          updatedEmployee,
          null
        )
      );
  } catch (err) {
    // Clean up newly uploaded file if DB update failed
    if (hasNewFile && fs.existsSync(req.file.path)) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (cleanupErr) {
        console.error("Failed to delete uploaded file after error:", cleanupErr.message);
      }
    }

    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "Failed to update employee data",
          null,
          err.message
        )
      );
  }
}

module.exports = updateEmployeeController;
