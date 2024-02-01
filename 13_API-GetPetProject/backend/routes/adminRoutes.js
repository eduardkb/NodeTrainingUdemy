const router = require("express").Router();
const AdminController = require("../controllers/adminController");
const verifyAdmin = require("../helper/verify-if-admin");

router.get(
  "/getDbBackup",
  verifyAdmin,
  AdminController.getDbBackup
  /*
    #swagger.path = '/admin/getDbBackup'
    #swagger.tags = ['Admin']
    #swagger.summary = 'Get a backup'
    #swagger.description = 'Generates a backup with all users and all pets'
    #swagger.security = [{
            "bearerAuth": []
    }]
*/
);

module.exports = router;
