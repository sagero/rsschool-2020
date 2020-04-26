const router = require('express').Router();
const User = require('../users/user.model');
const usersService = require('../users/user.service');
const checkError = require('../../middleware/checkError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

router.route('/').post(
  checkError(async (req, res) => {
    const user = await usersService.getByLogin(req.body.login);
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (result) {
          const payload = { userId: user.id, login: user.login };
          const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 });
          res.send({ token });
        } else {
          res.send({ success: false, message: 'Bad username/password' });
        }
      });
    } else {
      res.status(403).send({ success: false, message: 'Forbidden' });
    }
  })
);

module.exports = router;
