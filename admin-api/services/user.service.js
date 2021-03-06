const {
  User,
  Role,
  Sequelize: { Op },
} = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const getUsers = async (req, res) => {
  const {
    limit = 20,
    offset = 0,
    username,
    firstname,
    lastname,
    roleId,
  } = req.query;
  const where = {};

  if (username) {
    where.username = {
      [Op.like]: `%${username}%`,
    };
  }

  if (firstname) {
    where.firstname = {
      [Op.like]: `%${firstname}%`,
    };
  }

  if (lastname) {
    where.lastname = {
      [Op.like]: `%${lastname}%`,
    };
  }

  if (roleId) {
    where.roleId = roleId;
  }

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
    where,
    limit,
    offset,
  });

  return res.json({ users, count });
};

const createUser = async (req, res) => {
  const user = req.body;

  const { username } = await User.create({ ...user, roleId: user.role.id });

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

const updateUser = async (req, res) => {
  const user = req.body;
  const { username } = req.params;

  const existUser = await User.findByPk(username, {
    attributes: { exclude: ['password', 'roleId'] },
  });

  if (!existUser) {
    throw new RequestError(404, 'User not found');
  }

  const existRole = await Role.findByPk(user.role.id, {
    attributes: ['id', 'title', 'enabled'],
  });

  if (!existRole) {
    throw new RequestError(404, 'Role not found');
  }

  existUser.set('firstname', user.firstname);
  existUser.set('lastname', user.lastname);
  existUser.set('roleId', user.role.id);

  await existUser.save();

  delete existUser.dataValues.roleId;

  return res.json({ ...existUser.dataValues, role: existRole });
};

const disableUser = async (req, res) => {
  const { username } = req.params;

  const existUser = await User.findByPk(username, {
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
  });

  if (!existUser) {
    throw new RequestError(404, 'User not found');
  }

  existUser.set('enabled', false);

  await existUser.save();

  return res.json(existUser);
};

const enableUser = async (req, res) => {
  const { username } = req.params;

  const existUser = await User.findByPk(username, {
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
  });

  if (!existUser) {
    throw new RequestError(404, 'User not found');
  }

  existUser.set('enabled', true);

  await existUser.save();

  return res.json(existUser);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  disableUser,
  enableUser,
};
