const { User, Role } = require('../models');

const getUsers = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: users, count } = await User.findAndCountAll({
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'title', 'enabled'],
      },
    ],
    attributes: {
      exclude: ['password', 'roleId'],
    },
    limit,
    offset,
  });

  return res.json({ users, count });
};

const createUser = async (req, res) => {
  const user = req.body;

  const { username } = await User.create(user);

  const createdUser = await User.findByPk(username, {
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'title', 'enabled'],
      },
    ],
    attributes: { exclude: ['roleId'] },
  });

  return res.json(createdUser);
};

module.exports = {
  getUsers,
  createUser,
};
