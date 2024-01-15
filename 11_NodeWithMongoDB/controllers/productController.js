const Product = require("../models/Product");

module.exports = class ProductController {
  static async showProducts(req, res) {
    const products = await Product.getAll();
    console.log("--> DEB_DB: Data found on MongoDB:", products);
    res.render("products/all", { products });
  }
  static createProduct(req, res) {
    res.render("products/create");
  }
  static async postProduct(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(name, image, price, description);
    const savedProd = await product.save();
    console.log("--> DEB_DB: Saved Product:", savedProd);

    res.redirect("/");
  }
};
