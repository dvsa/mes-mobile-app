import { VehicleChecksQuestion } from '../../providers/question/vehicle-checks-question.model';

// TODO - PREP-AMOD2: Add safety questions (MES-4670)
export default [
  {
    code: 'T01',
    // tslint:disable-next-line:max-line-length
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
] as VehicleChecksQuestion[];

export const NUMBER_OF_SAFETY_QUESTIONS = 3;
