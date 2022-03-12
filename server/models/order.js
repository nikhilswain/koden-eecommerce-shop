const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        products: {
            type: [{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
            }],
            required: true
        },
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        addressRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            min: 1,
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