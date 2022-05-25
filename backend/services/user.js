const Users = require('../models').User;
const Parts = require('../models').Part;

const findUserById = async (userId) => {
    console.log("bingo", userId)
    let userFound = await Users.findOne({
        where: { id: userId }
    });

    return userFound;
}

const findUserByEmail = async (email) => {
    console.log("bingo", email)
    let userFound = await Users.findOne({
        where: { email: email }
    })
    return userFound;
}

const findUserByPk = async (userId) => {
    const user = await Users.findByPk(userId)
    return user;
}

const findUserWithParts = async (userId) => {
    return await Users.findByPk(userId, {
        include: [{
            model: Parts,
            // through: { attributes: [] }
        }]
    });
}

module.exports = {
    findUserById,
    findUserByEmail,
    findUserByPk,
    findUserWithParts
}
