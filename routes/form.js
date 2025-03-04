const express = require("express")
const router = express.Router()


router
    .route("/")
    .get((req, res) => {
        res.send("get request on form")
    })
    .post((req, res) => {
        res.send("post request on form")
    })

module.exports = router