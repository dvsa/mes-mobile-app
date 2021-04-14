import { nullReducer } from '../null.reducer';
describe('nullReducer', function () {
    it('should always return null', function () {
        expect(nullReducer({}, {})).toEqual(null);
    });
});
//# sourceMappingURL=null.reducer.spec.js.map