const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [
      {
        _id: {
          type: String,
          default: uuid
        },
        title: String,
        order: Number
      }
    ]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
