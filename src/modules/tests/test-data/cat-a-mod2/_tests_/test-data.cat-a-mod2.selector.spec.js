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
import { hasSeriousFault, hasDangerousFault, getETAFaultText, getEcoFaultText, getShowMeQuestionOptions, } from '../../common/test-data.selector';
import { getDrivingFaultCount, haveSafetyAndBalanceQuestionsBeenCompleted, } from '../test-data.cat-a-mod2.selector';
import { Competencies } from '../../test-data.constants';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../../pages/office/office-behaviour-map';
import { hasEyesightTestBeenCompleted, hasEyesightTestGotSeriousFault } from '../../common/eyesight-test/eyesight-test.selector';
describe('TestDataSelectors CAT A Mod 2', function () {
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
        ETA: {
            verbal: false,
        },
        eco: {
            adviceGivenControl: false,
            adviceGivenPlanning: false,
        },
        safetyAndBalanceQuestions: {
            balanceQuestions: [
                {
                    code: '',
                    outcome: CompetencyOutcome.DF,
                },
            ],
            safetyQuestions: [
                {
                    code: '',
                    outcome: CompetencyOutcome.DF,
                },
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
            expect(hasEyesightTestBeenCompleted(state.eyesightTest)).toBe(true);
        });
        it('should return false if the eyesight test is not complete', function () {
            var newState = __assign(__assign({}, state), { eyesightTest: { complete: false } });
            expect(hasEyesightTestBeenCompleted(newState.eyesightTest)).toBe(false);
        });
    });
    describe('hasEyesightTestGotSeriousFault', function () {
        it('should return true if the eyesight test has a serious fault', function () {
            var newState = __assign(__assign({}, state), { eyesightTest: { seriousFault: true } });
            expect(hasEyesightTestGotSeriousFault(newState.eyesightTest)).toBe(true);
        });
        it('should return false if the eyesight test does not have a serious fault', function () {
            expect(hasEyesightTestGotSeriousFault(state.eyesightTest)).toBe(false);
        });
    });
    describe('getSafetyQuestionOptions', function () {
        var outcomeBehaviourMapProvider = new OutcomeBehaviourMapProvider();
        outcomeBehaviourMapProvider.setBehaviourMap(behaviourMap);
        var safetyQuestions = [
            {
                code: 'SQ1',
                description: 'SQ1 Desc',
                shortName: 'SQ1 short',
            },
            {
                code: 'SQ2',
                description: 'SQ2 Desc',
                shortName: 'SQ2 short',
            },
            {
                code: 'N/A',
                description: 'Not applicable',
                shortName: 'Not applicable',
            },
        ];
        it('should return the list of questions without N/A if outcome field does not have showNotApplicable set', function () {
            var result = getShowMeQuestionOptions(safetyQuestions, '1', outcomeBehaviourMapProvider);
            expect(result.length).toBe(2);
            expect(result[0].code).toBe('SQ1');
            expect(result[1].code).toBe('SQ2');
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
        it('should return `Verbal` if just verbal ETA fault', function () {
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
    describe('haveSafetyandBalanceQuestionsBeenCompleted', function () {
        it('should return true if safety and balance questions have been completed with a pass', function () {
            var state = {
                safetyQuestions: [
                    {
                        outcome: CompetencyOutcome.P,
                    },
                    {
                        outcome: CompetencyOutcome.P,
                    },
                ],
                balanceQuestions: [
                    {
                        outcome: CompetencyOutcome.P,
                    },
                ],
            };
            expect(haveSafetyAndBalanceQuestionsBeenCompleted(state)).toEqual(true);
        });
        it('should return true if safety and balance questions have been completed with a driving fault', function () {
            var state = {
                safetyQuestions: [
                    {
                        outcome: CompetencyOutcome.DF,
                    },
                    {
                        outcome: CompetencyOutcome.DF,
                    },
                ],
                balanceQuestions: [
                    {
                        outcome: CompetencyOutcome.DF,
                    },
                ],
            };
            expect(haveSafetyAndBalanceQuestionsBeenCompleted(state)).toEqual(true);
        });
        it('should return false if safety question outcome is not defined', function () {
            var state = {
                safetyQuestions: [],
                balanceQuestions: [
                    {
                        outcome: CompetencyOutcome.DF,
                    },
                ],
            };
            expect(haveSafetyAndBalanceQuestionsBeenCompleted(state)).toEqual(false);
        });
        it('should return false if balance question outcome is not defined', function () {
            var state = {
                safetyQuestions: [
                    {
                        outcome: CompetencyOutcome.DF,
                    },
                    {
                        outcome: CompetencyOutcome.DF,
                    },
                ],
                balanceQuestions: [],
            };
            expect(haveSafetyAndBalanceQuestionsBeenCompleted(state)).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-data.cat-a-mod2.selector.spec.js.map