const jwt = require("jsonwebtoken");
const getSecrets = require("./get-secrets");
const writeLog = require("./write-log");

const createUserToken = async (user, req, res) => {
  // creating the token
  const jwtSecret = await getSecrets("jwtSignature");
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
      dt_gen: new Date().toISOString(),
    },
    jwtSecret
  );

  // returning token
  res.status(200).json({
    message: `Usuário ${user.name} autenticado com sucesso.`,
    token: token,
    userId: user._id,
  });

  return token;
};

module.exports = createUserToken;
