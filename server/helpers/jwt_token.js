const { sign, verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// console.log({ secret });
module.exports = {
  signToken: (payload) => sign(payload, secret), //create token
  verifyToken: (token) => verify(token, secret), //decode token
};
