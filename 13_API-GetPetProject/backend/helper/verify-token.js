const jwt = require("jsonwebtoken");
const getToken = require("./get-token");
const writeLog = require("./write-log");
const pass = require("./global-variables").jwtSignature;

const checkToken = (req, res, next) => {
  try {
    // convert token if req has it
    const token = getToken(req);

    // verify token validity
    const verified = jwt.verify(token, pass);
    writeLog(
      "DEB",
      "TokenOk",
      `Token validated successfully: ${JSON.stringify(verified)}`
    );
    req.user = verified;
    next();
  } catch (error) {
    writeLog("DEB", "TokenErr", `Token not valid: ${error}`);
    return res.status(401).json({ message: "Acesso Negado." });
  }
};

module.exports = checkToken;
