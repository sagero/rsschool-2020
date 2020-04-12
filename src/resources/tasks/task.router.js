const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const checkError = require('../../middleware/checkError');

router.route('/').get(
  checkError(async (req, res) => {
    const tasks = await taskService.getAll(req.params);
    res.json(tasks);
  })
);

router.route('/:id').get(
  checkError(async (req, res) => {
    const task = await taskService.getById(req.params);
    if (task) {
      res.json(task);
    } else {
      res.status(404).end();
    }
  })
);

router.route('/').post(
  checkError(async (req, res) => {
    const task = await taskService.create(req.params, req.body);
    res.json(task);
  })
);

router.route('/:id').put(
  checkError(async (req, res) => {
    const task = await taskService.update(req.params, req.body);
    if (task) {
      res.json(task);
    } else {
      res.status(404).end();
    }
  })
);

router.route('/:id').delete(
  checkError(async (req, res) => {
    const task = await taskService.remove(req.params);
    if (task) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
);

module.exports = router;
