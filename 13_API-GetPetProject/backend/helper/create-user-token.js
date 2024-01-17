const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  // creating the token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "MyC.mp1&xS&cr3t.1701"
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
