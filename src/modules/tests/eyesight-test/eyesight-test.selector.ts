const seriousFaultFound = false;

export const isPassed = (result: boolean) => result && !seriousFaultFound;
// TODO check serious fault.
export const isFailed = (result: boolean) => result && seriousFaultFound;
