const utils = require("../helpers/utils");

module.exports.checkAuth = function (req, res, next) {
  const userid = req.session.userid;
  utils.fPrintLog(`User Session ID: ${userid}`, "AUTH");
  if (!userid) {
    res.redirect("/login");
    return;
  }
  next();
};
