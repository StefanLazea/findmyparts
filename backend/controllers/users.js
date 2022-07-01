const User = require("../models").User;
const UserServices = require("../services/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const _ = require("lodash");

const createUser = (req, res) => {
  res.send({ message: "thanks" });
};

const getAllUsers = (req, res) => {
  return res.send({ message: "Yolo" });
};

const googleAuth = async (req, res) => {
  const { token } = req.body;
  console.log({ token });
  if (!token || _.isEmpty(token)) {
    return res
      .status(400)
      .send({ message: "No token found. Please use another way to auth." });
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  if (!ticket) {
    return res.send({ message: "Failed to authenticate" });
  }

  const { name, email, picture } = ticket.getPayload();
  const userUpsert = await User.upsert({
    name: name,
    email: email,
    picture: picture,
    authType: true,
    updatedAt: Date.now(),
  });
  console.log({ userUpsert });
  let userId = JSON.parse(
    JSON.stringify(await UserServices.findUserByEmail(email))
  ).id;

  return res.send({
    message: "Success",
    token: token,
    user: { name, email, picture, id: userId },
  });
};

module.exports = { createUser, getAllUsers, googleAuth };
