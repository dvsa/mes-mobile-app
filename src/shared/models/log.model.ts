export enum  LogType {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export type Log = {
  type: LogType,
  message: string,
  timestamp: number,
  [propName: string]: any,
};
