const router = require('express').Router();
const { IgetOrders, IgetOrderById, IgetOrdersByProductId, IgetOrdersByStatus, IupdateOrder, IgetAllOrders, IcancelOrder, IdeleteOrder } = require('../controllers/order');

router.get('/', IgetOrders);
router.get('/:id', IgetOrderById);
router.put('/cancel', IcancelOrder);
router.put('/:id', IupdateOrder);

//  admin operations
router.get('/all', IgetAllOrders);
router.get('/product/:id', IgetOrdersByProductId);
router.get('/status/:status', IgetOrdersByStatus);
router.delete('/:id', IdeleteOrder);

module.exports = router;