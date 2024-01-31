const router = require("express").Router();
const UserController = require("../controllers/userController");

// middlewares
const verifyToken = require("../helper/verify-token");
const { imageUpload } = require("../helper/image-upload");

// rotas
router.get(
  "/testres",
  UserController.getUsTest
  /*
    #swagger.ignore = true
  */
);
router.post(
  "/register",
  UserController.register
  /*
    #swagger.path = '/users/register'
    #swagger.tags = ['Users']
    #swagger.summary = 'Register user'
    #swagger.description = 'register a new user to the system'
  */
);
router.post(
  "/login",
  UserController.login
  /*
    #swagger.path = '/users/login'
    #swagger.tags = ['Users']
    #swagger.summary = 'Login User'
    #swagger.description = 'Logs the user in returning a token'
  */
);
router.get(
  "/checkUser",
  UserController.checkUser
  /*
    #swagger.path = '/users/checkUser'
    #swagger.tags = ['Users']
    #swagger.summary = 'Check logged in user'
    #swagger.description = 'Returns a logged in user'
  */
);
router.get(
  "/:id",
  UserController.getUserById
  /*
    #swagger.path = '/users/:id'
    #swagger.tags = ['Users']
    #swagger.summary = 'Get a user by ID'
    #swagger.description = 'Returns a user detail by its ID'
  */
);
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
  /*
    #swagger.path = '/users/edit/:id'
    #swagger.tags = ['Users']
    #swagger.summary = 'Edit a user'
    #swagger.description = 'Modifies the properties of a user'
  */
);

module.exports = router;
