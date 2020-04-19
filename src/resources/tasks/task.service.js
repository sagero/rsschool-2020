const tasksRepo = require('./task.db.repository');

const getAll = params => tasksRepo.getAll(params);

const getById = params => tasksRepo.getById(params);

const create = (params, data) => tasksRepo.create(params, data);

const update = (params, data) => tasksRepo.update(params, data);

const remove = params => tasksRepo.remove(params.id);

module.exports = { getAll, getById, create, update, remove };
