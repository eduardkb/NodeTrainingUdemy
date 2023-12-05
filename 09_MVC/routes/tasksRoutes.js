const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.showTasks);
router.get("/add", TaskController.createTask);
router.post("/add", TaskController.createTaskPost);
router.post("/remove", TaskController.removeTask);

module.exports = router;
