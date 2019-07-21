const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const usersSchema = new Schema({
  email: {
    type: String,
    validate: [{
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },{
      validator: function(value) {
        return new Promise ((resolve, reject) => {
          if(this.isNew) {
            User.findOne({email: value})
            .then (member => {
              if (member){
                resolve (false)
              } else {
                resolve (true)
              }
            })
            .catch(err => {
              reject (err)
            })
          } else {
            resolve(true)
          }
        })
      },
      message: props => `${props.value} is already used!`
    }, {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }]
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Password too short!']
  },
  username: {
    type: String,
    required: true,
    maxlength: [15, 'Username must be less than 15 characters!']
  },
  image: String
});

usersSchema.pre('save', function(next) {
  if(!this.isModified('password')){
    return next();
  } else {
    this.password = hashPassword(this.password)
    next();
  }
})



const User = mongoose.model('User', usersSchema)
module.exports = User