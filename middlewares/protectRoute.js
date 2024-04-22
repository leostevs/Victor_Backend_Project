const User = require('../models/user');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { badResponse } = require('../utils/response');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return badResponse(
        res,
        'You are not logged in, Please login to get Access'
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return badResponse(
        res,
        'The user belonging to this token does not exist'
      );
    req.user = currentUser;
    next();
  } catch (error) {
    badResponse(res, 'Route protected');
  }
};
