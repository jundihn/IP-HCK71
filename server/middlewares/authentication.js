const { verifyToken } = require("../helpers/jwt_token");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;

    if (!access_token) {
      res.status(401).json({ name: "Unauthorized" });
    }

    let [bearer, token] = access_token.split(" ");

    if (bearer !== "Bearer") {
      res.status(401).json({ name: "Unauthorized" });
    }

    let payload = verifyToken(token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      res.status(401).json({ name: "Unauthorized" });
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
