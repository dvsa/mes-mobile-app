//TODO reenable tests with MOD2
// import { TestData, SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
// import {
//   hasSeriousFault,
//   hasDangerousFault,
//   getETAFaultText,
//   getEcoFaultText,
//   getShowMeQuestionOptions,
// } from '../../common/test-data.selector';
// import {
//   getDrivingFaultCount,
//   areBalanceQuestionsSelected,
//   areBalanceQuestionsCorrect,
//   haveSafetyAndBalanceQuestionsBeenCompleted,
// } from '../test-data.cat-a-mod2.selector';
// import { Competencies } from '../../test-data.constants';
// import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
// import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
// import { behaviourMap } from '../../../../../pages/office/office-behaviour-map';
// import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
//
// describe('TestDataSelectors CAT A Mod 2', () => {
//   const state: TestData = {
//     drivingFaults: {
//       controlsGears: 1,
//     },
//     seriousFaults: {
//       awarenessPlanning: true,
//     },
//     dangerousFaults: {
//       useOfSpeed: true,
//     },
//     ETA: {
//       verbal: false,
//     },
//     eco: {
//       adviceGivenControl: false,
//       adviceGivenPlanning: false,
//     },
//     safetyAndBalanceQuestions: {
//       balanceQuestions: [
//         {
//           code: '',
//           outcome: CompetencyOutcome.DF,
//         },
//       ],
//       safetyQuestions: [
//         {
//           code: '',
//           outcome: CompetencyOutcome.DF,
//         },
//       ],
//     },
//   };
//
//   describe('getSafetyQuestionOptions', () => {
//     const outcomeBehaviourMapProvider = new OutcomeBehaviourMapProvider();
//     outcomeBehaviourMapProvider.setBehaviourMap(behaviourMap);
//
//     const safetyQuestions: VehicleChecksQuestion[] = [
//       {
//         code: 'S1',
//         description: 'S1 Desc',
//         shortName: 'S1 short',
//       },
//       {
//         code: 'S2',
//         description: 'S2 Desc',
//         shortName: 'S2 short',
//       },
//       {
//         code: 'N/A',
//         description: 'Not applicable',
//         shortName: 'Not applicable',
//       },
//     ];
//     it('should return the list of questions without N/A if outcome field does
//         not have showNotApplicable set', () => {
//       const result = getShowMeQuestionOptions(safetyQuestions, '1', outcomeBehaviourMapProvider);
//       expect(result.length).toBe(2);
//       expect(result[0].code).toBe('S1');
//       expect(result[1].code).toBe('S2');
//     });
//   });
//
//   describe('getDrivingFaultCount', () => {
//     it('should return the driving fault count', () => {
//       expect(getDrivingFaultCount(state, Competencies.controlsGears)).toBe(1);
//     });
//     it('should return undefined when there hasnt been any driving faults', () => {
//       expect(getDrivingFaultCount(state, Competencies.controlsParkingBrake)).toBeUndefined();
//     });
//   });
//
//   describe('hasSeriousFault', () => {
//     it('should return true if a competency has a serious fault', () => {
//       expect(hasSeriousFault(state, Competencies.awarenessPlanning)).toEqual(true);
//     });
//     it('should return false if a competency does not have a serious fault', () => {
//       expect(hasSeriousFault(state, Competencies.controlsClutch)).toBeFalsy();
//     });
//   });
//
//   describe('hasDangerousFault', () => {
//     it('should return true if a competency has a dangerous fault', () => {
//       expect(hasDangerousFault(state, Competencies.useOfSpeed)).toEqual(true);
//     });
//     it('should return false if a competency does not have a dangerous fault', () => {
//       expect(hasDangerousFault(state, Competencies.useOfMirrorsSignalling)).toBeFalsy();
//     });
//   });
//
//   describe('getETAFaultText', () => {
//     it('should return null if no ETA faults', () => {
//       const result = getETAFaultText(state.ETA);
//       expect(result).toBeUndefined();
//     });
//     it('should return `Verbal` if just verbal ETA fault', () => {
//       state.ETA.verbal = true;
//       const result = getETAFaultText(state.ETA);
//       expect(result).toEqual('Verbal');
//     });
//   });
//
//   describe('getEcoFaultText', () => {
//     it('should return null if no eco faults', () => {
//       const result = getEcoFaultText(state.eco);
//       expect(result).toBeUndefined();
//     });
//     it('should return `Control and Planning` if both eco faults', () => {
//       state.eco.adviceGivenControl = true;
//       state.eco.adviceGivenPlanning = true;
//       const result = getEcoFaultText(state.eco);
//       expect(result).toEqual('Control and Planning');
//     });
//     it('should return `Control` if just control eco fault', () => {
//       state.eco.adviceGivenControl = true;
//       state.eco.adviceGivenPlanning = false;
//       const result = getEcoFaultText(state.eco);
//       expect(result).toEqual('Control');
//     });
//     it('should return `Planning` if just planning eco fault', () => {
//       state.eco.adviceGivenControl = false;
//       state.eco.adviceGivenPlanning = true;
//       const result = getEcoFaultText(state.eco);
//       expect(result).toEqual('Planning');
//     });
//   });
//
//   describe('safety and balance questions selector', () => {
//     describe('areSafetyQuestionsSelected', () => {
//       it('should return true if there is a safety question selected', () => {
//         const state: SafetyAndBalanceQuestions = {
//           balanceQuestions: [
//             {
//               code: 'T1',
//               description: 'desc',
//               outcome: CompetencyOutcome.P,
//             },
//           ],
//         };
//         expect(areSafetyQuestionsSelected(state)).toBe(true);
//       });
//       it('should return false if there is no tell me question selected', () => {
//         expect(areBalanceQuestionsSelected({})).toBe(false);
//       });
//     });
//     describe('areTellMeQuestionsCorrect', () => {
//       const passedState: SafetyAndBalanceQuestions = {
//         balanceQuestions: [
//           {
//             code: 'T1',
//             description: 'desc',
//             outcome: CompetencyOutcome.P,
//           },
//         ],
//       };
//
//       it('should return true if the tell me question is marked as a pass', () => {
//         expect(areBalanceQuestionsCorrect(passedState)).toBe(true);
//       });
//       it('should return false if the tell me question is marked as a driving fault', () => {
//         const failedState: SafetyAndBalanceQuestions = {
//           balanceQuestions: [
//             {
//               code: 'T1',
//               description: 'desc',
//               outcome: CompetencyOutcome.D,
//             },
//           ],
//         };
//         expect(areBalanceQuestionsCorrect(failedState)).toBe(false);
//       });
//     });
//
//     describe('hasVehicleChecksBeenCompleted', () => {
//       it('should return true if vehicle checks have been completed with a pass', () => {
//         const state = {
//           safetyQuestions: [
//             {
//               outcome: CompetencyOutcome.P,
//             },
//             {
//               outcome: CompetencyOutcome.P,
//             },
//           ],
//           balanceQuestions: [
//             {
//               outcome: CompetencyOutcome.P,
//             },
//           ],
//         } as SafetyAndBalanceQuestions;
//
//         expect(hasVehicleChecksBeenCompleted(state)).toEqual(true);
//       });
//
//       it('should return true if vehicle checks have been completed with a driving fault', () => {
//         const state = {
//           safetyQuestions: [
//             {
//               outcome: CompetencyOutcome.DF,
//             },
//             {
//               outcome: CompetencyOutcome.DF,
//             },
//           ],
//           balanceQuestions: [
//             {
//               outcome: CompetencyOutcome.DF,
//             },
//           ],
//         } as SafetyAndBalanceQuestions;
//
//         expect(hasVehicleChecksBeenCompleted(state)).toEqual(true);
//       });
//
//       it('should return false if safety question outcome is not defined', () => {
//         const state = {
//           safetyQuestions: [
//           ],
//           balanceQuestions: [
//             {
//               outcome: CompetencyOutcome.DF,
//             },
//             {
//               outcome: CompetencyOutcome.DF,
//             },
//           ],
//         } as SafetyAndBalanceQuestions;
//
//         expect(hasVehicleChecksBeenCompleted(state)).toEqual(false);
//       });
//     });
//   });
// });
