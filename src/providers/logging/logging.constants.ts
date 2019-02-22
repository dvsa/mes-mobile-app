export enum  LogType {
  DEBUG= 'debug',
  WARNING= 'warning',
  ERROR= 'error',
}

export type Log = {
  type: LogType,
  message: string,
  timestamp: number,
  [propName: string]: any,
};
