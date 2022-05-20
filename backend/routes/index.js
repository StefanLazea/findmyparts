const router = require('express').Router();
const partsRouter = require('./parts');
const usersRouter = require('./auth');
const carsRouter = require('./cars');
const googleRouter = require('./google')
const documentsRouter = require('./documents')
const stocksRouter = require('./stocks')
const io = require('socket.io')();

const { authorizeGoogle } = require('../services/authorize')

router.use('/parts', partsRouter);
router.use('/cars', carsRouter);

router.use('/auth', usersRouter);
router.use('/google', googleRouter);
router.use('/documents', documentsRouter);

router.use('/stocks', stocksRouter);

router.get('/test', authorizeGoogle, (req, res) => {
    res.send({ message: "hello" })
})

io.on('connection', function (socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

module.exports = router;