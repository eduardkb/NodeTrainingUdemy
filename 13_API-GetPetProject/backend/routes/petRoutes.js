const router = require("express").Router();
const PetController = require("../controllers/petController");

//middlewares
const verifyToken = require("../helper/verify-token");
const { imageUpload } = require("../helper/image-upload");

//routes
router.get(
  "/testres",
  PetController.getTestReq
  /*
    #swagger.ignore = true
    #swagger.tags = ['Pets']    
*/
);
router.get(
  "/",
  PetController.getAll
  /*
    #swagger.path = '/pets/'
    #swagger.tags = ['Pets']
    #swagger.summary = 'Get all pets'
    #swagger.description = 'Returns all registered pets'
*/
);
router.get(
  "/mypets",
  verifyToken,
  PetController.getUserPets
  /*
    #swagger.path = '/pets/mypets'
    #swagger.tags = ['Pets']
    #swagger.summary = 'Get my pets'
    #swagger.description = 'Returns all pets that I registered'
    #swagger.security = [{
            "bearerAuth": []
    }]
*/
);
router.get(
  "/myadoptions",
  verifyToken,
  PetController.getAllUserAdoptions
  /*
    #swagger.ignore = true
    #swagger.tags = ['Pets']
*/
);
router.get(
  "/:id",
  PetController.getPedById
  /*
    #swagger.ignore = true
    #swagger.path = '/pets/:id'
    #swagger.tags = ['Pets']
    #swagger.summary = 'Get pet by ID'
    #swagger.description = 'Returns a pet by it's ID.'
*/
);
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
  /*    
    #swagger.path = '/pets/create'
    #swagger.tags = ['Pets']
    #swagger.summary = 'Register a pet'
    #swagger.description = 'Add a new pet to the system'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {            
            $ref: "#/components/schemas/petBody"
          }  
        }
      }
    }
*/
);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PetController.updatePet
  /*
    #swagger.ignore = true
    #swagger.path = '/pets/:id'
    #swagger.tags = ['Pets']
    #swagger.summary = 'Modify a pet'
    #swagger.description = 'Changes a pet's registered values'
*/
);
router.delete(
  "/:id",
  verifyToken,
  PetController.removePetById
  /*
    #swagger.ignore = true
    #swagger.path = '/pets/id'
    #swagger.tags = ['Pets']
    #swagger.summary = 'Delete a pet'
    #swagger.description = 'Removes a pet from the system'
*/
);
router.patch(
  "/schedule/:id",
  verifyToken,
  PetController.schedule
  /*
    #swagger.ignore = true
    #swagger.tags = ['Pets']
*/
);
router.patch(
  "/conclude/:id",
  verifyToken,
  PetController.concludeAdoption
  /*
    #swagger.ignore = true
    #swagger.tags = ['Pets']
*/
);

module.exports = router;
