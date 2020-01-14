/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'T1',
    description: 'Tell me how you would check the condition of the body is safe on this vehicle.',
    shortName: 'Body condition'
  },
  {
    code: 'T2',
    description: 'Tell me how you would operate the loading mechanism on this vehicle (Vehicle specific. eg Tail Lift).',
    shortName: 'Loading mechanism'
  },
  {
    code: 'T3',
    description: 'Tell me how you would check the condition of the windscreen wipers on this vehicle.',
    shortName: 'Windscreen wipers condition'
  },
  {
    code: 'T4',
    description: 'Tell me how you would check the condition of the reflectors on this vehicle.',
    shortName: 'Reflectors condition'
  },
  {
    code: 'T5',
    description: 'Tell me how you would check the condition of the suspension on this vehicle.',
    shortName: 'Suspension condition'
  },
  {
    code: 'T6',
    description: 'Tell me the main safety factors involved in loading this vehicle.',
    shortName: 'Safety factors while loading '
  },
] as VehicleChecksQuestion[];

export const NUMBER_OF_TELL_ME_QUESTIONS = 1;