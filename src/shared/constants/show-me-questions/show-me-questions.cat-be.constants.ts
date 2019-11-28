/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'S01',
    description: 'Show me how you would check that the direction indicators are working.',
    shortName: 'Direction indicators',
  },
  {
    code: 'S02',
    description: 'Show me how you would check that your vehicle & trailer doors are secure.',
    shortName: 'Doors secure',
  },
  {
    code: 'S03',
    description: 'Show me how you would check that the horn is working (off road only).',
    shortName: 'Horn',
  },
  {
    code: 'S04',
    description: 'Show me how you would check the parking brake for excessive wear.',
    shortName: 'Parking brake',
  },
  {
    code: 'S05',
    description: 'Show me how you would clean the windscreen using the windscreen washer and wipers.',
    shortName: 'Windscreen',
  },
  {
    code: 'S06',
    description: 'Show me how you would set the demister controls to clear all the windows effectively, this should include both front and rear screens.',
    shortName: 'Demist windscreen',
  },
  {
    code: 'S07',
    description: 'Show me how you would switch on the rear fog light(s) and explain when you would use it/them. (No need to exit vehicle)',
    shortName: 'Rear fog lights',
  },
  {
    code: 'S08',
    description: 'Show me how you switch your headlight from dipped to main beam and explain how you would know the main beam is on whilst inside the car.',
    shortName: 'Dipped to main beam',
  },
  {
    code: 'S09',
    description: 'Show me how you would check that the brake lights are working on this vehicle. (I can assist you, if you need to switch the ignition on, please don’t start the engine).',
    shortName: 'Brake lights',
  },
] as VehicleChecksQuestion[];

export const NUMBER_OF_SHOW_ME_QUESTIONS = 3;
