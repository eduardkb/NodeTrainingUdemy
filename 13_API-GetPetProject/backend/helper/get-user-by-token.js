const jwt = require("jsonwebtoken");
const User = require("../models/User");
const writeLog = require("./write-log");

// get user by jwt token
const getUserByToken = async (token, res) => {
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
  } catch (error) {
    writeLog("DEB", "TokenDecode", `Error decoding token:${error}`);
    return res.status(401).json({ message: "Acesso negado." });
  }
};

module.exports = getUserByToken;
