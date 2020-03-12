import { SafetyQuestion } from '../../providers/question/safety-question.model';

export const NUMBER_OF_SAFETY_QUESTIONS = 3;

// Questions can be long; we disable max-line-length lint rule to keep things clean.
/* tslint:disable:max-line-length */
export const questions: SafetyQuestion[] = [
  {
    description: 'Fire extinguisher',
  },
  {
    description: 'Emergency exit',
  },
  {
    description: 'Fuel cutoff',
  },
];
/* tslint:enable:max-line-length */

export default questions;
