/* tslint:disable */
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';

export default [
  {
    code: 'CD1',
    description: 'Show me how you would check that all doors including cargo doors are secure.',
    shortName: 'All doors secure',
  },
  {
    code: 'CD2',
    description: 'Show me how you would check for air leaks on this vehicle.',
    shortName: 'Air leaks',

  },
  {
    code: 'CD6',
    description: 'Show me how you would check the condition of the mudguards on this vehicle.',
    shortName: 'Mudguards condition',

  },
  {
    code: 'CD10',
    description: 'Show me how you would check for the correct air pressure on this vehicle.',
    shortName: 'Air pressure',

  },
  {
    code: 'CD12',
    description: 'Show me how you would check the wheel nuts are secure on this vehicle.',
    shortName: 'Wheel nuts',
  },
  {
    code: 'CD13',
    description: 'Show me how you would check the operation (specify horn, warning device for reversing) of the audible warning devices on this vehicle.',
    shortName: 'Check audible warnings',
  },
  {
    code: 'CD15',
    description: 'Show me how you would check that the brake lights are working on this vehicle (I can assist you, if you need to switch the ignition on, please don’t start the engine).',
    shortName: 'Brake lights',
  },
  {
    code: 'CD18',
    description: 'Show me how you would replace the tachograph disc on this vehicle.',
    shortName: 'Change tacho',
  },
  {
    code: 'CD20',
    description: 'Show me/ explain how you would check that the power assisted steering is working.',
    shortName: 'Power assisted steering',
  },
  {
    code: 'CD21',
    description: 'Show me how you would check that the direction indicators are working.',
    shortName: 'Direction indicators',
  },
  {
    code: 'CD23',
    description: 'Show me what instrument checks you would make before and after starting the engine on this vehicle.',
    shortName: 'Instrument checks',
  },
  {
    code: 'CD24',
    description: 'Show me where the first aid equipment is kept on this vehicle.',
    shortName: 'First aid equipment',
  },
  {
    code: 'CD25',
    description: 'Show me how you would clean the windscreen using the windscreen washer and wipers.',
    shortName: 'Clean windscreen',
  },
  {
    code: 'CD26',
    description: 'Show me how you would set the windscreen demister to clear the windows effectively.',
    shortName: 'Demist windscreen',
  },
  {
    code: 'CD27',
    description: 'Show me how you would switch on the rear fog light(s) and explain when you would use it/them. (No need to exit vehicle)',
    shortName: 'Rear fog lights',
  },
  {
    code: 'CD28',
    description: 'Show me how you switch your headlight from dipped to main beam',
    shortName: 'Dipped to main beam',
  },
] as VehicleChecksQuestion[];

export const NUMBER_OF_SHOW_ME_QUESTIONS = 3;
