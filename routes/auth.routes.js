const { Router } = require('express');
const router = Router();
const {
    login
} = require('../controllers/Auth.controller');

router.post('/Auth/login', login);

module.exports = router;