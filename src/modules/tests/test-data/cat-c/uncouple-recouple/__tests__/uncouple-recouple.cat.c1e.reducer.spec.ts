import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { uncoupleRecoupleCatC1EReducer } from '../uncouple-recouple.cat-c1e.reducer';
import {
  ToggleUncoupleRecouple,
  UncoupleRecoupleAddDrivingFault,
  UncoupleRecoupleAddSeriousFault,
  UncoupleRecoupleAddDangerousFault,
  UncoupleRecoupleRemoveFault,
  AddUncoupleRecoupleComment,
} from '../../../common/uncouple-recouple/uncouple-recouple.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('uncoupleRecoupleCatC1EReducer' , () => {

  describe('TOGGLE_UNCOUPLE_RECOUPLE', () => {
    it('should toggle the uncouple recouple (true when dispatched first time)', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatC1EReducer(state, new ToggleUncoupleRecouple());
      expect(result.selected).toEqual(true);
    });
    it('should remove the uncouple recouple property when dispatched second time', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const modifiedState = uncoupleRecoupleCatC1EReducer(state, new ToggleUncoupleRecouple());
      const result = uncoupleRecoupleCatC1EReducer(modifiedState, new ToggleUncoupleRecouple());
      expect(result.selected).toEqual(false);
    });
  });

  describe('UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT', () => {
    it('should add the correct fault', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatC1EReducer(state, new UncoupleRecoupleAddDrivingFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toEqual(CompetencyOutcome.DF);
    });
  });

  describe('UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT', () => {
    it('should add the correct fault', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatC1EReducer(state, new UncoupleRecoupleAddSeriousFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toEqual(CompetencyOutcome.S);
    });
  });

  describe('UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT', () => {
    it('should add the correct fault', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatC1EReducer(state, new UncoupleRecoupleAddDangerousFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toEqual(CompetencyOutcome.D);
    });
  });

  describe('UNCOUPLE_RECOUPLE_REMOVE_FAULT', () => {
    it('should remove the fault', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const modifiedState = uncoupleRecoupleCatC1EReducer(state, new UncoupleRecoupleAddDangerousFault());
      const result = uncoupleRecoupleCatC1EReducer(modifiedState, new UncoupleRecoupleRemoveFault());
      expect(result.selected).toEqual(true);
      expect(result.fault).toBeUndefined();
      expect(result.faultComments).toBeUndefined();
    });
  });

  describe('ADD_UNCOUPLE_RECOUPLE_COMMENT', () => {
    it('should add a fault comment', () => {
      const state: CatC1EUniqueTypes.UncoupleRecouple = {};
      const result = uncoupleRecoupleCatC1EReducer(state, new AddUncoupleRecoupleComment('Test'));
      expect(result.faultComments).toEqual('Test');
    });
  });
});