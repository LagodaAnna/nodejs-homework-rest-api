const { User } = require('../../models/user');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, subscription, password: hashPassword });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = registerUser;
