const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        productRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            default: 1
        },
        price: {
            type: Number,
            min: 1,
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["success", "ongoing", "cancelled", "failed"],
            default: "ongoing"
        },
        isPaid: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', orderSchema);