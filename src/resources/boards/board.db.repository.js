const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findById({ _id: id });
};

const create = async data => {
  return Board.create(data);
};

const update = async (id, data) => {
  return Board.updateOne({ _id: id }, data);
};

const remove = async id => {
  return Board.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, update, remove };
