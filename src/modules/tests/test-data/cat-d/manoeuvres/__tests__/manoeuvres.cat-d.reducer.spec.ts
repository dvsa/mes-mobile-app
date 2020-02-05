import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { ManoeuvreTypes, ManoeuvreCompetencies } from '../../../test-data.constants';
import { manoeuvresCatDReducer } from '../manoeuvres.cat-d.reducer';
import {
  RecordManoeuvresSelection,
  AddManoeuvreDrivingFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
  AddManoeuvreComment,
  RemoveManoeuvreFault,
} from '../../../common/manoeuvres/manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('Manoeuvres CatD Reducer', () => {

  describe('RECORD_MANOEUVRES_SELECTION', () => {
    it('should add selected manoeuvre', () => {
      const state: CatDUniqueTypes.Manoeuvres = {};
      const result = manoeuvresCatDReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseLeft),
      );
      expect(result[ManoeuvreTypes.reverseLeft]).toEqual({ selected: true });
    });
  });
  describe('ADD_MANOEUVRE_DRIVING_FAULT', () => {
    it('should add a "DF" outcome to the selected manoeuvre', () => {
      const state: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatDReducer(
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
      const state: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatDReducer(
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
      const state: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatDReducer(
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
      const state: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true },
      };
      const result = manoeuvresCatDReducer(
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
      const state: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: { selected: true , controlFault: CompetencyOutcome.DF },
      };
      const result = manoeuvresCatDReducer(state, new RemoveManoeuvreFault({
        competency: ManoeuvreCompetencies.controlFault,
        manoeuvre: ManoeuvreTypes.reverseLeft,
      }));
      expect(result.reverseLeft.controlFault).toBeUndefined();
    });
  });
});
