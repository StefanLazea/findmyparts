const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const authorizeGoogle = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  //demo:
  //next();
  if (!token) {
    return res.status(401).send({ message: "Not authorized" });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    if (ticket) {
      next();
    }
  } catch (err) {
    return res.status(403).send({ message: "Forbidden", err: err });
  }
};

module.exports = {
  authorizeGoogle,
};
