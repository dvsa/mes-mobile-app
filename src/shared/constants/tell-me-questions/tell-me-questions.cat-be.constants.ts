import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export const NUMBER_OF_TELL_ME_QUESTIONS = 2;

// Questions can be long; we disable max-line-length lint rule to keep things clean.
// tslint:disable: max-line-length
export const questions : VehicleChecksQuestion[] = [
  {
    code: 'T01',
    description: 'Open the bonnet, identify where the brake fluid reservoir is and tell me how you would check that you have a safe level of hydraulic brake fluid.',
    shortName: 'Brakes',
  },
  {
    code: 'T02',
    description: 'Tell me the main safety factors involved in loading this vehicle.',
    shortName: 'Safety factors while loading',
  },
  {
    code: 'T03',
    description: 'Tell me the main safety factors involved in securing a load on this vehicle.',
    shortName: 'Safety factors while securing a load',
  },
  {
    code: 'T04',
    description: 'Tell me how you would check the tyres to ensure that they have sufficient tread depth and that their general condition is safe to use on the road.',
    shortName: 'Sufficient tread',
  },
  {
    code: 'T05',
    description: 'Open the bonnet, identify where you would check the engine coolant level and tell me how you would check that the engine has the correct level.',
    shortName: 'Engine coolant',
  },
  {
    code: 'T06',
    description: 'Tell me how you make sure your head restraint is correctly adjusted so it provides the best protection in the event of a crash.',
    shortName: 'Head restraint',
  },
];

export default questions;
