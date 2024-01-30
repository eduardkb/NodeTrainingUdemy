const router = require("express").Router();
const AdminController = require("../controllers/adminController");

/**
 * @swagger
 * /admin/getDbBackup:
 *   get:
 *     description: Generate a backup of all users and pets
 *     responses:
 *       200:
 *         description: A list of users and pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/getDbBackup", AdminController.getDbBackup);

module.exports = router;
