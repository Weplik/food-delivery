const { Role, User } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const getRoles = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: roles, count } = await Role.findAndCountAll({ limit, offset });

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

  existRole.set('isEnabled', false);

  await existRole.save();

  return res.json(existRole);
};

const enableRole = async (req, res) => {
  const { id: roleId } = req.params;

  const existRole = await Role.findByPk(roleId);

  if (!existRole) {
    throw new RequestError(404, 'Role not found');
  }

  existRole.set('isEnabled', true);

  await existRole.save();

  return res.json(existRole);
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  disableRole,
  enableRole,
};
