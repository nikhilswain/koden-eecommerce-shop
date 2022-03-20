const router = require("express").Router();
const { IdeleteProduct, IgetProductById, IgetLatestProducts, IgetCategory, IgetProduct, IgetProductsByCategory, IpostProduct, IupdateProduct, IcheckoutProduct } = require("../controllers/product");
const { isAuthenticated, isManager } = require("../middlewares/auth");

router.get('/all', IgetProduct);
router.get('/category/', IgetCategory);
router.get('/latest', IgetLatestProducts);
router.get('/:id', IgetProductById);
router.get('/category/:category', IgetProductsByCategory);
router.post('/', isAuthenticated, isManager, IpostProduct);
router.delete('/:id', isAuthenticated, isManager, IdeleteProduct);
router.put('/:id', isAuthenticated, isManager, IupdateProduct);
router.post('/:id/checkout', isAuthenticated, IcheckoutProduct);

module.exports = router;
