const ApiResponse = require("./../../utils/apiResponse");
async function logoutController(req, res) {
  try {
    res
      .clearCookie(process.env.APP_NAME, { signed: true, httpOnly: true })
      .status(200)
      .json(new ApiResponse(200, "logout successfull", null, null));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Logout failed", null, "Internal server error"),
      );
  }
}

module.exports = logoutController;
