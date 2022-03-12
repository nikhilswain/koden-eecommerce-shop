const router = require("express").Router()
const { IgetUser: getMe, IgetUserById: getByParam, IdeleteUser: deleteMe } = require('../controllers/user');
const { isAuthenticated, isInternal } = require('../middlewares/auth');

router.get('/', isAuthenticated, getMe);
router.get('/:id', isAuthenticated, isInternal, getByParam);
router.delete('/', isAuthenticated, deleteMe);

module.exports = router;