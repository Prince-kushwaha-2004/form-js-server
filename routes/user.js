const express = require('express')
const router = express.Router()
const { register, login, logout, authenticate } = require('../controllers/user');
const { isLogin } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync')

router
    .route("/login")
    .get(isLogin, authenticate)
    .post(wrapAsync(login));

router.post("/register", wrapAsync(register))

router.post("/logout", logout)

module.exports = router