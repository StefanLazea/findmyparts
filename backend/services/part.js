const Parts = require('../models').Part;
const sequelize = require('../models/db')

const findAll = async () => {
    return await Parts.findAll();
}
const findAllQuery = async () => {
    const query = "select \
        parts.id,\
        parts.name, \
        parts.code, \
        users.id as 'stocks.userId', \
        users.email as 'stocks.email',\
        stocks.quantity as 'stocks.quantity',\
        stocks.price as 'stocks.price',\
        stocks.id as 'stocks.id'\
        from stocks \
            LEFT JOIN parts\
                on parts.id = stocks.partId\
            LEFT JOIN users\
                on users.id = stocks.userId\
        where parts.id = stocks.partId and users.id = stocks.userId \
        "
    const result = await sequelize.query(query,
        {
            type: sequelize.QueryTypes.SELECT,
            nest: true,
            // plain: true, //gives unique value
            raw: true
        }
    );
    const jsonResult = JSON.parse(JSON.stringify(result))
    const filteredResult = []
    jsonResult.forEach(item => {
        const foundIndex = filteredResult.findIndex(result => result.id === item.id)
        if (foundIndex !== -1) {
            const itemFound = filteredResult[foundIndex]
            itemFound.stocks.push(item.stocks)
            const total = itemFound.stocks.reduce((acc, current) => acc + current.quantity, 0)
            itemFound.total = total;
        } else {
            filteredResult.push({ ...item, stocks: [{ ...item.stocks }], total: item.stocks.quantity })
        }
    })
    return filteredResult;
}


const findPartByCode = async (code) => {
    let partFound;
    await Parts.findOne({
        where: {
            code: code
        }
    }).then((part) => partFound = part);

    return partFound;
}

const findPartById = async (partId) => {
    let partFound;
    await Parts.findOne({
        where: { id: partId }
    }).then((part) => partFound = part);

    return partFound;
}

const findUserPartById = async ({ user, partId } = {}) => {
    return await user.getParts({
        where: { id: partId }
    });
}

const updatePart = async (partId, part) => {
    return await Parts.update(part, { where: { id: partId } })
}
module.exports = {
    findPartByCode,
    findPartById,
    findUserPartById,
    findAll,
    findAllQuery,
    updatePart
}
