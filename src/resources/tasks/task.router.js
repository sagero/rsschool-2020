const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const checkError = require('../../middleware/checkError');
const Task = require('./task.model');

router.route('/').get(
  checkError(async (req, res) => {
    const tasks = await taskService.getAll(req.params);
    res.status(200).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  checkError(async (req, res) => {
    const task = await taskService.getById(req.params);
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).end();
    }
  })
);

router.route('/').post(
  checkError(async (req, res) => {
    const task = await taskService.create(req.params, req.body);
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  checkError(async (req, res) => {
    const task = await taskService.update(req.params, req.body);
    if (task) {
      res.json(Task.toResponse({ task }));
    } else {
      res.status(404).end();
    }
  })
);

router.route('/:id').delete(
  checkError(async (req, res) => {
    const task = await taskService.remove(req.params);
    if (task.deletedCount) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
);

module.exports = router;
