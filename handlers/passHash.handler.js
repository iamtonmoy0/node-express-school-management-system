const bcrypt = require("bcryptjs");
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
// checking is password is matched
exports.isPassMatched = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
