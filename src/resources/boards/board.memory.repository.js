const Board = require('./board.model');

const mockData = [
  {
    id: '1111',
    title: 'title 1',
    columns: [{ id: 'columns-1', title: 'title 1', order: '0' }]
  },
  {
    id: '2222',
    title: 'title 1',
    columns: [{ id: 'columns-2', title: 'title 2', order: '0' }]
  }
];

const getAll = async () => mockData;

const getById = async id => mockData.find(board => board.id === id);

const create = async data => {
  const obj = new Board(data);
  mockData.push(obj);
  return obj;
};

const update = async (id, data) => {
  const obj = await getById(id);
  if (obj) {
    Object.assign(obj, data);

    return obj;
  }
  return false;
};

const remove = async id => {
  const index = mockData.findIndex(board => board.id === id);
  if (index !== -1) {
    mockData.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getById, create, update, remove };
