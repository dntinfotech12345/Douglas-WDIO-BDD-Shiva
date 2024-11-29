import { createLogger, format, transports } from "winston";
import path from "path";

const timestamp = new Date().toISOString().replace(/:/g, "-").replace("T", "_").replace("Z", "");

const logFileName = path.join("./logs", `TestLogs-${timestamp}.log`);

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFileName }),
  ],
});

export default logger;
