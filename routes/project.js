const express = require("express")
const router = express.Router()
const { isLogin } = require('../utils/middleware')
const { createProject } = require('../controllers/project')


router
    .route("/")
    .post(isLogin, createProject)

module.exports = router