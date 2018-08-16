import winston from 'winston';
require('winston-daily-rotate-file');
const level = process.env.LOG_LEVEL || 'debug';

const transportFile = new (winston.transports.DailyRotateFile)({
  filename: 'adviqo-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '3d',
  dirname: '../../logs' //In a real environment this value can be '/var/www/logs/'
});

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: level,
      timestamp: function () {
        return (new Date()).toISOString();
      }
    }),
    transportFile
  ]
});

module.exports = logger;