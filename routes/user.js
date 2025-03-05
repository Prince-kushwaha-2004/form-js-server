const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/user');
const wrapAsync = require('../utils/wrapAsync')

router.post('/login', wrapAsync(login));

router.post("/register", wrapAsync(register))

router.post("/logout", logout)

module.exports = router