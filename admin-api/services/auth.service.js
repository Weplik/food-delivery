const { User, Role } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

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

  delete user.dataValues.password;

  return res.json(user);
};

module.exports = {
  signIn,
};
