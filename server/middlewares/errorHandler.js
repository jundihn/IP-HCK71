function errorHandler(error, req, res, next) {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "UsernameRequired":
      status = 400;
      message = "Username is required";
      break;
    case "EmailRequired":
      status = 400;
      message = "Email is required";
      break;
    case "PasswordRequired":
      status = 400;
      message = "Password is required";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "InvalidLogin":
      status = 401;
      message = "User / Password is wrong";
      break;
    case "Unauthorized":
      status = 401;
      message = "Invalid Token";
      break;
    default:
      break;
  }
}

module.exports = errorHandler;
