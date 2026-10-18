// Internal Imports
const ApiResponse = require("../../utils/apiResponse");
const employeeModel = require("../../model/employeeModel");

async function getProfile(req, res, next) {
  try {
    const profileDetails = await employeeModel
      .findOne({ _id: req.jwt.id })
      .select("-createdAt -updatedAt -__v")
      .populate({ path: "role", select: "-__v" });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Profile Fetching successfull",
          profileDetails,
          null,
        ),
      );
  } catch (err) {
    res
      .status(500)
      .json(new ApiResponse(500, "Profile data unavailabe", null, err.message));
  }
}

module.exports = getProfile;
