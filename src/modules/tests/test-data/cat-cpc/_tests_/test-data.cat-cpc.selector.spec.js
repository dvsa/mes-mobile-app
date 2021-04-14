import { getCombination, getQuestion1, getQuestion2, getQuestion3, getQuestion4, getQuestion5, getTotalPercent, } from '../test-data.cat-cpc.selector';
import { question, question5 } from './test-data.cat-cpc.mock';
describe('CPC TestDataSelectors', function () {
    var state = {
        combination: 'LGV1',
        question1: question('3'),
        question2: question('8'),
        question3: question('2'),
        question4: question('6'),
        question5: question5(),
        totalPercent: 85,
    };
    describe('getCombination', function () {
        it('should return the value of the combination set', function () {
            expect(getCombination(state)).toEqual('LGV1');
        });
    });
    describe('getQuestion1', function () {
        it('should return the value of the code', function () {
            expect(getQuestion1(state).questionCode).toEqual('Q03');
        });
    });
    describe('getQuestion2', function () {
        it('should return the value of the code', function () {
            expect(getQuestion2(state).questionCode).toEqual('Q08');
        });
    });
    describe('getQuestion3', function () {
        it('should return the value of the code', function () {
            expect(getQuestion3(state).questionCode).toEqual('Q02');
        });
    });
    describe('getQuestion4', function () {
        it('should return the value of the code', function () {
            expect(getQuestion4(state).questionCode).toEqual('Q06');
        });
    });
    describe('getQuestion5', function () {
        it('should return the value of the code', function () {
            expect(getQuestion5(state).questionCode).toEqual('Q05');
        });
    });
    describe('getTotalPercent', function () {
        it('should return the value of the total percentage score of test', function () {
            expect(getTotalPercent(state)).toEqual(85);
        });
    });
});
//# sourceMappingURL=test-data.cat-cpc.selector.spec.js.map