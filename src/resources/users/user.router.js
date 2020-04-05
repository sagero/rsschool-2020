const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (user) res.json(User.toResponse(user));
  else res.status(404).end();
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  if (user) res.json(User.toResponse(user));
  else res.status(404).end();
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.remove(req.params.id);
  if (user) res.status(204).end();
  else res.status(404).end();
});

module.exports = router;
