const crypto = require('crypto')

hmac = crypto.createHmac('sha512', '456845')

hmac.update('test123')

console.log(hmac.digest('hex'));
