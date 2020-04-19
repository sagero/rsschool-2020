const boardsRepo = require('./board.db.repository');
const taskRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = data => boardsRepo.create(data);

const update = (id, data) => boardsRepo.update(id, data);

const remove = async id => {
  await taskRepo.removeByBoardId(id);
  return boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
