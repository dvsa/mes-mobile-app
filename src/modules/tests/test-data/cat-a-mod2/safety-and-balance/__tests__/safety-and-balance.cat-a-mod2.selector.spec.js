import { safetyAndBalanceQuestionsExist } from '../safety-and-balance.cat-a-mod2.selector';
describe('Vehicle Checks Selector Cat A Mod 2', function () {
    describe('vehicleChecksExist', function () {
        it('should return false if there are no vehicle checks entered', function () {
            var emptySafetyAndBalanceQuestions = {
                safetyQuestions: [{}, {}],
                balanceQuestions: [{}],
            };
            var result = safetyAndBalanceQuestionsExist(emptySafetyAndBalanceQuestions);
            expect(result).toBe(false);
        });
        it('should return true if there are safety questions entered', function () {
            var populatedSafetyAndBalanceQuestions = {
                safetyQuestions: [{
                        code: 'SQ1',
                        description: 'test SQ1',
                        outcome: 'P',
                    }],
                balanceQuestions: [{}],
            };
            var result = safetyAndBalanceQuestionsExist(populatedSafetyAndBalanceQuestions);
            expect(result).toBe(true);
        });
        it('should return true if there are balance questions entered', function () {
            var populatedSafetyAndBalanceQuestions = {
                safetyQuestions: [{}],
                balanceQuestions: [{
                        code: 'BQ1',
                        description: 'test BQ1',
                        outcome: 'DF',
                    }],
            };
            var result = safetyAndBalanceQuestionsExist(populatedSafetyAndBalanceQuestions);
            expect(result).toBe(true);
        });
        it('should return false if there are safety and balance questions but no outcome selected', function () {
            var populatedSafetyAndBalanceQuestions = {
                safetyQuestions: [{
                        code: 'SQ1',
                        description: 'test SQ1',
                        outcome: null,
                    }, {
                        code: 'SQ2',
                        description: 'test SQ2',
                        outcome: null,
                    }],
                balanceQuestions: [{
                        code: 'BQ1',
                        description: 'test BQ1',
                        outcome: null,
                    }],
            };
            var result = safetyAndBalanceQuestionsExist(populatedSafetyAndBalanceQuestions);
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=safety-and-balance.cat-a-mod2.selector.spec.js.map