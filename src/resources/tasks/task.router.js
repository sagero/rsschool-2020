const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params);
  if (tasks.length) res.json(tasks);
  else res.status(404).end();
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.getById(req.params);
  if (task) res.json(task);
  else res.status(404).end();
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(req.params, req.body);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await taskService.update(req.params, req.body);
  if (task) res.json(task);
  else res.status(404).end();
});

router.route('/:id').delete(async (req, res) => {
  const task = await taskService.remove(req.params);
  if (task) res.status(204).end();
  else res.status(404).end();
});

module.exports = router;
