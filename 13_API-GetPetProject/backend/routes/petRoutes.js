const router = require("express").Router();
const PetController = require("../controllers/petController");

//middlewares
const verifyToken = require("../helper/verify-token");
const { imageUpload } = require("../helper/image-upload");

//routes
router.get("/testres", PetController.getTestReq);
/**
 * @swagger
 * /pets:
 *   get:
 *     description: Generate a list of pets
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/", PetController.getAll);
/**
 * @swagger
 * /pets/mypets:
 *   get:
 *     description: Generate a list of my own pets
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/mypets", verifyToken, PetController.getUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);
/**
 * @swagger
 * /pets/:id:
 *   get:
 *     description: Get Pet by ID
 *     responses:
 *       200:
 *         description: Returns a pet by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/:id", PetController.getPedById);
/**
 * @swagger
 * /pets/create:
 *   post:
 *     description: Create a new pet
 *     responses:
 *       200:
 *         description: Creates a pet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);
/**
 * @swagger
 * /pets/:id:
 *   patch:
 *     description: Changes a pet details
 *     responses:
 *       200:
 *         description: Changes a pet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PetController.updatePet
);
/**
 * @swagger
 * /pets/:id:
 *   delete:
 *     description: Delete a pet
 *     responses:
 *       200:
 *         description: Deletes a pet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.delete("/:id", verifyToken, PetController.removePetById);
router.patch("/schedule/:id", verifyToken, PetController.schedule);
router.patch("/conclude/:id", verifyToken, PetController.concludeAdoption);

module.exports = router;
