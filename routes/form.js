const express = require("express")
const router = express.Router()
const { isLogin, isOwner, isFormOwner } = require('../utils/middleware')
const { createForm, getForm, getOneForm, updateForm, deleteForm, regenerateApi } = require("../controllers/form")
const wrapAsync = require('../utils/wrapAsync')

router
    .route("/")
    .get(getForm)
    .post(isLogin, isOwner, wrapAsync(createForm))

router
    .route("/:form_id")
    .get(isLogin, isFormOwner, wrapAsync(getOneForm))
    .post(isLogin, isFormOwner, wrapAsync(updateForm))
    .delete(isLogin, isFormOwner, wrapAsync(deleteForm))

router.post("/:form_id/regenerateApi", isLogin, isFormOwner, wrapAsync(regenerateApi))

module.exports = router