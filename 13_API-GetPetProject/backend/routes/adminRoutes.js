const router = require("express").Router();
const AdminController = require("../controllers/adminController");

router.get("/getDbBackup", AdminController.getDbBackup);

module.exports = router;
