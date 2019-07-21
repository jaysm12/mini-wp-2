const User = require('../models/users')
const comparePassword = require('../helpers/comparePassword')
const getToken = require('../helpers/getToken')
const getPassword = require('../helpers/getPassword')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class ControllerUser {

  static findAll(req, res, next) {
    User.find()
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    const { email, password, username } = req.body
    const input = { email, password, username }
    if(req.file && req.file.gcsUrl) {
      input.image = req.file.gcsUrl
      User.create(input)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    } else {
      next({status: 500, message: 'unable to upload'})
    }
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const input = { email, password }
    User.findOne({email: input.email})
    .then(user => {
      if(user){
        let check = comparePassword(user.password, input.password)
        if(check) {
          let payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
            image: user.image
          }
          
          let token = getToken(payload)
          res.json({token, payload})
        } else {
          
          throw {status: 400, message: 'Wrong email / password'}
        }
      } else {
        
        throw {status: 400, message: 'Wrong email / password'}
      }
    })
    .catch(next)
  }

  static updateProfile (req, res, next) {
    const { email, username } = req.body
    User.findById(req.user._id)
    .then(user => {
      user.email = email
      user.username = username
      if(req.file && req.file.gcsUrl) {
        user.image = req.file.gcsUrl
      }
      if(req.body.password != '') {
        user.password = req.body.password
      }
      return user.save()
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static googleSignIn(req, res, next) {
    let payload = null
    let newPass = null
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then((ticket) => {
      payload = ticket.getPayload();
      return User.findOne({ email: payload.email })
    })
    .then((user) => {
      if (!user) {
        newPass = getPassword(payload.email)
        return User.create({
          username: payload.name,
          email: payload.email,
          image: payload.picture,
          password: newPass
        })
      } else {
        return user
      }
    })
    .then(user => {
      let payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
        image: user.image
      }
      
      let token = getToken(payload)
      res.json({token, payload})
    })
    .catch(next)
  }

}

module.exports = ControllerUser