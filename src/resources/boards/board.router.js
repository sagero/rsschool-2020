const router = require('express').Router();
const boardService = require('./board.service');
const checkError = require('../../middleware/checkError');

router.route('/').get(
  checkError(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  checkError(async (req, res) => {
    const board = await boardService.getById(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).end();
    }
  })
);

router.route('/').post(
  checkError(async (req, res) => {
    const board = await boardService.create(req.body);
    res.json(board);
  })
);

router.route('/:id').put(
  checkError(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    if (board) {
      res.json(board);
    } else {
      res.status(404).end();
    }
  })
);

router.route('/:id').delete(
  checkError(async (req, res) => {
    const board = await boardService.remove(req.params.id);
    if (board) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
);

module.exports = router;
