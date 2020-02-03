import { FaultSummaryProvider } from '../fault-summary';
import { TestBed } from '@angular/core/testing';
import { TestData } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { FaultSummaryCatCHelper } from '../cat-c/fault-summary.cat-c';
import { FaultSummaryCatBHelper } from '../cat-b/fault-summary.cat-b';
import { FaultSummaryCatBEHelper } from '../cat-be/fault-summary.cat-be';
import { FaultSummaryCatDHelper } from '../cat-d/fault-summary.cat-d';
import { showMe2DFTellMe3DF, showMe2DFTellMe2DF, showMe1DFTellMe1DF, showMe0DFTellMe1DF } from './fault-summary.mock';
import { configureTestSuite } from 'ng-bullet';

describe('faultSummaryProvider', () => {
  const categoryC = [
    {
      category: TestCategory.C,
      showMeTellMeAllFaults: showMe2DFTellMe3DF,
      showMeTellMeSemiFaults: showMe2DFTellMe2DF,
    },
    { category: TestCategory.C1,
      showMeTellMeAllFaults: showMe2DFTellMe3DF,
      showMeTellMeSemiFaults: showMe2DFTellMe2DF,
    },
    { category: TestCategory.C1E,
      showMeTellMeAllFaults: showMe1DFTellMe1DF,
      showMeTellMeSemiFaults: showMe0DFTellMe1DF,
    },
    { category: TestCategory.CE,
      showMeTellMeAllFaults: showMe1DFTellMe1DF,
      showMeTellMeSemiFaults: showMe0DFTellMe1DF,
    },
  ];

  const categoryD = [
    {
      category: TestCategory.D,
      showMeTellMeAllFaults: showMe2DFTellMe3DF,
      showMeTellMeSemiFaults: showMe2DFTellMe2DF,
    },
    {
      category: TestCategory.D1,
      showMeTellMeAllFaults: showMe2DFTellMe3DF,
      showMeTellMeSemiFaults: showMe2DFTellMe2DF,
    },
    {
      category: TestCategory.D1E,
      showMeTellMeAllFaults: showMe1DFTellMe1DF,
      showMeTellMeSemiFaults: showMe0DFTellMe1DF,
    },
    {
      category: TestCategory.DE,
      showMeTellMeAllFaults: showMe1DFTellMe1DF,
      showMeTellMeSemiFaults: showMe0DFTellMe1DF,
    },
  ];

  let faultSummaryProvider: FaultSummaryProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultSummaryProvider,
        FaultCountProvider,
      ],
    });

  });

  beforeEach(() => {
    faultSummaryProvider = TestBed.get(FaultSummaryProvider);

    spyOn(FaultSummaryCatBHelper, 'getDrivingFaultsCatB').and.callThrough();
    spyOn(FaultSummaryCatBHelper, 'getSeriousFaultsCatB').and.callThrough();
    spyOn(FaultSummaryCatBHelper, 'getDangerousFaultsCatB').and.callThrough();
    spyOn(FaultSummaryCatBEHelper, 'getDrivingFaultsCatBE').and.callThrough();
    spyOn(FaultSummaryCatBEHelper, 'getSeriousFaultsCatBE').and.callThrough();
    spyOn(FaultSummaryCatBEHelper, 'getDangerousFaultsCatBE').and.callThrough();
    spyOn(FaultSummaryCatCHelper, 'getDrivingFaultsNonTrailer').and.callThrough();
    spyOn(FaultSummaryCatCHelper, 'getSeriousFaultsNonTrailer').and.callThrough();
    spyOn(FaultSummaryCatCHelper, 'getDangerousFaultsNonTrailer').and.callThrough();
    spyOn(FaultSummaryCatCHelper, 'getDrivingFaultsTrailer').and.callThrough();
    spyOn(FaultSummaryCatCHelper, 'getSeriousFaultsTrailer').and.callThrough();
    spyOn(FaultSummaryCatCHelper, 'getDangerousFaultsTrailer').and.callThrough();
    spyOn(FaultSummaryCatDHelper, 'getDangerousFaultsNonTrailer').and.callThrough();
    spyOn(FaultSummaryCatDHelper, 'getDrivingFaultsTrailer').and.callThrough();
    spyOn(FaultSummaryCatDHelper, 'getSeriousFaultsTrailer').and.callThrough();
    spyOn(FaultSummaryCatDHelper, 'getDangerousFaultsTrailer').and.callThrough();
  });

  describe('getDrivingFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no driving faults', () => {
        const result = faultSummaryProvider.getDrivingFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of driving faults > 0', () => {
        const data: TestData = {
          drivingFaults: {
            useOfMirrorsChangeDirection: 1,
            useOfMirrorsSignalling: 2,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return faults in reverse order of fault count', () => {
        const data: TestData = {
          drivingFaults: {
            useOfSpeed: 1,
            controlsSteering: 2,
            junctionsObservation: 5,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result[0].faultCount).toEqual(5);
        expect(result[1].faultCount).toEqual(2);
        expect(result[2].faultCount).toEqual(1);
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBUniqueTypes.TestData = {
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'DF',
            selected: true,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any vehicle checks faults', () => {
        const data: CatBUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestion: {
              outcome: 'DF',
            },
            showMeQuestion: {
              outcome: 'DF',
            },
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no driving faults', () => {
        const result = faultSummaryProvider.getDrivingFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of driving faults > 0', () => {
        const data: TestData = {
          drivingFaults: {
            useOfMirrorsChangeDirection: 1,
            useOfMirrorsSignalling: 2,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
        expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
        expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'DF',
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any vehicle checks faults when there are 4 driving faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
            showMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(4);
      });
      it('should correctly return any vehicle checks faults when there are 5 driving faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
            showMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(4);
      });
    });
    categoryC.forEach((cat) => {
      describe(`Category ${cat.category}`, () => {
        it('should return an empty array if there are no driving faults', () => {
          const result = faultSummaryProvider.getDrivingFaultsList({}, cat.category);
          expect(result.length).toEqual(0);
        });
        it('should return an array matching the number of driving faults > 0', () => {
          const data: TestData = {
            drivingFaults: {
              useOfMirrorsChangeDirection: 1,
              useOfMirrorsSignalling: 2,
            },
          };
          const result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any manoeuvre faults', () => {
          const data: CatCUniqueTypes.TestData = {
            manoeuvres: {
              reverseLeft: {
                selected: true,
                controlFault: 'DF',
                observationFault: 'DF',
              },
            },
          };
          const result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
          expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
          expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
        });
        it('should correctly return any vehicle checks faults when there are 4 driving faults', () => {
          const result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeSemiFaults.testData, cat.category);
          expect(result.length).toEqual(1);
          expect(result[0].faultCount).toEqual(cat.showMeTellMeSemiFaults.drivingFaults);
        });
        it('should correctly return 4 driving faults as the fault count when there are 5', () => {
          const result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeAllFaults.testData, cat.category);
          expect(result.length).toEqual(1);
          expect(result[0].faultCount).toEqual(cat.showMeTellMeAllFaults.drivingFaults);
        });
      });
    });
    categoryD.forEach((cat) => {
      describe(`Category ${cat.category}`, () => {
        it('should return an empty array if there are no driving faults', () => {
          const result = faultSummaryProvider.getDrivingFaultsList({}, cat.category);
          expect(result.length).toEqual(0);
        });
        it('should return an array matching the number of driving faults > 0', () => {
          const data: TestData = {
            drivingFaults: {
              useOfMirrorsChangeDirection: 1,
              useOfMirrorsSignalling: 2,
            },
          };
          const result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any manoeuvre faults', () => {
          const data: CatDUniqueTypes.TestData = {
            manoeuvres: {
              reverseLeft: {
                selected: true,
                controlFault: 'DF',
                observationFault: 'DF',
              },
            },
          };
          const result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
          expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
          expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
        });
        it('should correctly return any vehicle checks faults when there are 4 driving faults', () => {
          const result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeSemiFaults.testData, cat.category);
          expect(result.length).toEqual(1);
          expect(result[0].faultCount).toEqual(cat.showMeTellMeSemiFaults.drivingFaults);
        });
        it('should correctly return 4 driving faults as the fault count when there are 5', () => {
          const result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeAllFaults.testData, cat.category);
          expect(result.length).toEqual(1);
          expect(result[0].faultCount).toEqual(cat.showMeTellMeAllFaults.drivingFaults);
        });
      });
    });
  });

  describe('getSeriousFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getSeriousFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          seriousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return an eyesight fail fault if one exists', () => {
        const data: CatBUniqueTypes.TestData = {
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'test-fault-comment',
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result[0].competencyIdentifier).toEqual('eyesightTest');
        expect(result[0].comment).toEqual('test-fault-comment');
      });
      it('should correctly return any vehicle checks faults', () => {
        const data: CatBUniqueTypes.TestData = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: 'S',
            },
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'S',
            selected: true,
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should return an array length matching the number of manoeuvre driving faults', () => {
        const data: CatBUniqueTypes.TestData = {
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: 'S',
              observationFault: 'S',
            },
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getSeriousFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          seriousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should return an eyesight fail fault if one exists', () => {
        const data: CatBUniqueTypes.TestData = {
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'test-fault-comment',
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result[0].competencyIdentifier).toEqual('eyesightTest');
        expect(result[0].comment).toEqual('test-fault-comment');
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
              controlFault: 'S',
              observationFault: 'S',
            },
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'S',
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any vehicle checks faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
            showMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(1);
      });
    });
    categoryC.forEach((cat) => {
      describe(`Category ${cat.category}`, () => {
        it('should return an empty array if there are no serious faults', () => {
          const result = faultSummaryProvider.getSeriousFaultsList({}, cat.category);
          expect(result.length).toEqual(0);
        });
        it('should return an array matching the number of serious faults set to true', () => {
          const data: TestData = {
            seriousFaults: {
              ancillaryControls: true,
              awarenessPlanning: true,
            },
          };
          const result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any manoeuvre faults', () => {
          const data: CatCUniqueTypes.TestData = {
            manoeuvres: {
              reverseLeft: {
                selected: true,
                controlFault: 'S',
                observationFault: 'S',
              },
            },
          };
          const result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any vehicle checks faults ', () => {
          const data: CatCUniqueTypes.TestData = {
            vehicleChecks: {
              tellMeQuestions: [
                { outcome: 'DF' },
                { outcome: 'DF' },
                { outcome: 'DF' },
              ],
              showMeQuestions: [
                { outcome: 'DF' },
                { outcome: 'DF' },
              ],
            },
          };
          const result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
          expect(result.length).toEqual(1);
          expect(result[0].faultCount).toEqual(1);
        });
      });
    });
    categoryD.forEach((cat) => {
      describe(`Category ${cat.category}`, () => {
        it('should return an empty array if there are no serious faults', () => {
          const result = faultSummaryProvider.getSeriousFaultsList({}, cat.category);
          expect(result.length).toEqual(0);
        });
        it('should return an array matching the number of serious faults set to true', () => {
          const data: TestData = {
            seriousFaults: {
              ancillaryControls: true,
              awarenessPlanning: true,
            },
          };
          const result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any manoeuvre faults', () => {
          const data: CatDUniqueTypes.TestData = {
            manoeuvres: {
              reverseLeft: {
                selected: true,
                controlFault: 'S',
                observationFault: 'S',
              },
            },
          };
          const result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any vehicle checks faults ', () => {
          const data: CatDUniqueTypes.TestData = {
            vehicleChecks: {
              tellMeQuestions: [
                { outcome: 'DF' },
                { outcome: 'DF' },
                { outcome: 'DF' },
              ],
              showMeQuestions: [
                { outcome: 'DF' },
                { outcome: 'DF' },
              ],
            },
          };
          const result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
          expect(result.length).toEqual(1);
          expect(result[0].faultCount).toEqual(1);
        });
      });
    });
  });

  describe('getDangerousFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getDangerousFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return an array length matching the number of manoeuvre driving faults', () => {
        const data: CatBUniqueTypes.TestData = {
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: 'D',
              observationFault: 'D',
            },
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any vehicle checks faults', () => {
        const data: CatBUniqueTypes.TestData = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: 'D',
            },
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'D',
            selected: true,
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getDangerousFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
              controlFault: 'D',
              observationFault: 'D',
            },
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'D',
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
    });
    categoryC.forEach((cat) => {
      describe(`Category ${cat.category}`, () => {
        it('should return an empty array if there are no serious faults', () => {
          const result = faultSummaryProvider.getDangerousFaultsList({}, cat.category);
          expect(result.length).toEqual(0);
        });
        it('should return an array matching the number of serious faults set to true', () => {
          const data: TestData = {
            dangerousFaults: {
              ancillaryControls: true,
              awarenessPlanning: true,
            },
          };
          const result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any manoeuvre faults', () => {
          const data: CatCUniqueTypes.TestData = {
            manoeuvres: {
              reverseLeft: {
                selected: true,
                controlFault: 'D',
                observationFault: 'D',
              },
            },
          };
          const result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
      });
    });
    categoryD.forEach((cat) => {
      describe(`Category ${cat.category}`, () => {
        it('should return an empty array if there are no serious faults', () => {
          const result = faultSummaryProvider.getDangerousFaultsList({}, cat.category);
          expect(result.length).toEqual(0);
        });
        it('should return an array matching the number of serious faults set to true', () => {
          const data: TestData = {
            dangerousFaults: {
              ancillaryControls: true,
              awarenessPlanning: true,
            },
          };
          const result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
        it('should correctly return any manoeuvre faults', () => {
          const data: CatDUniqueTypes.TestData = {
            manoeuvres: {
              reverseLeft: {
                selected: true,
                controlFault: 'D',
                observationFault: 'D',
              },
            },
          };
          const result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
          expect(result.length).toEqual(2);
        });
      });
    });
  });
});
