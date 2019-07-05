import { rekeyReducer } from '../rekey.reducer';
import { MarkAsRekey } from '../rekey.actions';

describe('rekeyReducer', () => {
  it('should return true if MarkAsRekey action passed', () => {
    const result = rekeyReducer(null, new MarkAsRekey());
    expect(result).toBe(true);
  });
});
