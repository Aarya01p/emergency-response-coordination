import winston from 'winston';

const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/ai-engine.log',
    }),
  ],
});

export class Logger {
  private module: string;

  constructor(module: string) {
    this.module = module;
  }

  info(message: string, data?: any) {
    logger.info(`[${this.module}] ${message}`, data);
  }

  error(message: string, error?: any) {
    logger.error(`[${this.module}] ${message}`, error);
  }

  warn(message: string, data?: any) {
    logger.warn(`[${this.module}] ${message}`, data);
  }

  debug(message: string, data?: any) {
    logger.debug(`[${this.module}] ${message}`, data);
  }
}
