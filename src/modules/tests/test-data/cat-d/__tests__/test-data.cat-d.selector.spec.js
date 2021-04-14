import { hasSeriousFault, hasDangerousFault, getETAFaultText, getEcoFaultText, } from '../../common/test-data.selector';
import { getDrivingFaultCount, getManoeuvres, hasManoeuvreBeenCompletedCatD, areTellMeQuestionsSelected, areTellMeQuestionsCorrect, hasVehicleChecksBeenCompletedCatD, } from '../test-data.cat-d.selector';
import { Competencies } from '../../test-data.constants';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
describe('TestDataSelectors', function () {
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
            angledStartControlledStop: true,
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
        manoeuvres: {
            reverseLeft: {
                selected: true,
                controlFault: CompetencyOutcome.DF,
            },
        },
        vehicleChecks: {
            tellMeQuestions: [
                {
                    code: '',
                    outcome: CompetencyOutcome.DF,
                },
            ],
            showMeQuestions: [
                {
                    code: '',
                    outcome: CompetencyOutcome.DF,
                },
            ],
        },
        safetyQuestions: {
            questions: [
                {
                    description: '',
                    outcome: CompetencyOutcome.DF,
                },
            ],
        },
    };
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
        it('should retrive the manoeuvres data when requested', function () {
            var result = getManoeuvres(state);
            expect(result).toEqual(state.manoeuvres);
        });
    });
    describe('hasManoeuvreBeenCompleted', function () {
        it('should return false when no manoeuvres have been completed', function () {
            var state = {
                manoeuvres: {},
            };
            expect(hasManoeuvreBeenCompletedCatD(state)).toBeFalsy();
        });
        it('should return true when a manoeuvre has been completed', function () {
            var state = {
                manoeuvres: {
                    reverseLeft: { selected: true },
                },
            };
            expect(hasManoeuvreBeenCompletedCatD(state)).toEqual(true);
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
            it('should return true if vehicle checks have been completed with a pass', function () {
                var state = {
                    vehicleChecks: {
                        showMeQuestions: [
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
                        tellMeQuestions: [
                            {
                                outcome: CompetencyOutcome.P,
                            },
                            {
                                outcome: CompetencyOutcome.P,
                            },
                        ],
                    },
                };
                expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
            });
            it('should return true if vehicle checks have been completed with a driving fault', function () {
                var state = {
                    vehicleChecks: {
                        showMeQuestions: [
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
                        tellMeQuestions: [
                            {
                                outcome: CompetencyOutcome.DF,
                            },
                            {
                                outcome: CompetencyOutcome.DF,
                            },
                        ],
                    },
                };
                expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
            });
            it('should return true if vehicle checks have been completed with a serious fault', function () {
                var state = {
                    vehicleChecks: {
                        showMeQuestions: [
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
                        tellMeQuestions: [
                            {
                                outcome: CompetencyOutcome.S,
                            },
                            {
                                outcome: CompetencyOutcome.S,
                            },
                        ],
                    },
                };
                expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
            });
            it('should return true if vehicle checks have been completed with a dangerous fault', function () {
                var state = {
                    vehicleChecks: {
                        showMeQuestions: [
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
                        tellMeQuestions: [
                            {
                                outcome: CompetencyOutcome.D,
                            },
                            {
                                outcome: CompetencyOutcome.D,
                            },
                        ],
                    },
                };
                expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
            });
            it('should return false if show me question outcome is not defined', function () {
                var state = {
                    vehicleChecks: {
                        showMeQuestions: [],
                        tellMeQuestions: [
                            {
                                outcome: CompetencyOutcome.DF,
                            },
                            {
                                outcome: CompetencyOutcome.DF,
                            },
                        ],
                    },
                };
                expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=test-data.cat-d.selector.spec.js.map