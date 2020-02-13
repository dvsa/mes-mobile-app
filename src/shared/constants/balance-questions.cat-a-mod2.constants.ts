import { VehicleChecksQuestion } from '../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'BQ1',
    // tslint:disable-next-line:max-line-length
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
] as VehicleChecksQuestion[];

export const NUMBER_OF_BALANCE_QUESTIONS = 1;
