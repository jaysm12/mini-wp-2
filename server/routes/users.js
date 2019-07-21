const router = require('express').Router()
const ControllerUser = require('../controllers/users')
const _multer = require('multer')
const gcsMiddleware = require('../middlewares/storage')
const gcsUpdate = require('../middlewares/gcsUpdate')
const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
const authentication = require('../middlewares/authentication')
const authorizeUser = require('../middlewares/authorizeUser')
// /api/users
router.get('/', ControllerUser.findAll)
router.post('/google-sign-in', ControllerUser.googleSignIn)
router.post('/register', multer.single('image'), gcsMiddleware.sendUploadToGCS, ControllerUser.create)
router.post('/login', ControllerUser.login)
router.put('/update/:userId', authentication, authorizeUser, multer.single('image'), gcsUpdate.sendUploadToGCS, ControllerUser.updateProfile)


module.exports = router