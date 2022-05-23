const PartsService = require('./services/part');

const bindWebSocket = (socket) => {
    socket.on('parts', () => {
        console.log('parts')
    })
    socket.on('savePart', async (part) => {
        console.log('am primit ', part)
        const partsList = JSON.parse(JSON.stringify(await PartsService.findAll()));
        console.log({ partsList })
        socket.emit('partsListUpdate', partsList)
    })
}
module.exports = {
    bindWebSocket
}