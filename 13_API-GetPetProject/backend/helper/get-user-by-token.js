const jwt = require("jsonwebtoken");
const User = require("../models/User");
const pass = require("./global-variables").jwtSignature;

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }
  try {
    const decoded = jwt.verify(token, pass);
    const userId = decoded.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Acesso negado." });
    }
    return user;
  } catch {
    return res.status(401).json({ message: "Acesso negado." });
  }
};

module.exports = getUserByToken;
