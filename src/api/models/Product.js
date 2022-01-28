const mongoose = require('mongoose');
//TODO: Separate Mongoose to Model Product (Class)
//TODO: Add stock operations: "Is In Stock?" | "Level of new order to suppliers | Minimal stock" | Quantity in stock
//TODO: Verify if size and color must be Array because products with multi colors and sizes in Stock
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },

    }, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);