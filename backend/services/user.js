const Users = require('../models').User;

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


module.exports = {
    findUserById,
    findUserByEmail
}
