const router = require('express').Router();
const googleController = require('../controllers/google');

router.post('/detect-image', googleController.detectImage)


module.exports = router;