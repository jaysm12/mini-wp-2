let jwt = require('jsonwebtoken')

module.exports = (payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5h'} )
  return token
}