const router = require("express").Router();
const { IdeleteProduct, IgetProductById, IgetProduct, IgetProductsByCategory, IpostProduct, IupdateProduct } = require("../controllers/product");
const { isAuthenticated, isManager } = require("../middlewares/auth");

router.get('/all', IgetProduct);

router.get('/:id', IgetProductById);

router.get('/category/:category', IgetProductsByCategory);

router.post('/', isAuthenticated, isManager, IpostProduct);

router.delete('/:id', isAuthenticated, isManager, IdeleteProduct);

router.put('/:id', isAuthenticated, isManager, IupdateProduct);

module.exports = router;
