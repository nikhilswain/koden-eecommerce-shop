const { getOrders, getOrderById, getOrdersByUserId, updateOrder, deleteOrder, getOrdersByProductId, getOrdersByStatus } = require('../services/order');

//  @route   GET api/order
//  @desc    Get all orders
//  @access  Private
exports.IgetOrders = async (req, res) => {
    try {
        const orders = await getOrdersByUserId(req.user._id);
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
        const order = await getOrderById(req.params.id);
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

