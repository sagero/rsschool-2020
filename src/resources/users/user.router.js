const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const checkError = require('../../middleware/checkError');
const bcrypt = require('bcrypt');

router.route('/').get(
  checkError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  checkError(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).end();
    }
  })
);

router.route('/').post(
  checkError(async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(async hash => {
      const user = await usersService.create({ ...req.body, password: hash });
      return res.json(User.toResponse(user));
    });
  })
);

router.route('/:id').put(
  checkError(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).end();
    }
  })
);

router.route('/:id').delete(
  checkError(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    if (user.deletedCount) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
);

module.exports = router;
