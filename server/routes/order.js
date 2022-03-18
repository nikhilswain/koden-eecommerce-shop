const router = require('express').Router();
const { IgetOrders, IgetOrderById, IgetOrdersByProductId, IgetOrdersByStatus, IupdateOrder, IgetAllOrders, IcancelOrder, IdeleteOrder } = require('../controllers/order');
const { isAdmin } = require('../middlewares/auth');

router.get('/', IgetOrders);
router.get('/:id', IgetOrderById);
router.put('/:id/cancel', IcancelOrder);
router.put('/:id', IupdateOrder);

//  admin operations
router.get('/all', isAdmin, IgetAllOrders);
router.get('/product/:id', isAdmin, IgetOrdersByProductId);
router.get('/status/:status', isAdmin, IgetOrdersByStatus);
router.delete('/:id', isAdmin, IdeleteOrder);

module.exports = router;