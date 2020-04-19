const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
};

const create = async data => {
  return User.create(data);
};

const update = async (id, data) => {
  return User.updateOne({ _id: id }, data);
};

const remove = async id => {
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, update, remove };
