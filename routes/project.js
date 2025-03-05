const express = require("express")
const router = express.Router()
const { isLogin, isOwner } = require('../utils/middleware')
const { createProject, getProject, getOneProject, updateProject, deleteProject } = require('../controllers/project')
const wrapAsync = require('../utils/wrapAsync')


router
    .route("/")
    .get(isLogin, wrapAsync(getProject))
    .post(isLogin, wrapAsync(createProject))

router
    .route("/:project_id")
    .get(isLogin, isOwner, wrapAsync(getOneProject))
    .post(isLogin, isOwner, wrapAsync(updateProject))
    .delete(isLogin, isOwner, wrapAsync(deleteProject))

module.exports = router