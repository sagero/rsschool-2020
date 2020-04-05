const Task = require('./task.model');

const mockData = [
  {
    id: '01',
    title: 'title 1',
    order: '0',
    description: 'desc 1',
    userId: '1',
    boardId: '1111',
    columnId: 'columns-1'
  },
  {
    id: '02',
    title: 'title 1',
    order: '0',
    description: 'desc 1',
    userId: '1',
    boardId: '2222',
    columnId: 'columns-2'
  }
];

const getAll = async params =>
  mockData.filter(task => task.boardId === params.boardId);

const getById = async params =>
  mockData.find(
    task => task.id === params.id && task.boardId === params.boardId
  );

const create = async (params, data) => {
  const obj = new Task(data);
  obj.boardId = params.boardId;
  mockData.push(obj);
  return obj;
};

const update = async (params, data) => {
  const obj = await getById(params);
  if (obj) {
    Object.assign(obj, data);
    return obj;
  }
  return false;
};

const remove = async id => {
  const index = mockData.findIndex(task => task.id === id);
  if (index !== -1) {
    mockData.splice(index, 1);
    return true;
  }
  return false;
};

const clearUser = async id => {
  const tasks = mockData.filter(task => task.userId === id);
  tasks.map(task => Object.assign(task, { userId: null }));
};

module.exports = { getAll, getById, create, update, remove, clearUser };
