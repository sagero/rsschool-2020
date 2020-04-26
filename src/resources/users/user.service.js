const usersRepo = require('./user.db.repository');
const taskRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const getByLogin = login => usersRepo.getByLogin(login);

const create = data => usersRepo.create(data);

const update = (id, data) => usersRepo.update(id, data);

const remove = async id => {
  await taskRepo.clearUser(id);
  return usersRepo.remove(id);
};

module.exports = { getAll, getById, getByLogin, create, update, remove };
