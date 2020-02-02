const {
  Role,
  User,
  Sequelize: { Op },
} = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const getRoles = async (req, res) => {
  const { limit = 20, offset = 0, title } = req.query;
  const where = {};

  if (title) {
    where.title = {
      [Op.like]: `%${title}%`,
    };
  }

  const { rows: roles, count } = await Role.findAndCountAll({
    where,
    limit,
    offset,
  });

  return res.json({ roles, count });
};

const createRole = async (req, res) => {
  const role = req.body;

  const savedProduct = await Role.create(role);

  return res.json(savedProduct);
};

const updateRole = async (req, res) => {
  const role = req.body;
  const { id: roleId } = req.params;

  const existRole = await Role.findByPk(roleId);

  if (!existRole) {
    throw new RequestError(404, 'Role not found');
  }

  existRole.set('title', role.title);
  existRole.set('accessRights', role.accessRights);

  await existRole.save();

  return res.json(existRole);
};

const disableRole = async (req, res) => {
  const { id: roleId } = req.params;

  const existRole = await Role.findByPk(roleId);

  if (!existRole) {
    throw new RequestError(404, 'Role not found');
  }

  const users = await User.findAll({ where: { roleId } });

  if (users.length) {
    throw new RequestError(400, 'Role is busy');
  }

  existRole.set('enabled', false);

  await existRole.save();

  return res.json(existRole);
};

const enableRole = async (req, res) => {
  const { id: roleId } = req.params;

  const existRole = await Role.findByPk(roleId);

  if (!existRole) {
    throw new RequestError(404, 'Role not found');
  }

  existRole.set('enabled', true);

  await existRole.save();

  return res.json(existRole);
};

const getActiveRoles = async (req, res) => {
  const roles = await Role.findAll({
    where: { enabled: true },
  });

  return res.json(roles);
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  disableRole,
  enableRole,
  getActiveRoles,
};
