import { LogType, Log } from '../models/log.model';

export class Logs {
  static createLog(logType: LogType, desc: string, error: string): Log {
    return {
      message: error,
      type: logType,
      timestamp: Date.now(),
      description: desc,
    };
  }
}
