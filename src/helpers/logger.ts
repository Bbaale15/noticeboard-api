import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logFile.log",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default logger;