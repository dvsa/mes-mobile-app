export enum  LogType {
  DEBUG,
  WARNING,
  ERROR
}

export type Log = {
  type: LogType,
  message: string
}
