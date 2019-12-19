const { User, Role } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');
const tokenUtils = require('../utils/token.utils');

const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findByPk(username, {
    include: [
      {
        model: Role,
        as: 'role',
        attributes: {
          include: ['id', 'accessRights'],
        },
      },
    ],
    attributes: {
      exclude: ['roleId'],
    },
  });

  if (!user) {
    throw new RequestError(404, 'User not found');
  }

  const isCorrectPassword = await user.isCorrectPassword(password);

  if (!isCorrectPassword) {
    throw new RequestError(401, 'Wrong password');
  }

  const accessToken = tokenUtils.generateAccessToken(user.username);

  delete user.dataValues.password;

  return res.json({ user, accessToken });
};

const info = async (req, res) => {
  const { username } = req.user;

  const user = await User.findByPk(username, {
    include: [
      {
        model: Role,
        as: 'role',
        attributes: {
          include: ['id', 'accessRights'],
        },
      },
    ],
    attributes: {
      exclude: ['roleId', 'password'],
    },
  });

  return res.json(user);
};

module.exports = {
  signIn,
  info,
};
