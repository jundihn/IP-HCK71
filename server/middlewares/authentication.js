const { verifyToken } = require("../helpers/jwt_token");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;

    if (!access_token) {
      res.status(401).json({ message: "Invalid token" });
    }

    let [bearer, token] = access_token.split(" ");

    if (bearer !== "Bearer") {
      res.status(401).json({ message: "Invalid token" });
    }

    let payload = verifyToken(token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = authentication;
