const Product = require("../models/product");

exports.getAllProducts = async (includes) => {
    try {
        const products = await Product.find({}, includes);
        if (!products) {
            throw {
                status: 404,
                msg: 'Products not found'
            };
        }
        return products;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getProductsByCategory = async (category, includes) => {
    try {
        const products = await Product.find({category: category}, includes);
        if (!products) {
            throw {
                status: 404,
                msg: 'Products not found'
            };
        }
        return products;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getProduct = async (id, includes) => {
    try {
        const product = await Product.findOne({_id: id}, includes);
        if (!product) {
            throw {
                status: 404,
                msg: 'Product not found'
            };
        }
        return product;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.updateProduct = async (id, data) => {
    try {
        const product = await Product.findOneAndUpdate({_id: id}, data, {new: true});
        if (!product) {
            throw {
                status: 404,
                msg: 'Product not found'
            };
        }
        return product;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.postProduct = async (data) => {
    try {
        const product = new Product(data);
        await product.save();
        return product;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.deleteProduct = async (id) => {
    try {
        const product = await Product.findOneAndDelete({_id: id});
        if (!product) {
            throw {
                status: 404,
                msg: 'Product not found'
            };
        }
        return product;
    } catch (error) {
        console.log(error);
        return false;
    }
}