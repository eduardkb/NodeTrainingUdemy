const router = require("express").Router();
const UserController = require("../controllers/userController");

// middlewares
const verifyToken = require("../helper/verify-token");
const { imageUpload } = require("../helper/image-upload");

// rotas
router.get("/testres", UserController.getUsTest);
/**
 * @swagger
 * /users/register:
 *   post:
 *     description: Register a user
 *     responses:
 *       200:
 *         description: Register a user on the system
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post("/register", UserController.register);
/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Login a user
 *     responses:
 *       200:
 *         description: Login a user on the system
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post("/login", UserController.login);
/**
 * @swagger
 * /users/checkUser:
 *   get:
 *     description: Verify logged in user
 *     responses:
 *       200:
 *         description: Verify if user is logged in with valid token
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/checkUser", UserController.checkUser);
/**
 * @swagger
 * /users/:id:
 *   get:
 *     description: Gets a user by ID
 *     responses:
 *       200:
 *         description: Gets a user by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/:id", UserController.getUserById);
/**
 * @swagger
 * /users/edit/:id:
 *   patch:
 *     description: Edit a user.
 *     responses:
 *       200:
 *         description: Changes a user by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);

module.exports = router;
