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
    #swagger.tags = ['Pets']
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
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userRegister"
                    }  
                }
            }
        }
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
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userLogin"
                    }  
                }
            }
        } 
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
    #swagger.security = [{
            "bearerAuth": []
    }]
  */
);
router.get(
  "/:id",
  UserController.getUserById
  /*
    #swagger.ignore = true
    #swagger.path = '/users/{id}'
    #swagger.tags = ['Users']
    #swagger.summary = 'Get a user by ID'
    #swagger.description = 'Returns a user detail by its ID'
  */
);
router.patch(
  "/edit",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
  /*    
    #swagger.path = '/users/edit'
    #swagger.tags = ['Users']
    #swagger.summary = 'Edit a user'
    #swagger.description = 'Modifies the properties of a user'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/userModify"
                    }  
                }
            }
        }
  */
);

module.exports = router;
