const jwt = require('jsonwebtoken');

exports.createJWTToken = (id) => {
    return jwt.sign({ id }, 'I love ALT_SCHOOl', {
        expiresIn: 7
    })
}