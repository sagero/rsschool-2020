const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: './log.txt' }),
    new winston.transports.Console()
  ]
});

const requests = (req, res, next) => {
  const { url, params, body } = req;
  logger.log({
    level: 'info',
    date: new Date(),
    url,
    params,
    body
  });
  next();
};

const error = async message => {
  await logger.log({
    level: 'error',
    date: new Date(),
    message
  });
};

module.exports = { requests, error };
