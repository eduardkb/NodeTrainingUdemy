const Product = require("../models/Product");

module.exports = class ProductController {
  static showProducts(req, res) {
    res.render("products/all");
  }
  static createProduct(req, res) {
    res.render("products/create");
  }
  static async postProduct(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(name, price, description);
    const savedProd = await product.save();
    console.log("--> DEB_DB: Saved Product:", savedProd);

    res.render("products/all");
  }
};
