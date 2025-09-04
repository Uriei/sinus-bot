/* eslint-disable no-fallthrough */
import { format } from "date-fns";
export type LOG_LEVEL = "ERROR" | "WARN" | "INFO" | "DEBUG";

export class Log {
  private static readonly TIMESTAMP_FORMAT = "yyyy-MM-dd_HH:mm:ss.SSSS";
  private static getTimeStamp() {
    return format(new Date(), Log.TIMESTAMP_FORMAT);
  }

  private static checkLogLevel(logLevel: LOG_LEVEL) {
    const LOG_LEVELS_TO_DISABLE: LOG_LEVEL[] = [];
    switch (process.env.LOG_LEVEL || "INFO") {
      case "ERROR":
        LOG_LEVELS_TO_DISABLE.push("WARN");
      case "WARN":
        LOG_LEVELS_TO_DISABLE.push("INFO");
      case "INFO":
        LOG_LEVELS_TO_DISABLE.push("DEBUG");
      case "DEBUG":
      default:
        break;
    }
    return LOG_LEVELS_TO_DISABLE.includes(logLevel);
  }

  public static log(...msg: any[]) {
    if (Log.checkLogLevel("INFO")) {
      return;
    }
    console.log(`${Log.getTimeStamp()}-INFO : `, ...msg);
  }
  public static error(...msg: any[]) {
    if (Log.checkLogLevel("ERROR")) {
      return;
    }
    try {
      const cleanMsg: Array<string> = [];
      for (const element of msg) {
        const elementString: string = element.toString();
        const elementEnd = elementString.indexOf("{") > 32 ? elementString.indexOf("{") : null;
        const newMsg = elementString.substring(0, elementEnd).trim();
        cleanMsg.push(newMsg);
      }
      console.error(`${Log.getTimeStamp()}-ERROR: `, ...cleanMsg);
    } catch (error) {
      console.error(`${Log.getTimeStamp()}-ERROR-CATCH: `, ...msg, error);
    }
  }

  public static debug(...msg: any[]) {
    if (Log.checkLogLevel("DEBUG")) {
      return;
    }
    console.debug(`${Log.getTimeStamp()}-DEBUG: `, ...msg);
  }

  public static warning(...msg: any[]) {
    if (Log.checkLogLevel("WARN")) {
      return;
    }
    console.warn(`${Log.getTimeStamp()}-WARN : `, ...msg);
  }
}
