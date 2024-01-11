const express = require("express");
const router = express.Router();
const ThoughtController = require("../controllers/thoughtController");

//helper
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, ThoughtController.createThought);
router.post("/add", checkAuth, ThoughtController.postThought);
router.get("/dashboard", checkAuth, ThoughtController.dashboard);
router.post("/remove", checkAuth, ThoughtController.removeThought);
router.get("/", ThoughtController.showThoughts);

module.exports = router;
