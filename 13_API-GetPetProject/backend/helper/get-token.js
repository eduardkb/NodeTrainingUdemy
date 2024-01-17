const getToken = (req) => {
  if (!req.headers.authorization) {
    throw "No token on Auth Header";
  }
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  return token;
};

module.exports = getToken;
