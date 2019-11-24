const { Role } = require('../models');

const getRoles = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: roles, count } = await Role.findAndCountAll({ limit, offset });

  return res.json({ roles, count });
};

module.exports = {
  getRoles,
};
