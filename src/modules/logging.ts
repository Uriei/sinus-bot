/* eslint-disable no-fallthrough */
import { format } from "date-fns";
export type LOG_LEVEL = "ERROR" | "WARN" | "INFO" | "DEBUG";

export class Log {
  private static readonly TIMESTAMP_FORMAT = "yyyy-MM-dd_HH:mm:ss.SSSS";
  private static padding: Array<number> = [];

  private static getPaddedString(msg: string, index: number) {
    let padding = this.padding[index] || 0;
    msg = ` ${msg} `;
    padding = msg.toString().length > padding ? msg.toString().length : padding;
    this.padding[index] = padding;
    return msg.padEnd(padding);
  }

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
    let message = "|";
    message += `${Log.getPaddedString(Log.getTimeStamp(), 0)}|`;
    message += Log.getPaddedString(`INFO`, 1) + "|";
    for (let i = 0, j = 2; i < msg.length; i++, j++) {
      const m = msg[i];
      message += `${Log.getPaddedString(m.toString(), j)}|`;
    }
    console.log(message);
  }
  public static error(...msg: any[]) {
    if (Log.checkLogLevel("ERROR")) {
      return;
    }
    let message = "|";
    message += `${Log.getPaddedString(Log.getTimeStamp(), 0)}|`;
    message += Log.getPaddedString(`ERROR`, 1) + "|";
    for (let i = 0, j = 2; i < msg.length; i++, j++) {
      const m = msg[i];
      message += `${Log.getPaddedString(m.toString(), j)}|`;
    }
    console.log(message);
  }

  public static debug(...msg: any[]) {
    if (Log.checkLogLevel("DEBUG")) {
      return;
    }
    let message = "|";
    message += `${Log.getPaddedString(Log.getTimeStamp(), 0)}|`;
    message += Log.getPaddedString(`DEBUG`, 1) + "|";
    for (let i = 0, j = 2; i < msg.length; i++, j++) {
      const m = msg[i];
      message += `${Log.getPaddedString(m.toString(), j)}|`;
    }
    console.log(message);
  }

  public static warning(...msg: any[]) {
    if (Log.checkLogLevel("WARN")) {
      return;
    }
    let message = "|";
    message += `${Log.getPaddedString(Log.getTimeStamp(), 0)}|`;
    message += Log.getPaddedString(`WARN`, 1) + "|";
    for (let i = 0, j = 2; i < msg.length; i++, j++) {
      const m = msg[i];
      message += `${Log.getPaddedString(m.toString(), j)}|`;
    }
    console.log(message);
  }
}
