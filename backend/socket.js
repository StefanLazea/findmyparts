const bindWebSocket = (socket) => {
    socket.on('parts', () => {
        console.log('parts')
    })
    socket.on('savePart', (part) => {
        console.log('am primit ', part)
        socket.emit('newPartInStock', part)
    })
}
module.exports = {
    bindWebSocket
}