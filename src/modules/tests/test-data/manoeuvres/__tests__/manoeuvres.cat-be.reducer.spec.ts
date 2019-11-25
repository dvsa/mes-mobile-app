import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ManoeuvreTypes, ManoeuvreCompetencies } from '../../test-data.constants';
import { manoeuvresCatBEReducer } from '../manoeuvres.cat-be.reducer';
import {
  RecordManoeuvresSelection,
  AddManoeuvreDrivingFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
  AddManoeuvreComment,
  RemoveManoeuvreFault,
} from '../manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

describe('Manoeuvres Reducer', () => {

  describe('RECORD_MANOEUVRES_SELECTION', () => {
    it('should add selected manoeuvre', () => {
      const state: CatBEUniqueTypes.Manoeuvres = {};
      const result = manoeuvresCatBEReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseLeft),
      );
      expect(result[ManoeuvreTypes.reverseLeft]).toEqual({ selected: true });
    });
  });
  describe('ADD_MANOEUVRE_DRIVING_FAULT', () => {
    it('should add a "DF" outcome to the selected manoeuvre', () => {
      const state: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatBEReducer(
          state,
          new AddManoeuvreDrivingFault({
            manoeuvre: ManoeuvreTypes.reverseLeft,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
      expect(result.reverseLeft.controlFault).toEqual(CompetencyOutcome.DF);
    });
  });

  describe('ADD_MANOEUVRE_SERIOUS_FAULT', () => {
    it('should add a "S" outcome to the selected manoeuvre', () => {
      const state: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatBEReducer(
          state,
          new AddManoeuvreSeriousFault({
            manoeuvre: ManoeuvreTypes.reverseLeft,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
      expect(result.reverseLeft.controlFault).toEqual(CompetencyOutcome.S);
    });
  });

  describe('ADD_MANOEUVRE_DANGEROUS_FAULT', () => {
    it('should add a "D" outcome to the selected manoeuvre', () => {
      const state: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatBEReducer(
          state,
          new AddManoeuvreDangerousFault({
            manoeuvre: ManoeuvreTypes.reverseLeft,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
      expect(result.reverseLeft.controlFault).toEqual(CompetencyOutcome.D);
    });
  });

  describe('ADD_MANOEUVRE_COMMENT', () => {
    it('should add a comment to the selected Manoeuvre', () => {
      const state: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatBEReducer(
        state,
        new AddManoeuvreComment(
          ManoeuvreTypes.reverseLeft,
          CompetencyOutcome.S,
          'control',
          'comments',
        ),
      );
      expect(result.reverseLeft.controlFaultComments).toEqual('comments');
    });
  });

  describe('REMOVE_MANOEUVRE_FAULT', () => {
    it('should remove the fault from a manoeuvre', () => {
      const state: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true , controlFault: CompetencyOutcome.DF },
      };
      const result = manoeuvresCatBEReducer(state, new RemoveManoeuvreFault({
        competency: ManoeuvreCompetencies.controlFault,
        manoeuvre: ManoeuvreTypes.reverseLeft,
      }));
      expect(result.reverseLeft.controlFault).toBeUndefined();
    });
  });
});
