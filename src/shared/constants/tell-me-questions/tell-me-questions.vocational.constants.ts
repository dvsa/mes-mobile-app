/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'CD3',
    description: 'Tell me the main safety factors involved in loading this vehicle.',
    shortName: 'Safety factors while loading'
  },
  {
    code: 'CD4',
    description: 'Tell me how you would check the condition of the reflectors on this vehicle.',
    shortName: 'Reflectors condition'
  },
  {
    code: 'CD5',
    description: 'Tell me how you would check the condition of the windscreen & windows on this vehicle.',
    shortName: 'Windscreen & windows condition'
  },
  {
    code: 'CD7',
    description: 'Tell me how you would check your tyres to ensure that they are correctly inflated, have sufficient tread depth and that their general condition is safe to use on the road.',
    shortName: 'Sufficient tread'
  },
  {
    code: 'CD8',
    description: 'Tell me how you would check the condition of the windscreen wipers on this vehicle.',
    shortName: 'Windscreen wipers condition'
  },
  {
    code: 'CD9',
    description: 'Tell me how you would check the condition of the body is safe on this vehicle.',
    shortName: 'Body safety'
  },
  {
    code: 'CD11',
    description: 'Identify where you would check the engine oil level and tell me how you would check that the engine has sufficient oil.',
    shortName: 'Engine has sufficient oil'
  },
  {
    code: 'CD14',
    description: 'Tell me how you would check the condition of the suspension on this vehicle.',
    shortName: 'Suspension condition'
  },
  {
    code: 'CD16',
    description: 'Identify where you would check the engine coolant level and tell me how you would check that the engine has the correct level.',
    shortName: 'Engine coolant'
  },
  {
    code: 'CD17',
    description: 'Tell me how you would check that the headlamps, sidelights & tail lights are working.',
    shortName: 'Headlamps, sidelights and tail lights'
  },
  {
    code: 'CD19',
    description: 'Tell me how you would operate the loading mechanism on this vehicle (vehicle specific ie tail lift).',
    shortName: 'Loading mechanism'
  },
  {
    code: 'CD22',
    description: 'Identify where the windscreen washer reservoir is and tell me how you would check the windscreen washer level.',
    shortName: 'Windscreen washer'
  },
] as VehicleChecksQuestion[];

export const NUMBER_OF_TELL_ME_QUESTIONS = 2;
