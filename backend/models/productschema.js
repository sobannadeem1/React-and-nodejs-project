const mongoose = require("mongoose");
const productschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: String,
    company: String,
    category: String,
    userid: String,
  },
  { timestamps: true }
);

const product = mongoose.model("product", productschema);
module.exports = product;
