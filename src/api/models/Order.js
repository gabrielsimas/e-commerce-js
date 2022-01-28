const mongoose = require('mongoose');
//TODO: Separate Mongoose to Model Order (Class)
//TODO: Add price on the buying' day to avoid problms with customers in case of price changes
//TODO: Add Discount voucher
const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },       
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default:1,
                }                
            },
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true },
        status: {type: String, default: "pending"},
    }, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);