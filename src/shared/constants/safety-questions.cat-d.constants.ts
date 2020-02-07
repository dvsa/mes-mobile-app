import { SafetyQuestion } from '../../providers/question/safety-question.model';

// export default ['Fire Extinguisher', 'Emergency Exit', 'Fuel cutoff'];

export default [
  {
    description: 'Fire extinguisher',
  },
  {
    description: 'Emergency exit',
  },
  {
    description: 'Fuel cutoff',
  },
] as SafetyQuestion[];

export const NUMBER_OF_SAFETY_QUESTIONS = 3;
