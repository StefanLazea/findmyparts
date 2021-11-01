const User = require('../models').User;
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const createUser = (req, res) => {
    res.send({ message: "thanks" })
}

const getAllUsers = (req, res) => {
    return res.send({ message: 'Yolo' })
}
const googleAuth = async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    if (!ticket) {
        return res.send({ message: 'Failed to authenticate' })
    }
    const { name, email, picture } = ticket.getPayload();
    const user = await User.upsert({
        name: name, email: email, picture: picture, authType: true, updatedAt: Date.now(),
    })
    console.log(user);

    return res.send({ message: 'Success', token: token });
}

module.exports = { createUser, getAllUsers, googleAuth }