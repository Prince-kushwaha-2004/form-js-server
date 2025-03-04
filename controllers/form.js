const cryptoRandomString = require('crypto-random-string');

module.exports.createForm = (req, res) => {
    const { form_id, name, form } = req.body
    if (!(form_id && name && form)) {
        return res.status(400).send({ "error": "Data is unsufficient" })
    }
    let api_key = cryptoRandomString({ length: 15, type: 'alphanumeric' });
    res.send("post request on form")
}