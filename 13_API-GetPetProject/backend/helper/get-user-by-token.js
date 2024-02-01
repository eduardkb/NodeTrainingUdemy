const jwt = require("jsonwebtoken");
const User = require("../models/User");
const writeLog = require("./write-log");
const getSecret = require("./get-secrets");

// get user by jwt token
const getUserByToken = async (token, res) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }
  try {
    // get JWT Signature
    const signature = await getSecret("jwtSignature");

    // decode token
    const decoded = jwt.verify(token, signature);
    const userId = decoded.id;
    const user = await User.findOne({ _id: userId });
    writeLog("DEB", "GetUserByToken", `Data: ${JSON.stringify(user)}`);
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
