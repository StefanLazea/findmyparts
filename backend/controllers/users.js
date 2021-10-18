const User = require('../models').User;

const createUser = (req, res) => {
    res.send({ message: "thanks" })
}

const getAllUsers = (req, res) => {
    return res.send({ message: 'Yolo' })
}

module.exports = { createUser, getAllUsers }