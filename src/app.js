const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./middleware/logger');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('*', logger.requests);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  logger.error(`App error: ${err.message}`);
  res.status(500).send('Sorry. Something went wrong!');
  next();
});

process.on('unhandledRejection', message => {
  logger.error(`Unhandled Rejection : ${message}`);
});

process.on('uncaughtException', err => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// UNCOMMENT FOR TESTS
// Promise.reject(Error('Oops - promise!'));
// throw Error('Oops - error!');

module.exports = app;
