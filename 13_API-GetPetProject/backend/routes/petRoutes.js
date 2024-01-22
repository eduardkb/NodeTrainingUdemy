const router = require("express").Router();
const PetController = require("../controllers/petController");

//middlewares
const verifyToken = require("../helper/verify-token");

router.get("/testres", PetController.getTestReq);
router.post("/create", verifyToken, PetController.create);

module.exports = router;
