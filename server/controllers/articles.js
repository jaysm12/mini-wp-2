const Article = require('../models/articles')

class ControllerArticle {

  static readAll(req, res, next) {
    Article.find().populate('user')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {title, description, content, tags} = req.body
    console.log(tags)
    let input = {title, description, content, tags}
    input.tags = input.tags.split(',')
    if(req.file && req.file.gcsUrl) {
      input.user = req.user._id
      input.image = req.file.gcsUrl
      Article.create(input)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    } else {
      next({status: 500, message: 'unable to upload'})
    }
  }

  static findArticle(req, res, next) {
    Article.findById(req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let {title, description, content, tags} = req.body
    
    Article.findById(req.params.id)
    .then(article => {
      article.title = title
      article.description = description
      article.content = content
      article.tags = tags
      if(req.file && req.file.gcsUrl) {
        article.image = req.file.gcsUrl
      }
      return article.save()
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static delete (req, res, next) {
    Article.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static getByUser(req, res, next) {
    Article.find({user : req.user._id}).populate('user', 'username')
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerArticle