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
import { hasSeriousFault, hasDangerousFault, getETAFaultText, getEcoFaultText, } from '../../common/test-data.selector';
import { getDrivingFaultCount, areTellMeQuestionsSelected, areTellMeQuestionsCorrect, hasVehicleChecksBeenCompletedCatADI2, hasEyesightTestGotSeriousFault, hasEyesightTestBeenCompleted, getManoeuvresADI2, hasManoeuvreBeenCompletedCatADIPart2, } from '../test-data.cat-adi-part2.selector';
import { Competencies } from '../../test-data.constants';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
describe('TestDataSelectors Cat ADI2', function () {
    var state = {
        drivingFaults: {
            controlsGears: 1,
        },
        seriousFaults: {
            awarenessPlanning: true,
        },
        dangerousFaults: {
            useOfSpeed: true,
        },
        testRequirements: {
            normalStart1: true,
            normalStart2: true,
            downhillStart: true,
            uphillStart: true,
        },
        ETA: {
            physical: false,
            verbal: false,
        },
        eco: {
            adviceGivenControl: false,
            adviceGivenPlanning: false,
        },
        manoeuvres: [{
                reverseRight: {
                    selected: true,
                    controlFault: CompetencyOutcome.DF,
                },
            }],
        vehicleChecks: {
            tellMeQuestions: [
                {
                    code: '',
                    outcome: CompetencyOutcome.DF,
                },
            ],
        },
        eyesightTest: {
            complete: true,
            seriousFault: false,
        },
    };
    describe('hasEyesightTestBeenCompleted', function () {
        it('should return true if the eyesight test is complete', function () {
            expect(hasEyesightTestBeenCompleted(state)).toBe(true);
        });
        it('should return false if the eyesight test is not complete', function () {
            var newState = __assign(__assign({}, state), { eyesightTest: { complete: false } });
            expect(hasEyesightTestBeenCompleted(newState)).toBe(false);
        });
    });
    describe('hasEyesightTestGotSeriousFault', function () {
        it('should return true if the eyesight test has a serious fault', function () {
            var newState = __assign(__assign({}, state), { eyesightTest: { seriousFault: true } });
            expect(hasEyesightTestGotSeriousFault(newState)).toBe(true);
        });
        it('should return false if the eyesight test does not have a serious fault', function () {
            expect(hasEyesightTestGotSeriousFault(state)).toBe(false);
        });
    });
    describe('getDrivingFaultCount', function () {
        it('should return the driving fault count', function () {
            expect(getDrivingFaultCount(state, Competencies.controlsGears)).toBe(1);
        });
        it('should return undefined when there hasnt been any driving faults', function () {
            expect(getDrivingFaultCount(state, Competencies.controlsParkingBrake)).toBeUndefined();
        });
    });
    describe('hasSeriousFault', function () {
        it('should return true if a competency has a serious fault', function () {
            expect(hasSeriousFault(state, Competencies.awarenessPlanning)).toEqual(true);
        });
        it('should return false if a competency does not have a serious fault', function () {
            expect(hasSeriousFault(state, Competencies.controlsClutch)).toBeFalsy();
        });
    });
    describe('hasDangerousFault', function () {
        it('should return true if a competency has a dangerous fault', function () {
            expect(hasDangerousFault(state, Competencies.useOfSpeed)).toEqual(true);
        });
        it('should return false if a competency does not have a dangerous fault', function () {
            expect(hasDangerousFault(state, Competencies.useOfMirrorsSignalling)).toBeFalsy();
        });
    });
    describe('getETAFaultText', function () {
        it('should return null if no ETA faults', function () {
            var result = getETAFaultText(state.ETA);
            expect(result).toBeUndefined();
        });
        it('should return `Physical and Verbal` if both ETA faults', function () {
            state.ETA.physical = true;
            state.ETA.verbal = true;
            var result = getETAFaultText(state.ETA);
            expect(result).toEqual('Physical and Verbal');
        });
        it('should return `Physical` if just physical ETA fault', function () {
            state.ETA.physical = true;
            state.ETA.verbal = false;
            var result = getETAFaultText(state.ETA);
            expect(result).toEqual('Physical');
        });
        it('should return `Verbal` if just verbal ETA fault', function () {
            state.ETA.physical = false;
            state.ETA.verbal = true;
            var result = getETAFaultText(state.ETA);
            expect(result).toEqual('Verbal');
        });
    });
    describe('getEcoFaultText', function () {
        it('should return null if no eco faults', function () {
            var result = getEcoFaultText(state.eco);
            expect(result).toBeUndefined();
        });
        it('should return `Control and Planning` if both eco faults', function () {
            state.eco.adviceGivenControl = true;
            state.eco.adviceGivenPlanning = true;
            var result = getEcoFaultText(state.eco);
            expect(result).toEqual('Control and Planning');
        });
        it('should return `Control` if just control eco fault', function () {
            state.eco.adviceGivenControl = true;
            state.eco.adviceGivenPlanning = false;
            var result = getEcoFaultText(state.eco);
            expect(result).toEqual('Control');
        });
        it('should return `Planning` if just planning eco fault', function () {
            state.eco.adviceGivenControl = false;
            state.eco.adviceGivenPlanning = true;
            var result = getEcoFaultText(state.eco);
            expect(result).toEqual('Planning');
        });
    });
    describe('getManoeuvres', function () {
        it('should retrieve the manoeuvres data when requested', function () {
            var result = getManoeuvresADI2(state);
            expect(result).toEqual(state.manoeuvres);
        });
    });
    describe('hasManoeuvreBeenCompleted', function () {
        it('should return false when no manoeuvres have been completed', function () {
            var state = [{}];
            expect(hasManoeuvreBeenCompletedCatADIPart2(state)).toEqual(false);
        });
        it('should return true when 2 manoeuvres have been completed', function () {
            var state = [
                {
                    reverseRight: {
                        selected: true,
                    },
                },
                {
                    reverseParkRoad: {
                        selected: true,
                    },
                },
            ];
            expect(hasManoeuvreBeenCompletedCatADIPart2(state)).toEqual(true);
        });
        it('should return false with only 1 manoeuvre completed', function () {
            var state = [
                {
                    reverseRight: {
                        selected: true,
                    },
                },
            ];
            expect(hasManoeuvreBeenCompletedCatADIPart2(state)).toEqual(false);
        });
    });
    describe('vehicle checks selector', function () {
        describe('areTellMeQuestionsSelected', function () {
            it('should return true if there is a tell me question selected', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            code: 'T1',
                            description: 'desc',
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                };
                expect(areTellMeQuestionsSelected(state)).toBe(true);
            });
            it('should return false if there is no tell me question selected', function () {
                expect(areTellMeQuestionsSelected({})).toBe(false);
            });
        });
        describe('areTellMeQuestionsCorrect', function () {
            var passedState = {
                tellMeQuestions: [
                    {
                        code: 'T1',
                        description: 'desc',
                        outcome: CompetencyOutcome.P,
                    },
                ],
            };
            it('should return true if the tell me question is marked as a pass', function () {
                expect(areTellMeQuestionsCorrect(passedState)).toBe(true);
            });
            it('should return false if the tell me question is marked as a driving fault', function () {
                var failedState = {
                    tellMeQuestions: [
                        {
                            code: 'T1',
                            description: 'desc',
                            outcome: CompetencyOutcome.D,
                        },
                    ],
                };
                expect(areTellMeQuestionsCorrect(failedState)).toBe(false);
            });
        });
        describe('hasVehicleChecksBeenCompleted', function () {
            it('should return true if vehicle checks have been completed with a pass & button has been selected', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.P,
                        },
                        {
                            outcome: CompetencyOutcome.P,
                        },
                        {
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                    vehicleChecksCompleted: true,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(true);
            });
            it('should return true if vehicle checks have been completed with driving faults', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.DF,
                        },
                        {
                            outcome: CompetencyOutcome.DF,
                        },
                        {
                            outcome: CompetencyOutcome.DF,
                        },
                    ],
                    vehicleChecksCompleted: true,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(true);
            });
            it('should return true if vehicle checks have been completed with a serious fault', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.S,
                        },
                        {
                            outcome: CompetencyOutcome.S,
                        },
                        {
                            outcome: CompetencyOutcome.S,
                        },
                    ],
                    vehicleChecksCompleted: true,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(true);
            });
            it('should return true if vehicle checks have been completed with a dangerous fault', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.D,
                        },
                        {
                            outcome: CompetencyOutcome.D,
                        },
                        {
                            outcome: CompetencyOutcome.D,
                        },
                    ],
                    vehicleChecksCompleted: true,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(true);
            });
            it('should return false if vehicleChecksCompleted is false', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.P,
                        },
                        {
                            outcome: CompetencyOutcome.P,
                        },
                        {
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                    vehicleChecksCompleted: false,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(false);
            });
            it('should return false with an empty array as its parameter', function () {
                var state = {
                    tellMeQuestions: [],
                    vehicleChecksCompleted: true,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(false);
            });
            it('should return false with an array under 2 items', function () {
                var state = {
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                    vehicleChecksCompleted: true,
                };
                expect(hasVehicleChecksBeenCompletedCatADI2(state)).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=test-data.cat-adi-part2.selector.spec.js.map