const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const authorizeGoogle = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log({ token })
    if (!token) {
        return res.status(401).send({ message: 'Not authorized' });
    }
    client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    }, (err, login) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden', err: err })
        } else {
            next();
        }
    });

}
module.exports = {
    authorizeGoogle,
}