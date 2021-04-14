import { getManoeuvres, getVehicleChecks, hasManoeuvreBeenCompletedCatHomeTest, hasVehicleChecksBeenCompletedCatHomeTest, } from '../test-data.cat-home.selector';
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
            angledStart: true,
            uphillStartDesignatedStart: true,
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
    };
    describe('getManoeuvres', function () {
        it('should retrieve the manoeuvres data when requested', function () {
            var result = getManoeuvres(state);
            expect(result).toEqual(state.manoeuvres);
        });
    });
    describe('hasManoeuvreBeenCompleted', function () {
        it('should return undefined when manoeuvres are not present', function () {
            var state = {};
            expect(hasManoeuvreBeenCompletedCatHomeTest(state)).toEqual(undefined);
        });
        it('should return false when no manoeuvres have been completed', function () {
            var state = {
                manoeuvres: {},
            };
            expect(hasManoeuvreBeenCompletedCatHomeTest(state)).toBeFalsy();
        });
        it('should return true when a manoeuvre has been completed', function () {
            var state = {
                manoeuvres: {
                    reverseLeft: { selected: true },
                },
            };
            expect(hasManoeuvreBeenCompletedCatHomeTest(state)).toEqual(true);
        });
    });
    describe('getVehicleChecks', function () {
        it('should retrieve the vehicle checks data when requested', function () {
            var result = getVehicleChecks(state);
            expect(result).toEqual(state.vehicleChecks);
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
                    ],
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                },
            };
            expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
        });
        it('should return true if vehicle checks have been completed with a driving fault', function () {
            var state = {
                vehicleChecks: {
                    showMeQuestions: [
                        {
                            outcome: CompetencyOutcome.DF,
                        },
                    ],
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.DF,
                        },
                    ],
                },
            };
            expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
        });
        it('should return true if vehicle checks have been completed with a serious fault', function () {
            var state = {
                vehicleChecks: {
                    showMeQuestions: [
                        {
                            outcome: CompetencyOutcome.S,
                        },
                    ],
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.S,
                        },
                    ],
                },
            };
            expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
        });
        it('should return true if vehicle checks have been completed with a dangerous fault', function () {
            var state = {
                vehicleChecks: {
                    showMeQuestions: [
                        {
                            outcome: CompetencyOutcome.D,
                        },
                    ],
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.D,
                        },
                    ],
                },
            };
            expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
        });
        it('should return false if show me question outcome is not defined', function () {
            var state = {
                vehicleChecks: {
                    showMeQuestions: [],
                    tellMeQuestions: [
                        {
                            outcome: CompetencyOutcome.DF,
                        },
                    ],
                },
            };
            expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-data.cat-home.selector.spec.js.map