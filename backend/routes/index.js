const router = require('express').Router();
const partsRouter = require('./parts')
const usersRouter = require('./auth')

router.use('/parts', partsRouter)
router.use('/auth', usersRouter)
module.exports = router;