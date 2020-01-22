/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'T1',
    description: 'Tell me the main safety factors involved in loading this vehicle.',
    shortName: 'Safety factors while loading'
  },
  {
    code: 'T2',
    description: 'Tell me how you would check the condition of the reflectors on this vehicle.',
    shortName: 'Reflectors condition'
  },
  {
    code: 'T3',
    description: 'Tell me how you would check the condition of the windscreen & windows on this vehicle.',
    shortName: 'Windscreen & windows condition'
  },
  {
    code: 'T4',
    description: 'Tell me how you would check your tyres to ensure that they are correctly inflated, have sufficient tread depth and that their general condition is safe to use on the road.',
    shortName: 'Sufficient tread'
  },
  {
    code: 'T5',
    description: 'Tell me how you would check the condition of the windscreen wipers on this vehicle.',
    shortName: 'Windscreen wipers condition'
  },
  {
    code: 'T6',
    description: 'Tell me how you would check the condition of the body is safe on this vehicle.',
    shortName: 'Body safety'
  },
  {
    code: 'T7',
    description: 'Identify where you would check the engine oil level and tell me how you would check that the engine has sufficient oil.',
    shortName: 'Engine has sufficient oil'
  },
  {
    code: 'T8',
    description: 'Tell me how you would check the condition of the suspension on this vehicle.',
    shortName: 'Suspension condition'
  },
  {
    code: 'T9',
    description: 'Identify where you would check the engine coolant level and tell me how you would check that the engine has the correct level.',
    shortName: 'Engine coolant'
  },
  {
    code: 'T10',
    description: 'Tell me how you would check that the headlamps, sidelights & tail lights are working.',
    shortName: 'Headlamps, sidelights and tail lights'
  },
  {
    code: 'T11',
    description: 'Tell me how you would operate the loading mechanism on this vehicle (vehicle specific ie tail lift).',
    shortName: 'Loading mechanism'
  },
  {
    code: 'T12',
    description: 'Identify where the windscreen washer reservoir is and tell me how you would check the windscreen washer level.',
    shortName: 'Windscreen washer'
  },
] as VehicleChecksQuestion[];

export const NUMBER_OF_TELL_ME_QUESTIONS = 2;
