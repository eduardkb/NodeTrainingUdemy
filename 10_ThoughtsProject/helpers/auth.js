module.exports.checkAuth = function (req, res, next) {
  const userid = req.session.userid;
  console.log("==>>DEB_auth: User session:", userid);
  if (!userid) {
    res.redirect("/login");
    return;
  }
  next();
};
