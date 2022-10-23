const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { Unauthorized } = require('http-errors');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized();
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;

    if (!user || user.token !== token) {
      throw new Unauthorized();
    }
   
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Unauthorized';
    }
    next(error);
  }
};

module.exports = auth;
