var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';
import { catAM1TestDataStateObject } from '../__mocks__/cat-AM1-test-data-state-object';
import { catAM2TestDataStateObject } from '../__mocks__/cat-AM2-test-data-state-object';
import { catBTestDataStateObject } from '../__mocks__/cat-B-test-data-state-object';
import { catBETestDataStateObject } from '../__mocks__/cat-BE-test-data-state-object';
import { catCTestDataStateObject } from '../__mocks__/cat-C-test-data-state-object';
import { catCETestDataStateObject } from '../__mocks__/cat-CE-test-data-state-object';
import { catC1ETestDataStateObject } from '../__mocks__/cat-C1E-test-data-state-object';
import { catC1TestDataStateObject } from '../__mocks__/cat-C1-test-data-state-object';
import { catDTestDataStateObject } from '../__mocks__/cat-D-test-data-state-object';
import { catDETestDataStateObject } from '../__mocks__/cat-DE-test-data-state-object';
import { catD1ETestDataStateObject } from '../__mocks__/cat-D1E-test-data-state-object';
import { catD1TestDataStateObject } from '../__mocks__/cat-D1-test-data-state-object';
import { FaultCountBHelper } from '../cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from '../cat-be/fault-count.cat-be';
import { FaultCountCHelper } from '../cat-c/fault-count.cat-c';
import { FaultCountDHelper } from '../cat-d/fault-count.cat-d';
import { configureTestSuite } from 'ng-bullet';
import { FaultCountAM1Helper } from '../cat-a-mod1/fault-count.cat-a-mod1';
import { FaultCountAM2Helper } from '../cat-a-mod2/fault-count.cat-a-mod2';
import { catADI2TestDataStateObjectNoDrivingFaults, catADI2TestDataStateObjectShowMeFaults, catADI2TestDataStateObjectTellMeFaults, } from '../__mocks__/cat-ADI2-test-data-state-object';
import { FaultCountADIPart2Helper } from '../cat-adi-part2/fault-count.cat-adi-part2';
describe('FaultCountProvider', function () {
    var faultCountProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                FaultCountProvider,
            ],
        });
    });
    beforeEach(function () {
        faultCountProvider = TestBed.get(FaultCountProvider);
        spyOn(FaultCountADIPart2Helper, 'getDrivingFaultSumCountCatADIPart2').and.callThrough();
        spyOn(FaultCountADIPart2Helper, 'getSeriousFaultSumCountCatADIPart2').and.callThrough();
        spyOn(FaultCountADIPart2Helper, 'getDangerousFaultSumCountCatADIPart2').and.callThrough();
        spyOn(FaultCountBHelper, 'getDrivingFaultSumCountCatB').and.callThrough();
        spyOn(FaultCountBHelper, 'getSeriousFaultSumCountCatB').and.callThrough();
        spyOn(FaultCountBHelper, 'getDangerousFaultSumCountCatB').and.callThrough();
        spyOn(FaultCountBEHelper, 'getDrivingFaultSumCountCatBE').and.callThrough();
        spyOn(FaultCountBEHelper, 'getSeriousFaultSumCountCatBE').and.callThrough();
        spyOn(FaultCountBEHelper, 'getDangerousFaultSumCountCatBE').and.callThrough();
        spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatC').and.callThrough();
        spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatC').and.callThrough();
        spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatC').and.callThrough();
        spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatC1').and.callThrough();
        spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatC1').and.callThrough();
        spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatC1').and.callThrough();
        spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatCE').and.callThrough();
        spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatCE').and.callThrough();
        spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatCE').and.callThrough();
        spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatC1E').and.callThrough();
        spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatC1E').and.callThrough();
        spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatC1E').and.callThrough();
        spyOn(FaultCountAM1Helper, 'getDangerousFaultSumCountCatAM1').and.callThrough();
        spyOn(FaultCountAM1Helper, 'getSeriousFaultSumCountCatAM1').and.callThrough();
        spyOn(FaultCountAM1Helper, 'getRidingFaultSumCountCatAM1').and.callThrough();
        spyOn(FaultCountAM2Helper, 'getDangerousFaultSumCountCatAM2').and.callThrough();
        spyOn(FaultCountAM2Helper, 'getSeriousFaultSumCountCatAM2').and.callThrough();
        spyOn(FaultCountAM2Helper, 'getRidingFaultSumCountCatAM2').and.callThrough();
        spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatD').and.callThrough();
        spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatD').and.callThrough();
        spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatD').and.callThrough();
        spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatD1').and.callThrough();
        spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatD1').and.callThrough();
        spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatD1').and.callThrough();
        spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatDE').and.callThrough();
        spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatDE').and.callThrough();
        spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatDE').and.callThrough();
        spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatD1E').and.callThrough();
        spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatD1E').and.callThrough();
        spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatD1E').and.callThrough();
        spyOn(FaultCountDHelper, 'getSafetyQuestionsFaultCount').and.callThrough();
    });
    describe('getDrivingFaultSumCount', function () {
        describe('CAT ADI2', function () {
            it('shoud call the category ADI2 specific method for getting the riding fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("ADI2" /* ADI2 */, catADI2TestDataStateObjectNoDrivingFaults);
                expect(FaultCountADIPart2Helper.getDrivingFaultSumCountCatADIPart2).toHaveBeenCalled();
            });
        });
        describe('CAT A', function () {
            it('shoud call the category AM1 specific method for getting the riding fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("EUAM1" /* EUAM1 */, catAM1TestDataStateObject);
                expect(FaultCountAM1Helper.getRidingFaultSumCountCatAM1).toHaveBeenCalled();
            });
            it('shoud call the category AM2 specific method for getting the riding fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("EUAM2" /* EUAM2 */, catAM2TestDataStateObject);
                expect(FaultCountAM2Helper.getRidingFaultSumCountCatAM2).toHaveBeenCalled();
            });
        });
        describe('CAT B', function () {
            it('should call the category B specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("B" /* B */, catBTestDataStateObject);
                expect(FaultCountBHelper.getDrivingFaultSumCountCatB).toHaveBeenCalled();
            });
            it('should call the category BE specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("B+E" /* BE */, catBETestDataStateObject);
                expect(FaultCountBEHelper.getDrivingFaultSumCountCatBE).toHaveBeenCalled();
            });
        });
        describe('CAT C', function () {
            it('should call the category C specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("C" /* C */, catCTestDataStateObject);
                expect(FaultCountCHelper.getDrivingFaultSumCountCatC).toHaveBeenCalled();
            });
            it('should call the category CE specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("C+E" /* CE */, catCETestDataStateObject);
                expect(FaultCountCHelper.getDrivingFaultSumCountCatCE).toHaveBeenCalled();
            });
            it('should call the category C1E specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("C1+E" /* C1E */, catC1ETestDataStateObject);
                expect(FaultCountCHelper.getDrivingFaultSumCountCatC1E).toHaveBeenCalled();
            });
            it('should call the category C1 specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("C1" /* C1 */, catC1TestDataStateObject);
                expect(FaultCountCHelper.getDrivingFaultSumCountCatC1).toHaveBeenCalled();
            });
        });
        describe('CAT D', function () {
            it('should call the category D specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("D" /* D */, catDTestDataStateObject);
                expect(FaultCountDHelper.getDrivingFaultSumCountCatD).toHaveBeenCalled();
            });
            it('should call the category DE specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("D+E" /* DE */, catDETestDataStateObject);
                expect(FaultCountDHelper.getDrivingFaultSumCountCatDE).toHaveBeenCalled();
            });
            it('should call the category D1E specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("D1+E" /* D1E */, catD1ETestDataStateObject);
                expect(FaultCountDHelper.getDrivingFaultSumCountCatD1E).toHaveBeenCalled();
            });
            it('should call the category D1 specific method for getting the driving fault sum count', function () {
                faultCountProvider.getDrivingFaultSumCount("D1" /* D1 */, catD1TestDataStateObject);
                expect(FaultCountDHelper.getDrivingFaultSumCountCatD1).toHaveBeenCalled();
            });
        });
    });
    describe('getSeriousFaultSumCount', function () {
        describe('CAT ADI2', function () {
            it('shoud call the category ADI2 specific method for getting the riding fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("ADI2" /* ADI2 */, catADI2TestDataStateObjectNoDrivingFaults);
                expect(FaultCountADIPart2Helper.getSeriousFaultSumCountCatADIPart2).toHaveBeenCalled();
            });
        });
        describe('CAT A', function () {
            it('should call the category AM1 specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("EUAM1" /* EUAM1 */, catAM1TestDataStateObject);
                expect(FaultCountAM1Helper.getSeriousFaultSumCountCatAM1).toHaveBeenCalled();
            });
            it('should call the category AM2 specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("EUAM2" /* EUAM2 */, catAM2TestDataStateObject);
                expect(FaultCountAM2Helper.getSeriousFaultSumCountCatAM2).toHaveBeenCalled();
            });
        });
        describe('CAT B', function () {
            it('should call the category B specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("B" /* B */, catBTestDataStateObject);
                expect(FaultCountBHelper.getSeriousFaultSumCountCatB).toHaveBeenCalled();
            });
            it('should call the category BE specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("B+E" /* BE */, catBETestDataStateObject);
                expect(FaultCountBEHelper.getSeriousFaultSumCountCatBE).toHaveBeenCalled();
            });
        });
        describe('CAT C', function () {
            it('should call the category C specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("C" /* C */, catCTestDataStateObject);
                expect(FaultCountCHelper.getSeriousFaultSumCountCatC).toHaveBeenCalled();
            });
            it('should call the category CE specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("C+E" /* CE */, catCETestDataStateObject);
                expect(FaultCountCHelper.getSeriousFaultSumCountCatCE).toHaveBeenCalled();
            });
            it('should call the category C1 specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("C1" /* C1 */, catC1TestDataStateObject);
                expect(FaultCountCHelper.getSeriousFaultSumCountCatC1).toHaveBeenCalled();
            });
            it('should call the category C1E specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("C1+E" /* C1E */, catC1ETestDataStateObject);
                expect(FaultCountCHelper.getSeriousFaultSumCountCatC1E).toHaveBeenCalled();
            });
        });
        describe('CAT D', function () {
            it('should call the category D specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("D" /* D */, catDTestDataStateObject);
                expect(FaultCountDHelper.getSeriousFaultSumCountCatD).toHaveBeenCalled();
            });
            it('should call the category DE specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("D+E" /* DE */, catDETestDataStateObject);
                expect(FaultCountDHelper.getSeriousFaultSumCountCatDE).toHaveBeenCalled();
            });
            it('should call the category D1 specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("D1" /* D1 */, catD1TestDataStateObject);
                expect(FaultCountDHelper.getSeriousFaultSumCountCatD1).toHaveBeenCalled();
            });
            it('should call the category D1E specific method for getting the serious fault sum count', function () {
                faultCountProvider.getSeriousFaultSumCount("D1+E" /* D1E */, catD1ETestDataStateObject);
                expect(FaultCountDHelper.getSeriousFaultSumCountCatD1E).toHaveBeenCalled();
            });
        });
    });
    describe('getDangerousFaultSumCount', function () {
        describe('CAT ADI2', function () {
            it('shoud call the category ADI2 specific method for getting the riding fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("ADI2" /* ADI2 */, catADI2TestDataStateObjectNoDrivingFaults);
                expect(FaultCountADIPart2Helper.getDangerousFaultSumCountCatADIPart2).toHaveBeenCalled();
            });
        });
        describe('CAT A', function () {
            it('should call the category AM1 specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("EUAM1" /* EUAM1 */, catAM1TestDataStateObject);
                expect(FaultCountAM1Helper.getDangerousFaultSumCountCatAM1).toHaveBeenCalled();
            });
            it('should call the category AM2 specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("EUAM2" /* EUAM2 */, catAM2TestDataStateObject);
                expect(FaultCountAM2Helper.getDangerousFaultSumCountCatAM2).toHaveBeenCalled();
            });
        });
        describe('CAT B', function () {
            it('should call the category B specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("B" /* B */, catBTestDataStateObject);
                expect(FaultCountBHelper.getDangerousFaultSumCountCatB).toHaveBeenCalled();
            });
            it('should call the category BE specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("B+E" /* BE */, catBETestDataStateObject);
                expect(FaultCountBEHelper.getDangerousFaultSumCountCatBE).toHaveBeenCalled();
            });
        });
        describe('CAT C', function () {
            it('should call the category C specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("C" /* C */, catCTestDataStateObject);
                expect(FaultCountCHelper.getDangerousFaultSumCountCatC).toHaveBeenCalled();
            });
            it('should call the category C1 specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("C1" /* C1 */, catC1TestDataStateObject);
                expect(FaultCountCHelper.getDangerousFaultSumCountCatC1).toHaveBeenCalled();
            });
            it('should call the category CE specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("C+E" /* CE */, catCETestDataStateObject);
                expect(FaultCountCHelper.getDangerousFaultSumCountCatCE).toHaveBeenCalled();
            });
            it('should call the category C1E specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("C1+E" /* C1E */, catC1ETestDataStateObject);
                expect(FaultCountCHelper.getDangerousFaultSumCountCatC1E).toHaveBeenCalled();
            });
        });
        describe('CAT D', function () {
            it('should call the category D specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("D" /* D */, catDTestDataStateObject);
                expect(FaultCountDHelper.getDangerousFaultSumCountCatD).toHaveBeenCalled();
            });
            it('should call the category D1 specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("D1" /* D1 */, catD1TestDataStateObject);
                expect(FaultCountDHelper.getDangerousFaultSumCountCatD1).toHaveBeenCalled();
            });
            it('should call the category DE specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("D+E" /* DE */, catDETestDataStateObject);
                expect(FaultCountDHelper.getDangerousFaultSumCountCatDE).toHaveBeenCalled();
            });
            it('should call the category D1E specific method for getting the dangerous fault sum count', function () {
                faultCountProvider.getDangerousFaultSumCount("D1+E" /* D1E */, catD1ETestDataStateObject);
                expect(FaultCountDHelper.getDangerousFaultSumCountCatD1E).toHaveBeenCalled();
            });
        });
    });
    describe('getSafetyQuestionsFaultSumCount', function () {
        describe('CAT D', function () {
            it('should call the category D method for getting the safetyQuestions fault sum count', function () {
                faultCountProvider.getSafetyQuestionsFaultCount("D" /* D */, catDTestDataStateObject.safetyQuestions);
                expect(FaultCountDHelper.getSafetyQuestionsFaultCount).toHaveBeenCalled();
            });
            it('should call the category D method for getting the safetyQuestions fault sum count', function () {
                faultCountProvider.getSafetyQuestionsFaultCount("D+E" /* DE */, catDTestDataStateObject.safetyQuestions);
                expect(FaultCountDHelper.getSafetyQuestionsFaultCount).toHaveBeenCalled();
            });
            it('should call the category D method for getting the safetyQuestions fault sum count', function () {
                faultCountProvider.getSafetyQuestionsFaultCount("D1+E" /* D1E */, catDTestDataStateObject.safetyQuestions);
                expect(FaultCountDHelper.getSafetyQuestionsFaultCount).toHaveBeenCalled();
            });
            it('should call the category D method for getting the safetyQuestions fault sum count', function () {
                faultCountProvider.getSafetyQuestionsFaultCount("D1" /* D1 */, catDTestDataStateObject.safetyQuestions);
                expect(FaultCountDHelper.getSafetyQuestionsFaultCount).toHaveBeenCalled();
            });
            it('should return the correct number of driving faults', function () {
                var faultsState = {
                    questions: [
                        {
                            description: 'string',
                            outcome: 'DF',
                        },
                        {
                            description: 'string',
                            outcome: 'DF',
                        },
                        {
                            description: 'string',
                            outcome: 'P',
                        },
                    ],
                };
                expect(FaultCountDHelper.getSafetyQuestionsFaultCount(faultsState)).toEqual({ drivingFaults: 1 });
            });
        });
    });
    describe('getDrivingFaultSumCountCatB', function () {
        it('should return the driving fault for cat B count correctly', function () {
            expect(FaultCountBHelper.getDrivingFaultSumCountCatB(catBTestDataStateObject)).toBe(4);
        });
    });
    describe('getDrivingFaultSumCountCatBE', function () {
        it('should return the driving fault for cat BE count correctly', function () {
            expect(FaultCountBEHelper.getDrivingFaultSumCountCatBE(catBETestDataStateObject)).toBe(5);
        });
    });
    describe('getDrivingFaultSumCountCatC', function () {
        it('should return the driving fault for cat C count correctly', function () {
            expect(FaultCountCHelper.getDrivingFaultSumCountCatC(catCTestDataStateObject)).toBe(5);
        });
    });
    describe('getDrivingFaultSumCountCatC1', function () {
        it('should return the driving fault for cat C1 count correctly', function () {
            expect(FaultCountCHelper.getDrivingFaultSumCountCatC1(catC1TestDataStateObject)).toBe(5);
        });
    });
    describe('getDrivingFaultSumCountCatCE', function () {
        it('should return the driving fault for cat CE count correctly', function () {
            expect(FaultCountCHelper.getDrivingFaultSumCountCatCE(catCETestDataStateObject)).toBe(5);
        });
    });
    describe('getDrivingFaultSumCountCatC1E', function () {
        it('should return the driving fault for cat C1E count correctly', function () {
            expect(FaultCountCHelper.getDrivingFaultSumCountCatC1E(catC1ETestDataStateObject)).toBe(5);
        });
    });
    describe('getRidingFaultSumCountCatAM1', function () {
        it('should return the driving fault for cat AM1 count correctly', function () {
            expect(FaultCountAM1Helper.getRidingFaultSumCountCatAM1(catAM1TestDataStateObject)).toBe(5);
        });
    });
    describe('getDrivingFaultSumCountCatD', function () {
        it('should return the driving fault for cat D count correctly', function () {
            expect(FaultCountDHelper.getDrivingFaultSumCountCatD(catDTestDataStateObject)).toBe(6);
        });
    });
    describe('getDrivingFaultSumCountCatD1', function () {
        it('should return the driving fault for cat D1 count correctly', function () {
            expect(FaultCountDHelper.getDrivingFaultSumCountCatD1(catD1TestDataStateObject)).toBe(6);
        });
    });
    describe('getDrivingFaultSumCountCatDE', function () {
        it('should return the driving fault for cat DE count correctly', function () {
            expect(FaultCountDHelper.getDrivingFaultSumCountCatDE(catDETestDataStateObject)).toBe(6);
        });
    });
    describe('getDrivingFaultSumCountCatD1E', function () {
        it('should return the driving fault for cat D1E count correctly', function () {
            expect(FaultCountDHelper.getDrivingFaultSumCountCatD1E(catD1ETestDataStateObject)).toBe(6);
        });
    });
    describe('getSeriousFaultSumCountCatB', function () {
        it('should return the serious faults count', function () {
            expect(FaultCountBHelper.getSeriousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
        });
        it('should return the correct count of serious faults', function () {
            var failedState = __assign(__assign({}, catBTestDataStateObject), { manoeuvres: {
                    forwardPark: {
                        selected: true,
                        controlFault: CompetencyOutcome.S,
                    },
                }, controlledStop: {
                    selected: true,
                    fault: CompetencyOutcome.S,
                }, vehicleChecks: {
                    tellMeQuestion: {
                        outcome: CompetencyOutcome.DF,
                    },
                    showMeQuestion: {
                        outcome: CompetencyOutcome.S,
                    },
                }, eyesightTest: {
                    complete: true,
                    seriousFault: true,
                } });
            expect(FaultCountBHelper.getSeriousFaultSumCountCatB(failedState)).toBe(5);
        });
    });
    describe('getDangerousFaultSumCountCatB', function () {
        it('should return the dangerous faults count', function () {
            expect(FaultCountBHelper.getDangerousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
        });
        it('should return the correct number of dangerous faults', function () {
            var failedState = __assign(__assign({}, catBTestDataStateObject), { manoeuvres: {
                    forwardPark: {
                        selected: true,
                        controlFault: CompetencyOutcome.D,
                    },
                }, controlledStop: {
                    selected: true,
                    fault: CompetencyOutcome.D,
                }, vehicleChecks: {
                    tellMeQuestion: {
                        outcome: CompetencyOutcome.DF,
                    },
                    showMeQuestion: {
                        outcome: CompetencyOutcome.D,
                    },
                } });
            expect(FaultCountBHelper.getDangerousFaultSumCountCatB(failedState)).toBe(4);
        });
    });
    describe('getSeriousFaultSumCountCatBE', function () {
        it('should return the serious faults count', function () {
            expect(FaultCountBEHelper.getSeriousFaultSumCountCatBE(catBETestDataStateObject)).toBe(1);
        });
        it('should return the correct count of serious faults', function () {
            var failedState = __assign(__assign({}, catBETestDataStateObject), { vehicleChecks: {
                    tellMeQuestions: [{
                            code: 'string',
                            description: 'string',
                            outcome: 'DF',
                        }],
                    showMeQuestions: [{
                            code: 'string',
                            description: 'string',
                            outcome: 'DF',
                        }],
                }, eyesightTest: {
                    complete: true,
                    seriousFault: true,
                } });
            expect(FaultCountBEHelper.getSeriousFaultSumCountCatBE(failedState)).toBe(2);
        });
    });
    describe('getDangerousFaultSumCountCatBE', function () {
        it('should return the dangerous faults count', function () {
            expect(FaultCountBEHelper.getDangerousFaultSumCountCatBE(catBETestDataStateObject)).toBe(1);
        });
        it('should return the correct number of dangerous faults', function () {
            var failedState = __assign(__assign({}, catBETestDataStateObject), { vehicleChecks: {
                    tellMeQuestions: [{
                            code: 'string',
                            description: 'string',
                            outcome: 'DF',
                        }],
                    showMeQuestions: [{
                            code: 'string',
                            description: 'string',
                            outcome: 'DF',
                        }],
                } });
            expect(FaultCountBEHelper.getDangerousFaultSumCountCatBE(failedState)).toBe(1);
        });
    });
    describe('getDangerousFaultSumCountCatAM1', function () {
        it('should return the dangerous faults count', function () {
            expect(FaultCountAM1Helper.getDangerousFaultSumCountCatAM1(catAM1TestDataStateObject)).toBe(5);
        });
    });
    describe('getSeriousFaultSumCountCatAM1', function () {
        it('should return the serious faults count', function () {
            expect(FaultCountAM1Helper.getSeriousFaultSumCountCatAM1(catAM1TestDataStateObject)).toBe(5);
        });
    });
    describe('getTellMeFaultCount', function () {
        it('should return the tellMeQuestions faults count', function () {
            var expected = {
                drivingFaults: 2,
                seriousFaults: 0,
            };
            var returnValue = faultCountProvider.getTellMeFaultCount("ADI2" /* ADI2 */, catADI2TestDataStateObjectTellMeFaults.vehicleChecks);
            expect(returnValue).toEqual(expected);
        });
    });
    describe('getShowMeFaultCount', function () {
        it('should return the ShowMeQuestions faults count', function () {
            var expected = {
                drivingFaults: 2,
                seriousFaults: 0,
            };
            var returnValue = faultCountProvider.getShowMeFaultCount("ADI2" /* ADI2 */, catADI2TestDataStateObjectShowMeFaults.vehicleChecks);
            expect(returnValue).toEqual(expected);
        });
    });
});
//# sourceMappingURL=fault-count.spec.js.map