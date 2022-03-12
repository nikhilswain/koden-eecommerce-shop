const router = require('express').Router();
const { IaddToCart, Icheckout, IgetCart, IremoveFromCart, IresetCart } = require('../controllers/cart');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', isAuthenticated, IgetCart);
router.post('/add', isAuthenticated, IaddToCart);
router.post('/remove', isAuthenticated, IremoveFromCart);
router.post('/checkout', isAuthenticated, Icheckout);
router.post('/reset', isAuthenticated, IresetCart);

module.exports = router;