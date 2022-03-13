const router = require('express').Router();
const { IcreateAddress, IdeleteAddress, IupdateAddress, IgetAddressById, IgetAddressesByuser } = require('../controllers/address');

router.get('/', IgetAddressesByuser);
router.get('/:id', IgetAddressById);
router.post('/', IcreateAddress);
router.put('/:id', IupdateAddress);
router.delete('/:id', IdeleteAddress);

module.exports = router;