const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController");

router.get("/create", ProductController.createProduct);
router.post("/create", ProductController.postProduct);
// router.post("/remove/:id", ProductController.removeProduct);
// router.get("/edit/:id", ProductController.editProduct);
// router.post("/edit", ProductController.postEditProduct);
// router.get("/:id", ProductController.getProduct);
router.get("/", ProductController.showProducts);

module.exports = router;
