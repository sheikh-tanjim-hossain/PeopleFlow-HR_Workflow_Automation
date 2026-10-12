// external imports
const jwt = require("jsonwebtoken");

// internal imports
const EmployeeModel = require("../../model/employeeModel");
const ApiResponse = require("../../utils/apiResponse");

async function loginController(req, res) {
  const { email, password } = req.body;

  //   check if email and password is provided
  if (!email || !password) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Password and email is required to procide login",
          null,
          "bad request",
        ),
      );
  }

  try {
    //   check if user exist
    const employee = await EmployeeModel.findOne({ email })
      .select("+password")
      .populate("role");
    if (!employee) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            "No account exist with this email",
            null,
            "user not found",
          ),
        );
    }

    //password didnt match
    if (!employee.matchPassword(password)) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            "Credentian didn't match. Please provide the correct email and password",
            null,
            "Authentication failed. Provide correct password and email",
          ),
        );
    }

    /**
     *  Authentication Complete
     */

    // send jwt

    const jwtToken = jwt.sign(
      {
        id: employee._id,
        name: employee.name,
        role: employee.role.title,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.SESSION_EXPIRE,
      },
    );

    // Send cookie and response
    res
      .status(200)
      .cookie(process.env.APP_NAME, jwtToken, {
        signed: true,
        httpOnly: true,
        maxAge: process.env.SESSION_EXPIRE,
      })
      .send(
        new ApiResponse(
          200,
          "Login successfull",
          {
            id: employee._id,
            name: employee.name,
            role: employee.role.title,
          },
          null,
        ),
      );
  } catch (err) {
    res
      .status(500)
      .send(
        new ApiResponse(
          500,
          "Error login in. Please try again",
          null,
          err.message,
        ),
      );
  }
}

module.exports = loginController;
