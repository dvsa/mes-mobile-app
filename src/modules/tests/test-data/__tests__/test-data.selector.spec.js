import { getShowMeQuestionOptions, } from '../common/test-data.selector';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../pages/office/office-behaviour-map';
describe('TestDataSelectors', function () {
    describe('getShowMeQuestionOptions', function () {
        var outcomeBehaviourMapProvider = new OutcomeBehaviourMapProvider();
        outcomeBehaviourMapProvider.setBehaviourMap(behaviourMap);
        var showMeQuestions = [
            {
                code: 'S1',
                description: 'S1 Desc',
                shortName: 'S1 short',
            },
            {
                code: 'S2',
                description: 'S2 Desc',
                shortName: 'S2 short',
            },
            {
                code: 'N/A',
                description: 'Not applicable',
                shortName: 'Not applicable',
            },
        ];
        it('should return the list of questions without N/A if outcome field does not have showNotApplicable set', function () {
            var result = getShowMeQuestionOptions(showMeQuestions, '1', outcomeBehaviourMapProvider);
            expect(result.length).toBe(2);
            expect(result[0].code).toBe('S1');
            expect(result[1].code).toBe('S2');
        });
        it('should return extra question if outcome showNotApplicable set', function () {
            var result = getShowMeQuestionOptions(showMeQuestions, '4', outcomeBehaviourMapProvider);
            expect(result.length).toBe(3);
            expect(result[2].code).toBe('N/A');
        });
    });
});
//# sourceMappingURL=test-data.selector.spec.js.map