/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'S1',
    description: 'Show me how you would replace the tachograph disc on this vehicle.',
    shortName: 'Change tacho',
  },
  {
    code: 'S2',
    description: 'Show me how you would check that the wheel nuts are secure on this vehicle.',
    shortName: 'Wheel nuts',

  },
  {
    code: 'S3',
    description: 'Show me how you would check that all doors including cargo doors are secure.',
    shortName: 'Doors security',

  },
  {
    code: 'S4',
    description: 'Show me how you would check the condition of the mudguards on this vehicle.',
    shortName: 'Mudguards condition',

  },
  {
    code: 'S5',
    description: 'Show me what instrument checks you would make before and after starting the engine on this vehicle.',
    shortName: 'Instrument checks',

  },
  {
    code: 'S6',
    description: 'Show me how you would check for air leaks on this vehicle.',
    shortName: 'Air leaks',
  },
  {
    code: 'S7',
    description: 'Show me how you would clean the windscreen using the windscreen washer and wipers.',
    shortName: 'Clean windescreen',
  },
  {
    code: 'S8',
    description: 'Show me how you would set the windscreen demister to clear the windows effectively.',
    shortName: 'Demist windscreen',
  },
  {
    code: 'S9',
    description: 'Show me how you would switch on the rear fog light(s) and explain when you would use it/them. (No need to exit vehicle)',
    shortName: 'Rear fog lights',
  },
  {
    code: 'S10',
    description: 'Show me how you switch your headlight from dipped to main beam. (No need to exit vehicle)',
    shortName: 'Dipped to main beam',
  },
  {
    code: 'S11',
    description: 'Show me how you would check that the brake lights are working on this vehicle. (I can assist you, if you need to switch the ignition on, please don’t start the engine)',
    shortName: 'Brake lights',
  },
  {
    code: 'N/A',
    description: 'Not applicable.',
    shortName: 'Not applicable',
  },

] as VehicleChecksQuestion[];
