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
    console.log({ client })
    console.log({ req });
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();
    console.log({ payload: ticket.getPayload() })
    // const user = await db.user.upsert({
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })
    // console.log(user);
    // res.status(201)
    // res.json(user)
    return res.send({ message: 'Success' })
}

module.exports = { createUser, getAllUsers, googleAuth }