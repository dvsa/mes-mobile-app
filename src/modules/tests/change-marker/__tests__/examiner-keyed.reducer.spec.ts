import { changeMarkerReducer } from '../change-marker';
import { SetChangeMarker } from '../change-marker.actions';

describe('changeMarkerReducer', () => {
  it('should default to false ', () => {
    const result = changeMarkerReducer(null, null);
    expect(result).toBe(false);
  });
  it('should return the correct value ', () => {
    const result = changeMarkerReducer(null, new SetChangeMarker(true));
    expect(result).toBe(true);
  });
});
