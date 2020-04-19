const boardsRepo = require('./board.db.repository');
const taskRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = data => boardsRepo.create(data);

const update = (id, data) => boardsRepo.update(id, data);

const remove = async id => {
  const tasks = await taskRepo.getAll({ boardId: id });
  await Promise.all([
    tasks.map(task => {
      return taskRepo.remove(task.id);
    })
  ]);
  return boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
