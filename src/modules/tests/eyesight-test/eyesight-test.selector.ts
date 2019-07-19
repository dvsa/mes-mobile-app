const seriousFaultFound = false;

export const isEyesightPassed = (result: boolean) => result && !seriousFaultFound;
// TODO check serious fault.
export const isEyesightFailed = (result: boolean) => result && seriousFaultFound;
