const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = data => usersRepo.create(data);

const update = (id, data) => usersRepo.update(id, data);

const remove = async id => {
  await taskRepo.clearUser(id);
  return usersRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
