const Product = require("../models/Product");

module.exports = class ProductController {
  // static async showProducts(req, res) {
  //   const products = await Product.getAll();
  //   console.log("--> DEB_DB: Data found on MongoDB:", products);
  //   res.render("products/all", { products });
  // }
  static createProduct(req, res) {
    res.render("products/create");
  }
  static async postProduct(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({ name, image, price, description });
    const savedProd = await product.save();
    console.log("--> DEB_DB: Saved Product:", savedProd);

    res.redirect("/");
  }
  // static async getProduct(req, res) {
  //   const id = req.params.id;
  //   const product = await Product.getProductById(id);
  //   console.log("--> DEB_DB: Getting one product: ", product);
  //   res.render("products/product", { product });
  // }
  // static async removeProduct(req, res) {
  //   const id = req.params.id;
  //   await Product.removeProductById(id);
  //   res.redirect("/");
  // }
  // static async editProduct(req, res) {
  //   const id = req.params.id;
  //   console.log("--> DEB_REQ: Product ID to edit:", id);
  //   const product = await Product.getProductById(id);
  //   console.log("--> DEB_DB: Recovered mongoDB entry:", product);
  //   res.render("products/edit", { product });
  // }
  // static async postEditProduct(req, res) {
  //   const product = new Product(
  //     req.body.name,
  //     req.body.image,
  //     req.body.price,
  //     req.body.description
  //   );
  //   console.log("--> DEB_REQ: received from post to be updated:", product);

  //   await product.updateProduct(req.body.id);
  //   res.redirect("/");
  // }
};
