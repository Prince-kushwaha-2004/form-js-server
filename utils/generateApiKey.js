const Crypto = require("crypto")
module.exports.generateApiKey = (size = 20) => {
    return Crypto
        .randomBytes(size)
        .toString('hex')
        .slice(0, size)
}