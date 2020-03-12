import { VehicleChecksQuestion } from '../../providers/question/vehicle-checks-question.model';

export const NUMBER_OF_SAFETY_QUESTIONS = 2;

// Questions can be long; we disable max-line-length lint rule to keep things clean.
/* tslint:disable:max-line-length */
export const questions: VehicleChecksQuestion[] = [
  {
    code: 'SQ1',
    description: 'Identify where you would check the engine oil level and tell me how you would check that the engine has sufficient oil.',
    shortName: 'Oil level',
  },
  {
    code: 'SQ2',
    description: 'Show me how you would check that the horn is working on this machine (off road only)',
    shortName: 'Horn working',
  },
  {
    code: 'SQ3',
    description: 'Identify where the brake fluid reservoir is and tell me how you would check that you have a safe level of hydraulic fluid.',
    shortName: 'Brake Fluid',
  },
  {
    code: 'SQ4',
    description: 'Tell me how you would check that the lights and reflectors are clean and working.',
    shortName: 'Lights',
  },
  {
    code: 'SQ5',
    description: 'Show me how you would check that the brake lights are working.',
    shortName: 'Brake Lights',
  },
  {
    code: 'SQ6',
    description: 'Tell me how you would check the condition of the chain on this machine.',
    shortName: 'Chain',
  },
  {
    code: 'SQ7',
    description: 'Show me what checks you would make on the steering movement before using the machine.',
    shortName: 'Steering',
  },
  {
    code: 'SQ8',
    // tslint:disable-next-line:max-line-length
    description: 'Tell me how you would check your tyres to ensure that they are correctly inflated, have sufficient tread depth and that their general condition is safe to use on the road.',
    shortName: 'Tyres',
  },
  {
    code: 'SQ9',
    description: 'Show me how you would check the operation of the front brake on this machine.',
    shortName: 'Front Brake',
  },
  {
    code: 'SQ10',
    description: 'Show me how you would check the operation of the brakes on this machine.',
    shortName: 'Brakes',
  },
  {
    code: 'SQ11',
    description: 'Show me how you would check the operation of the engine cut out switch.',
    shortName: 'Engine Cut Out Switch',
  },
  {
    code: 'SQ12',
    description: 'Show me how you would switch on the rear fog light and explain when you would use it (if fitted).',
    shortName: 'Fog Light',
  },
  {
    code: 'SQ13',
    description: 'Show me how you switch your headlight from dipped to main beam.',
    shortName: 'Dipped / Main Beam',
  },
];
/* tslint:enable:max-line-length */

export default questions;
