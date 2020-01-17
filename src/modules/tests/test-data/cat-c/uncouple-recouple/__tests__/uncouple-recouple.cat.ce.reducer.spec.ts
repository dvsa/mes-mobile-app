import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { uncoupleRecoupleCatCEReducer } from '../uncouple-recouple.cat-ce.reducer';
import {
  ToggleUncoupleRecouple,
  UncoupleRecoupleAddDrivingFault,
  UncoupleRecoupleAddSeriousFault,
  UncoupleRecoupleAddDangerousFault,
  UncoupleRecoupleRemoveFault,
  AddUncoupleRecoupleComment,
} from '../../../common/uncouple-recouple/uncouple-recouple.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('uncoupleRecoupleCatCEReducer' , () => {

  describe('TOGGLE_UNCOUPLE_RECOUPLE', () => {
    it('should toggle the uncouple recouple (true when dispatched first time)', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatCEReducer(state, new ToggleUncoupleRecouple());
      expect(result.selected).toEqual(true);
    });
    it('should remove the uncouple recouple property when dispatched second time', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const modifiedState = uncoupleRecoupleCatCEReducer(state, new ToggleUncoupleRecouple());
      const result = uncoupleRecoupleCatCEReducer(modifiedState, new ToggleUncoupleRecouple());
      expect(result.selected).toEqual(false);
    });
  });

  describe('UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT', () => {
    it('should add the correct fault', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatCEReducer(state, new UncoupleRecoupleAddDrivingFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toEqual(CompetencyOutcome.DF);
    });
  });

  describe('UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT', () => {
    it('should add the correct fault', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatCEReducer(state, new UncoupleRecoupleAddSeriousFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toEqual(CompetencyOutcome.S);
    });
  });

  describe('UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT', () => {
    it('should add the correct fault', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatCEReducer(state, new UncoupleRecoupleAddDangerousFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toEqual(CompetencyOutcome.D);
    });
  });

  describe('UNCOUPLE_RECOUPLE_REMOVE_FAULT', () => {
    it('should remove the fault', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const modifiedState = uncoupleRecoupleCatCEReducer(state, new UncoupleRecoupleAddDangerousFault());
      const result = uncoupleRecoupleCatCEReducer(modifiedState, new UncoupleRecoupleRemoveFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toBeUndefined();
      expect(result.faultComments).toBeUndefined();
    });
  });

  describe('ADD_UNCOUPLE_RECOUPLE_COMMENT', () => {
    it('should add a fault comment', () => {
      const state: CatCEUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatCEReducer(state, new AddUncoupleRecoupleComment('Test'));
      expect(result.faultComments).toEqual('Test');
    });
  });
});
