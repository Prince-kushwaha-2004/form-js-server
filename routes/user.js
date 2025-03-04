const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/user');
const wrapAsync = require('../utils/wrapAsync')

router.post('/login', login);

router.post("/register", wrapAsync(register))

router.post("/logout", logout)

// router
//     .route("/signup")
//     .get(userController.renderSignupform)
//     .post(wrapAsync(userController.signup))

module.exports = router