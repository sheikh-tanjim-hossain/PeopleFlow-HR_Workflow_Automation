// External imports
const jwt = require("jsonwebtoken");
// internal imports
const ApiResponse = require("../utils/apiResponse");

function authenticationMiddleware(req, res, next, arr = []) {
  try {
    const token = req.signedCookies[process.env.APP_NAME];

    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    // JWT varification
    if (decodedToken.id) {
      if (arr.length === 0) {
        req.jwt = decodedToken;
        return next();
      } else {
        // authorization
        for (let i = 0; i < arr.length; i++) {
          item = arr[i];
          firstFieldName = Object.keys(item)[0];
          if (decodedToken[firstFieldName] === item[firstFieldName]) {
            next();
            break;
          } else {
            // authorization failed
            res
              .status(401)
              .json(
                new ApiResponse(
                  401,
                  "Access Denied. Unauthorized access. Your are not cleared to access this resource",
                  null,
                  "Authorization Failed",
                ),
              );
          }
        }
      }
    } else {
      // cookie not found
      res
        .status(401)
        .json(
          new ApiResponse(
            401,
            "Authentication field. Please login again",
            null,
            "JWT varification field",
          ),
        );
    }
  } catch (err) {
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          "Authenticatio field. Please login again",
          null,
          err.message,
        ),
      );
  }
}

module.exports = authenticationMiddleware;
