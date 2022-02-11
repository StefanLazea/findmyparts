const router = require('express').Router();
const partsRouter = require('./parts');
const usersRouter = require('./auth');
const googleRouter = require('./google')


router.use('/parts', partsRouter);
router.use('/auth', usersRouter);
router.use('/google', googleRouter);

module.exports = router;