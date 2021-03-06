const User = require('../users/user.model');

const mockData = [
  {
    id: '1',
    name: 'user 1',
    login: 'login 1',
    password: 'pass1'
  },
  {
    id: '2222-2131-2324',
    name: 'user 2',
    login: 'login 2',
    password: 'pass2'
  },
  {
    id: '3333-2131-2324',
    name: 'user 3',
    login: 'login 3',
    password: 'pass3'
  }
];

const getAll = async () => mockData;

const getById = async id => mockData.find(user => user.id === id);

const create = async data => {
  const obj = new User(data);
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
  const index = mockData.findIndex(user => user.id === id);
  if (index !== -1) {
    mockData.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getById, create, update, remove };
