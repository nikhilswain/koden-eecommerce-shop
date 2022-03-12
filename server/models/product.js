const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 150
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String,
            required: true,
            maxlength: 500
        },
        image: {
            type: String,
            required: false,
            select: false,
            maxlength: 255
        },
        category: {
            type: String,
            required: true,
            enum: ['electronics', 'clothes', 'cosmetics', 'others'],
            default: 'others'
        },
        quantity: {
            type: Number,
            select: false,
            required: true,
            min: 0
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            select: false,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);