import winston from 'winston';
const { combine, timestamp, colorize, label, prettyPrint, simple } =
  winston.format;
const CATEGORY = 'winston custom format';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    prettyPrint(),
    label({ label: CATEGORY }),
  ),
  transports: [
    new winston.transports.Console({
      format: combine(timestamp(), colorize(), simple()),
    }),
    new winston.transports.File({
      filename: 'logs/tests.log',
    }),
  ],
});

export default logger;
