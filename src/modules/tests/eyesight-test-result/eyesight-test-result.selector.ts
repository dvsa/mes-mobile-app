import { EyesightTestResult } from '@dvsa/mes-test-schema/categories/B';

export const isPassed = (result: EyesightTestResult) => result === 'P';
export const isFailed = (result: EyesightTestResult) => result === 'F';
