import { TestData } from '@dvsa/mes-test-schema/categories/CPC';

export const getCombination = (data: TestData) => data.combination;
export const getQuestion1 = (data: TestData) => data.question1;
export const getQuestion2 = (data: TestData) => data.question2;
export const getQuestion3 = (data: TestData) => data.question3;
export const getQuestion4 = (data: TestData) => data.question4;
export const getQuestion5 = (data: TestData) => data.question5;
export const getTotalPercent = (data: TestData) => data.totalPercent;
