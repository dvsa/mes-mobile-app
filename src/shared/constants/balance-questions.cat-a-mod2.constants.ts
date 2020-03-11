import { VehicleChecksQuestion } from '../../providers/question/vehicle-checks-question.model';

export const NUMBER_OF_BALANCE_QUESTIONS = 1;

// Questions can be long; we disable max-line-length lint rule to keep things clean.
// tslint:disable: max-line-length
export const questions: VehicleChecksQuestion[] = [
  {
    code: 'BQ1',
    description: 'What problems could arise from carrying a pillion passenger?',
    shortName: 'Pillion passenger problems',
  },
  {
    code: 'BQ2',
    description: 'How should a passenger be carried on the pillion seat?',
    shortName: 'Carrying a passenger',
  },
  {
    code: 'BQ3',
    description: 'How would the balance of the machine be affected if you carried a pillion passenger?',
    shortName: 'Balance with passenger',
  },
];

export default questions;
