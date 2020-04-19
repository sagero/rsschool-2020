const Task = require('./task.model');

const getAll = async params => {
  return Task.find({ boardId: params.boardId });
};

const getById = async params => {
  return Task.findOne({ _id: params.id, boardId: params.boardId });
};

const create = async (params, data) => {
  return Task.create({ ...data, boardId: params.boardId });
};

const update = async (params, data) => {
  return Task.updateOne({ _id: params.id }, data);
};

const remove = async id => {
  return Task.deleteOne({ _id: id });
};

const clearUser = async id => {
  return Task.updateMany({ userId: id }, { userId: null });
};

module.exports = { getAll, getById, create, update, remove, clearUser };
