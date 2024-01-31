const router = require("express").Router();
const AdminController = require("../controllers/adminController");

router.get(
  "/getDbBackup",
  AdminController.getDbBackup
  /*
    #swagger.path = '/admin/getDbBackup'
    #swagger.tags = ['Admin']
    #swagger.summary = 'Get a backup'
    #swagger.description = 'Generates a backup with all users and all pets'
*/
);

module.exports = router;
