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
import { VehicleChecksCardCatBComponent } from '../vehicle-checks-card.cat-b';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('vehicleChecksCardSelector', function () {
    describe('getShowMeQuestionOutcome', function () {
        it('should return the show me question outcome', function () {
            var vehicleChecks = {
                showMeQuestion: {
                    outcome: CompetencyOutcome.D,
                },
                tellMeQuestion: {},
            };
            var result = VehicleChecksCardCatBComponent.getShowMeQuestionOutcome(vehicleChecks);
            expect(result).toBe(CompetencyOutcome.D);
            vehicleChecks = __assign(__assign({}, vehicleChecks), { showMeQuestion: {
                    outcome: CompetencyOutcome.DF,
                } });
            result = VehicleChecksCardCatBComponent.getShowMeQuestionOutcome(vehicleChecks);
            expect(result).toBe(CompetencyOutcome.DF);
        });
    });
    describe('tellMeQuestionHasFault', function () {
        it('should return true when theres a driving fault for tell me', function () {
            var vehicleChecks = {
                showMeQuestion: {},
                tellMeQuestion: {
                    outcome: CompetencyOutcome.DF,
                },
            };
            var result = VehicleChecksCardCatBComponent.tellMeQuestionHasFault(vehicleChecks);
            expect(result).toBe(true);
        });
        it('should return false when no tell me fault', function () {
            var vehicleChecks = {
                showMeQuestion: {},
                tellMeQuestion: {
                    outcome: CompetencyOutcome.P,
                },
            };
            var result = VehicleChecksCardCatBComponent.tellMeQuestionHasFault(vehicleChecks);
            expect(result).toBe(false);
        });
    });
    describe('hasVehicleChecksFault', function () {
        it('should return true if show me has a fault', function () {
            var vehicleChecks = {
                showMeQuestion: {
                    outcome: CompetencyOutcome.DF,
                },
                tellMeQuestion: {},
            };
            var result = VehicleChecksCardCatBComponent.hasVehicleChecksFault(vehicleChecks);
            expect(result).toBe(true);
        });
        it('should return true if tell me has a fault', function () {
            var vehicleChecks = {
                showMeQuestion: {},
                tellMeQuestion: {
                    outcome: CompetencyOutcome.DF,
                },
            };
            var result = VehicleChecksCardCatBComponent.hasVehicleChecksFault(vehicleChecks);
            expect(result).toBe(true);
        });
        it('should return false when no vehicle checks fault', function () {
            var vehicleChecks = {
                showMeQuestion: {
                    outcome: CompetencyOutcome.P,
                },
                tellMeQuestion: {
                    outcome: CompetencyOutcome.P,
                },
            };
            var result = VehicleChecksCardCatBComponent.hasVehicleChecksFault(vehicleChecks);
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=vehicle-checks-card.cat-b.selector.spec.js.map