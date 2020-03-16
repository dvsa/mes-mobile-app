import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export const questions: VehicleChecksQuestion[] = [
  {
    code: 'T1',
    description: 'Tell me how you would check that the brakes are working before starting a journey.',
    shortName: 'Brakes',
  },
  {
    code: 'T2',
    description: 'Identify where the windscreen washer reservoir is and tell me how you would check the windscreen washer level.',
    shortName: 'Windscreen washer reservoir',
  },
  {
    code: 'T3',
    description: 'Tell me where you would find the information for the recommended tyre pressures for this vehicle and how tyre pressures should be checked.',
    shortName: 'Tyre pressures',
  },
  {
    code: 'T4',
    description: 'Tell me how you would check your mirrors are secure and correctly adjusted to give you a clear view of he road behind.',
    shortName: 'Mirrors secure',
  },
  {
    code: 'T5',
    description: 'Tell me how you would check that the headlights & taillights are working. (No need to exit vehicle)',
    shortName: 'Headlights & Taillights',
  },
  {
    code: 'T6',
    description: 'Tell me how you would check that the flashing amber beacon is working on this vehicle.',
    shortName: 'Amber beacon',
  },
];

export default questions;
