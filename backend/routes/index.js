const router = require('express').Router();
const partsRouter = require('./parts')
const usersRouter = require('./auth')

router.use('/parts', partsRouter)
router.use('/users', usersRouter)
module.exports = router;