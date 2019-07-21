const router = require('express').Router()
const ControllerArticle = require('../controllers/articles')
const authentication = require('../middlewares/authentication')
const _multer = require('multer')
const gcsMiddleware = require('../middlewares/storage')
const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
const authorization = require('../middlewares/authorization')
router.get('/', ControllerArticle.readAll)
router.use(authentication)
router.post('/',  multer.single('image'), gcsMiddleware.sendUploadToGCS, ControllerArticle.create) 
router.put('/:id', authorization,  multer.single('image'), gcsMiddleware.sendUploadToGCS, ControllerArticle.update) 
router.delete('/:id', authorization, ControllerArticle.delete) 
router.get('/find/:id', authorization, ControllerArticle.findArticle)
router.get('/user', ControllerArticle.getByUser)

module.exports = router