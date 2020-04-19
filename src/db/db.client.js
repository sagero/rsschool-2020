const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const User = require('../resources/users/user.model');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const u = new User({ name: 'sd', login: 'asd', password: 'asdsa' });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connection success');
    db.dropDatabase();
    u.save();

    cb();
  });
};

module.exports = { connectToDB };
