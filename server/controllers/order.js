const { getOrders, getOrderById, getOrdersByUserId, updateOrder, deleteOrder, getOrdersByProductId, getOrdersByStatus } = require('../services/order');

//  @route   GET api/order
//  @desc    Get all orders of user
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
//  @access  Private
exports.IupdateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const {
            status,
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
        const order = await updateOrder(orderId, {
            status, addressRef, isPaid
        });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}