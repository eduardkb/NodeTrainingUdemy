const router = require("express").Router();
const PetController = require("../controllers/petController");

//middlewares
const verifyToken = require("../helper/verify-token");
const { imageUpload } = require("../helper/image-upload");

//routes
router.get("/testres", PetController.getTestReq);
router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getUserPets);
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

module.exports = router;
