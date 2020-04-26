const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = checkToken = (req, res, next) => {
  const tokenAuth = req.header('Authorization');
  if (tokenAuth) {
    const token = tokenAuth.replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        res
          .status(401)
          .json({ success: false, message: 'Failed to authenticate token' });
      } else {
        next();
      }
    });
  } else
    res
      .status(401)
      .json({ success: false, message: 'Failed to authenticate token' });
};
