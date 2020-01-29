import { changeMarkerReducer } from '../change-marker.reducer';
import { SetChangeMarker } from '../change-marker.actions';

describe('changeMarkerReducer', () => {
  it('should return the correct value ', () => {
    const result = changeMarkerReducer(null, new SetChangeMarker(true));
    expect(result).toBe(true);
  });
});
