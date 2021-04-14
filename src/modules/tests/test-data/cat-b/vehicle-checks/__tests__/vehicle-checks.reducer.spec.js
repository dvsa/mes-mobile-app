import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
import { vehicleChecksReducer } from '../vehicle-checks.reducer';
import { TellMeQuestionSelected, TellMeQuestionDrivingFault, AddShowMeTellMeComment, TellMeQuestionCorrect, ShowMeQuestionSelected, ShowMeQuestionPassed, ShowMeQuestionDrivingFault, ShowMeQuestionSeriousFault, ShowMeQuestionDangerousFault, ShowMeQuestionRemoveFault, } from '../vehicle-checks.actions';
describe('Vehicle Checks Reducer', function () {
    describe('TELL_ME_QUESTION_SELECTED', function () {
        it('should set the tell me question details', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
                shortName: 'name',
            };
            var state = {};
            var result = vehicleChecksReducer(state, new TellMeQuestionSelected(newQuestionPayload));
            expect(result.tellMeQuestion.code).toEqual('S1');
            expect(result.tellMeQuestion.description).toEqual('name');
        });
        it('should set the question details and reset outcome when a tell me question is selected', function () {
            var newQuestionPayload = {
                code: 'T1',
                description: 'desc',
                shortName: 'name',
            };
            var state = {
                tellMeQuestion: {
                    code: 'T2',
                    description: 'desc2',
                    outcome: CompetencyOutcome.P,
                },
            };
            var result = vehicleChecksReducer(state, new TellMeQuestionSelected(newQuestionPayload));
            expect(result.tellMeQuestion.code).toEqual('T1');
            expect(result.tellMeQuestion.description).toEqual('name');
            expect(result.tellMeQuestion.outcome).toBeUndefined();
        });
    });
    describe('TELL_ME_QUESTION_CORRECT', function () {
        it('should mark tell me question as pass when the action is received', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new TellMeQuestionCorrect());
            expect(result.tellMeQuestion.outcome).toEqual(CompetencyOutcome.P);
        });
    });
    describe('TELL_ME_QUESTION_DRIVING_FAULT', function () {
        it('should mark tell me question as driving fault when the action is received', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new TellMeQuestionDrivingFault());
            expect(result.tellMeQuestion.outcome).toEqual(CompetencyOutcome.DF);
        });
    });
    describe('ADD_SHOW_ME_TELL_ME_COMMENT', function () {
        it('should add a comment', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new AddShowMeTellMeComment('Test'));
            expect(result.showMeTellMeComments).toEqual('Test');
        });
    });
    describe('SHOW_ME_QUESTION_SELECTED', function () {
        it('should set the show me question details', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
                shortName: 'name',
            };
            var state = {};
            var result = vehicleChecksReducer(state, new ShowMeQuestionSelected(newQuestionPayload));
            expect(result.showMeQuestion.code).toEqual('S1');
            expect(result.showMeQuestion.description).toEqual('name');
        });
        it('should update the show me question details', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
                shortName: 'name',
            };
            var state = {
                showMeQuestion: {
                    outcome: 'S',
                    code: 'S2',
                    description: 'desc2',
                },
            };
            var result = vehicleChecksReducer(state, new ShowMeQuestionSelected(newQuestionPayload));
            expect(result.showMeQuestion.code).toEqual('S1');
            expect(result.showMeQuestion.outcome).toEqual('S');
            expect(result.showMeQuestion.description).toEqual('name');
        });
    });
    describe('SHOW_ME_QUESTION_PASSED', function () {
        it('should mark show me question as a pass', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new ShowMeQuestionPassed());
            expect(result.showMeQuestion.outcome).toEqual(CompetencyOutcome.P);
        });
    });
    describe('SHOW_ME_QUESTION_DRIVING_FAULT', function () {
        it('should mark show me question as driving fault when the action is received', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new ShowMeQuestionDrivingFault());
            expect(result.showMeQuestion.outcome).toEqual(CompetencyOutcome.DF);
        });
    });
    describe('SHOW_ME_QUESTION_SERIOUS_FAULT', function () {
        it('should mark show me question as serious fault when the action is received', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new ShowMeQuestionSeriousFault());
            expect(result.showMeQuestion.outcome).toEqual(CompetencyOutcome.S);
        });
    });
    describe('SHOW_ME_QUESTION_DANGEROUS_FAULT', function () {
        it('should mark show me question as dangerous fault when the action is received', function () {
            var state = {};
            var result = vehicleChecksReducer(state, new ShowMeQuestionDangerousFault());
            expect(result.showMeQuestion.outcome).toEqual(CompetencyOutcome.D);
        });
    });
    describe('SHOW_ME_QUESTION_REMOVE_FAULT', function () {
        it('should remove the show me question fault the action is received', function () {
            var state = {
                showMeQuestion: {
                    code: '1',
                    description: '2',
                    outcome: CompetencyOutcome.D,
                },
            };
            var result = vehicleChecksReducer(state, new ShowMeQuestionRemoveFault());
            expect(result.showMeQuestion.code).toEqual('1');
            expect(result.showMeQuestion.description).toEqual('2');
            expect(result.showMeQuestion.outcome).toBeUndefined();
        });
    });
});
//# sourceMappingURL=vehicle-checks.reducer.spec.js.map