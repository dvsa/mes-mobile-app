export type MsAdalError = {
  code: any;
  details: {
    errorCode: string,
    statusCode: number,
    error: any,
    errorDescription: string
  },
  __zone_symbol__currentTask : {
    type: string,
    state: string,
    source: string,
    zone: string,
    cancelFn: any,
    runCount: number
  }
  line: number,
  column: number,
  sourceURL: string
}
