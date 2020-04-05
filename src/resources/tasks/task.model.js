const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = '0',
    description = 'description',
    userId = null,
    boardId = '0',
    columnId = '0'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
module.exports = Task;
