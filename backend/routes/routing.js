const express = require("express");
const middleware = require("../middleware/auth-middleware");
const { signup, login } = require("../controllers/conrollers");
const product = require("../models/productschema");
const { verify } = require("jsonwebtoken");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", middleware, login);
router.post("/product", middleware, async (req, res) => {
  const { name, price, company, category } = req.body;
  const user = new product({
    name,
    price,
    company,
    category,
  });
  const saving = await user.save();
  res.send(saving);
});
router.get("/findp", middleware, async (req, res) => {
  const find = await product.find();
  if (find.length > 0) {
    res.send(find);
  } else {
    res.status(401).send("no products fount").json({ error: "no products" });
  }
});
router.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const result = await product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send("Product not found");
    }
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});
router.get("/update/:id", async (req, res) => {
  try {
    const products = await product.findById(req.params.id);
    if (products) {
      res.json(products);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});
router.put("/update/:id", middleware, async (req, res) => {
  try {
    const products = await product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
router.get("/search/:id", middleware, async (req, res) => {
  try {
    const searchTerm = req.params.id;
    const products = await product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { company: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.send(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
