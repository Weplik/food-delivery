const { User } = require('../models');
const RequestError = require('../helpers/requestError');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findByPk(username);

  if (!user) {
    throw new RequestError(404, 'Client not found');
  }

  const isCorrectPassword = await user.isCorrectPassword(password);

  if (!isCorrectPassword) {
    throw new RequestError(401, 'Wrong password');
  }

  return res.json(user);
};

module.exports = {
  login,
};
