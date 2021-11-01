const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

// const secret = process.env.TOKEN_SECRET;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        (req, res, next) => {
            const token = req.headers.authorization;
            const cookie = req.cookies.token;
            if (!token && !cookie) {
                return res.status(401).send({ message: 'Not authorized' });
            }

            let trimmedToken;
            if (token) {
                trimmedToken = token.split(" ")[1];
            } else {
                trimmedToken = cookie;
            }

            const verified = jwt.verify(trimmedToken, secret,
                function (err, decoded) {
                    if (err) {
                        return res.status(403).send({ message: err });
                    } else {
                        req.user = decoded;
                        if (roles.length && !roles.includes(req.user.role)) {
                            return res.status(401).json({ message: 'You are not authorized in this area!' });
                        }
                        next();
                    }
                });
        }
    ];
}

const authorizeGoogle = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Not authorized' });
    }
    // const trimmedToken = token.split(" ")[1];
    client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    }, (err, login) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden' })
        } else {
            next();
        }
    });

}
module.exports = {
    authorizeGoogle,
}