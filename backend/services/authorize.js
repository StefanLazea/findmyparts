const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const authorizeGoogle = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log({ token });
  if (!token) {
    return res.status(401).send({ message: "Not authorized" });
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  console.log(ticket);
  // client.verifyIdToken({
  //     idToken: token,
  //     audience: process.env.CLIENT_ID
  // }, (err, login) => {
  //     if (err) {
  //         return res.status(403).send({ message: 'Forbidden', err: err })
  //     } else {
  //         next();
  //     }
  // });
};
// const { token } = req.body;
//   console.log({ token });
//   if (!token || _.isEmpty(token)) {
//     return res
//       .status(400)
//       .send({ message: "No token found. Please use another way to auth." });
//   }

//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });

//   if (!ticket) {
//     return res.send({ message: "Failed to authenticate" });
//   }
module.exports = {
  authorizeGoogle,
};
