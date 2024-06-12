const { hashSync, compareSync } = require("bcryptjs");

module.exports = {
  hashPassword: (password) => {
    return hashSync(password, 10);
  },
  comparePassword: (password, hashedPassword) => {
    return compareSync(password, hashedPassword);
  },
};
