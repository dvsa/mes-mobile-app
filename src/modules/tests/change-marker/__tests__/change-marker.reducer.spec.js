import { changeMarkerReducer } from '../change-marker';
import { SetChangeMarker } from '../change-marker.actions';
describe('changeMarkerReducer', function () {
    it('should return the correct value ', function () {
        var result = changeMarkerReducer(null, new SetChangeMarker(true));
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=change-marker.reducer.spec.js.map