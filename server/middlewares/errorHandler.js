function errorHandler(error, req, res, next) {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "EmailRequired":
      status = 400;
      message = "Email is required";
      break;
    case "PasswordRequired":
      status = 400;
      message = "Password is required";
      break;
    default:
      break;
  }
}

module.exports = errorHandler;
