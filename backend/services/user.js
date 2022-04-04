const Users = require('../models').Part;

const findUserById = async (userId) => {
    console.log("bingo", userId)
    let userFound;
    await Users.findOne({
        where: { id: userId }
    }).then((user) => userFound = user);

    return userFound;
}


module.exports = {
    findUserById,

}
