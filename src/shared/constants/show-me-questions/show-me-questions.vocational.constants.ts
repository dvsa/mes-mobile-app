/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'S1',
    description: 'Show me how you would check that all doors including cargo doors are secure.',
    shortName: 'All doors secure',
  },
  {
    code: 'S2',
    description: 'Show me how you would check for air leaks on this vehicle.',
    shortName: 'Air leaks',

  },
  {
    code: 'S4',
    description: 'Show me how you would check the condition of the mudguards on this vehicle.',
    shortName: 'Mudguards condition',

  },
  {
    code: 'S5',
    description: 'Show me how you would check for the correct air pressure on this vehicle.',
    shortName: 'Air pressure',

  },
  {
    code: 'S6',
    description: 'Show me how you would check the wheel nuts are secure on this vehicle.',
    shortName: 'Wheel nuts',
  },
  {
    code: 'S7',
    description: 'Show me how you would check the operation (specify horn, warning device for reversing) of the audible warning devices on this vehicle.',
    shortName: 'Check audible warnings',
  },
  {
    code: 'S8',
    description: 'Show me how you would check that the brake lights are working on this vehicle (I can assist you, if you need to switch the ignition on, please don’t start the engine).',
    shortName: 'Brake lights',
  },
  {
    code: 'S9',
    description: 'Show me how you would replace the tachograph disc on this vehicle.',
    shortName: 'Change tacho',
  },
  {
    code: 'S10',
    description: 'Show me/ explain how you would check that the power assisted steering is working.',
    shortName: 'Power assisted steering',
  },
  {
    code: 'S11',
    description: 'Show me how you would check that the direction indicators are working.',
    shortName: 'Direction indicators',
  },
  {
    code: 'S13',
    description: 'Show me what instrument checks you would make before and after starting the engine on this vehicle.',
    shortName: 'Instrument checks',
  },
  {
    code: 'S14',
    description: 'Show me where the first aid equipment is kept on this vehicle.',
    shortName: 'First aid equipment',
  },
  {
    code: 'S15',
    description: 'Show me how you would clean the windscreen using the windscreen washer and wipers.',
    shortName: 'Clean windscreen',
  },
  {
    code: 'S16',
    description: 'Show me how you would set the windscreen demister to clear the windows effectively.',
    shortName: 'Demist windscreen',
  },
  {
    code: 'S17',
    description: 'Show me how you would switch on the rear fog light(s) and explain when you would use it/them. (No need to exit vehicle)',
    shortName: 'Rear fog lights',
  },
  {
    code: 'S18',
    description: 'Show me how you switch your headlight from dipped to main beam',
    shortName: 'Dipped to main beam',
  },
  {
    code: 'N/A',
    description: 'Not applicable.',
    shortName: 'Not applicable',
  },

] as VehicleChecksQuestion[];

export const NUMBER_OF_SHOW_ME_QUESTIONS = 3;