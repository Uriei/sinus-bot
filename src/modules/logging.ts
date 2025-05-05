/* eslint-disable no-fallthrough */
export function setLogLevel() {
  switch (process.env.LOG_LEVEL || "INFO") {
    case "ERROR":
      global.console.warn = () => {};
    case "WARN":
      global.console.log = () => {};
      global.console.info = () => {};
    case "INFO":
      global.console.debug = () => {};
    case "DEBUG":
      break;
  }
}
