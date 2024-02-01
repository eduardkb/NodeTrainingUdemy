const jwt = require("jsonwebtoken");
const getToken = require("./get-token");
const writeLog = require("./write-log");
const getSecret = require("./get-secrets");
const getUserByToken = require("./get-user-by-token");

const checkToken = async (req, res, next) => {
  try {
    // convert token if req has it
    const token = getToken(req);

    // get JWT Signature
    const signature = await getSecret("jwtSignature");

    // verify token validity
    const verified = jwt.verify(token, signature);

    // verify if user is admin
    const user = await getUserByToken(token, res);

    if (!user.isAdmin) {
      throw "User not valid admin.";
    } else {
      if (user.isAdmin === true) {
        // token ok. continue
        writeLog(
          "DEB",
          "AdminTokenOk",
          `Admin validated successfully: ${JSON.stringify(verified)}`
        );
        req.user = verified;
        next();
      } else {
        throw "User not valid admin.";
      }
    }
  } catch (error) {
    writeLog("DEB", "TokenErr", `Token not valid: ${error}`);
    return res.status(401).json({ message: "Acesso Negado." });
  }
};

module.exports = checkToken;
