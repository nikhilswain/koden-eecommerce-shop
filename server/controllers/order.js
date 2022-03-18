const { getOrders, getOrderById, getOrdersByUserId, updateOrder, deleteOrder, getOrdersByProductId, getOrdersByStatus } = require('../services/order');
const mongoose = require('mongoose');

//  @route   GET api/order
//  @desc    Get all orders of user
//  @access  Private
exports.IgetOrders = async (req, res) => {
    try {
        const p = req.query.p === 'true';
        const orders = await getOrdersByUserId(req.user._id, p);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/order/:id
//  @desc    Get order by id
//  @access  Private
exports.IgetOrderById = async (req, res) => {
    try {
        const addressDetail = req.query.p === 'true';
        const order = await getOrderById(req.params.id, addressDetail);
        if (!order) {
            throw {
                status: 404,
                msg: 'Order not found'
            };
        }
        if (String(order.userRef) !== req.user._id && req.user.userType !== 'admin') {
            throw {
                status: 401,
                msg: 'Unauthorized'
            };
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/order/all
//  @desc    Get orders by user id
//  @access  Protected
exports.IgetAllOrders = async (req, res) => {
    try {
        const orders = await getOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/order/status/:status
//  @desc    Get orders by status
//  @access  Protected
exports.IgetOrdersByStatus = async (req, res) => {
    try {
        const status = req.params.status;

        const orders = await getOrdersByStatus(status);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   GET api/order/product/:id
//  @desc    Get orders by product id
//  @access  Protected
exports.IgetOrdersByProductId = async (req, res) => {
    try {
        const productId = req.params.id;

        const orders = await getOrdersByProductId(productId);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   PUT api/order/:id
//  @desc    Update order
//  @access  Protected
exports.IupdateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const {
            addressRef,
            isPaid
        } = req.body;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw {
                status: 400,
                message: "Invalid order id"
            }
        }
        if (isPaid !== undefined) {
            if (req.user.userType !== 'admin' || req.user.userType !== 'manager') {
                throw {
                    status: 401,
                    message: "Unauthorized"
                }
            }
        }
        const currentOrder = await getOrderById(orderId);
        if (!currentOrder) {
            throw {
                status: 404,
                message: "Order not found"
            }
        }
        const currentTime = new Date();
        const orderTime = new Date(currentOrder.createdAt);
        const diff = currentTime.getTime() - orderTime.getTime();
        const diffHours = Math.floor((diff / (1000 * 60 * 60)));
        if (diffHours > 12) {
            throw {
                status: 400,
                message: "Order cannot be updated after 12 hrs of order creation, please contact admin"
            }
        }
        if (currentOrder.status !== 'ongoing') {
            throw {
                status: 400,
                message: "Order cannot be updated under current status"
            }
        }
        const order = await updateOrder(orderId, {
            addressRef, isPaid
        });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   POST api/order/:id/cancel
//  @desc    Cancel order
//  @access  Private
exports.IcancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw {
                status: 400,
                message: "Invalid order id"
            }
        }
        const order = await getOrderById(req.params.id);
        if (!order) {
            throw {
                status: 404,
                message: 'Order not found'
            };
        }
        if (String(order.userRef) !== req.user._id && req.user.userType !== 'admin') {
            throw {
                status: 401,
                message: 'Unauthorized'
            };
        }
        //  user can cancel order only before 24 hrs of order creation
        const currentTime = new Date();
        const orderTime = new Date(order.createdAt);
        const diff = currentTime.getTime() - orderTime.getTime();
        const diffHours = Math.floor((diff / (1000 * 60 * 60)));
        if (diffHours > 24) {
            throw {
                status: 400,
                message: 'Order cannot be cancelled after 24 hrs of order creation'
            };
        }
        const updatedOrder = await updateOrder(orderId, {
            status: 'cancelled'
        }, req.user._id);
        res.status(200).json({order: updatedOrder});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route   DELETE api/order/:id
//  @desc    Delete order
//  @access  Private
exports.IdeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw {
                status: 400,
                message: "Invalid order id"
            }
        }
        const order = await deleteOrder(orderId, req.user._id);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}