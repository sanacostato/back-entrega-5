const { Router } = require('express');
const router = Router();
const chkToken = require('../middlewares/auth.middleware');
const {
usersGet,
usersPost,
usersPut,
usersDelete,
usersGetProfile
} = require('../controllers/User.controller');

router.get('/users', chkToken ,usersGet);

router.post('/users', usersPost);

router.put('/users/:id', chkToken , usersPut);

router.delete('/users/:id', chkToken, usersDelete);

router.get('/users/profile', chkToken, usersGetProfile);

module.exports = router;