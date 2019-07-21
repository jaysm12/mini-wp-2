const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title : String,
  description: String,
  content: String,
  image: String,
  tags: [{type: String}]
}, {timestamps: true})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article