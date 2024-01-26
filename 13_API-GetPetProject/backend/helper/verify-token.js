const jwt = require("jsonwebtoken");
const getToken = require("./get-token");
const writeLog = require("./write-log");
const getSecret = require("./get-secrets");

const checkToken = async (req, res, next) => {
  try {
    // convert token if req has it
    const token = getToken(req);

    // get JWT Signature
    const signature = await getSecret("jwtSignature");

    // verify token validity
    const verified = jwt.verify(token, signature);
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
