const router = require("express").Router();
const PetController = require("../controllers/petController");

//middlewares
const verifyToken = require("../helper/verify-token");
const { imageUpload } = require("../helper/image-upload");
const { verify } = require("jsonwebtoken");

//routes
router.get("/testres", PetController.getTestReq);
router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);
router.get("/:id", PetController.getPedById);
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);
router.delete("/:id", verifyToken, PetController.removePetById);

module.exports = router;
