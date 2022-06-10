const router = require('express').Router();
const { IcreateAddress, IdeleteAddress, IupdateAddress, IgetAddressById, IgetAddressesByuser } = require('../controllers/address');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', isAuthenticated, IgetAddressesByuser);
router.get('/:id', isAuthenticated, IgetAddressById);
router.post('/', isAuthenticated, IcreateAddress);
router.put('/:id', isAuthenticated, IupdateAddress);
router.delete('/:id', isAuthenticated, IdeleteAddress);

module.exports = router;