const router = require("express").Router();
const UserController = require("../controllers/userController");

// middlewares
const verifyToken = require("../helper/verify-token");

// rotas
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkUser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", verifyToken, UserController.editUser);

module.exports = router;
