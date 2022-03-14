const Order = require('../models/order');

exports.getOrders = async () => {
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getOrderById = async (id) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw {
                status: 404,
                msg: 'Order not found'
            };
        }
        return order;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.createOrder = async (order) => {
    try {
        // console.log(order);
        const newOrder = new Order(order);
        return await newOrder.save();
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.updateOrder = async (id, order) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
        if (!updatedOrder) {
            throw {
                status: 404,
                msg: 'Order not found'
            };
        }
        return updatedOrder;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.deleteOrder = async (id) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            throw {
                status: 404,
                msg: 'Order not found'
            };
        }
        return deletedOrder;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getOrdersByUserId = async (userId) => {
    try {
        const orders = await Order.find({ userRef: userId });
        return orders;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getOrdersByProductId = async (productId) => {
    try {
        const orders = await Order.find({ productRef: productId });
        return orders;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getOrdersByStatus = async (status) => {
    try {
        const orders = await Order.find({ status: status });
        return orders;
    } catch (error) {
        console.log(error);
        return false;
    }
}

