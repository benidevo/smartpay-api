const winston = require("winston");
require("dotenv").config();

const { combine, timestamp, label, printf, cli, colorize, align, json } =
  winston.format;

const transports =
  process.env.NODE_ENV === "DEV"
    ? new winston.transports.Console()
    : new winston.transports.File({
        filename: "logs/error.log",
        level: "warn",
      });

const appLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "Application" },
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json(),
    align(),
    printf(
      (info) =>
        `${[info.timestamp]} ${info.level}: ${info.service} ${info.message}`
    )
  ),
  transports: [transports],
});

const usersLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "Users" },
  format: combine(
    json(),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    align(),

    printf(
      (info) =>
        `${[info.timestamp]} ${info.level}: ${info.service} ${info.message}`
    )
  ),
  transports: [transports],
});

const billsLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "Bills" },
  format: combine(
    json(),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    align(),
    printf(
      (info) =>
        `${[info.timestamp]} ${info.level}: ${info.service} ${info.message}`
    )
  ),
  transports: [transports],
});

const validationLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "Validator" },
  format: combine(
    json(),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    align(),
    printf(
      (info) =>
        `${[info.timestamp]} ${info.level}: ${info.service} ${info.message}`
    )
  ),
  transports: [transports],
});

const productsLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "Products" },
  format: combine(
    json(),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    align(),
    printf(
      (info) =>
        `${[info.timestamp]} ${info.level}: ${info.service} ${info.message}`
    )
  ),
  transports: [transports],
});

module.exports = {
  appLogger,
  usersLogger,
  billsLogger,
  validationLogger,
  productsLogger,
};
