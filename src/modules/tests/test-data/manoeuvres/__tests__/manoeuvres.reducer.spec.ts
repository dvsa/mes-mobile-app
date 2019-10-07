import { Manoeuvres } from '@dvsa/mes-test-schema/categories/B';
import { ManoeuvreTypes, ManoeuvreCompetencies } from '../../test-data.constants';
import { manoeuvresReducer } from '../manoeuvres.reducer';
import {
  RecordManoeuvresSelection,
  AddManoeuvreDrivingFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
} from '../manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

describe('Manoeuvres Reducer', () => {

  describe('RECORD_MANOEUVRES_SELECTION', () => {
    it('should add selected manoeuvre', () => {
      const state: Manoeuvres = {};
      const result = manoeuvresReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
      );
      expect(result[ManoeuvreTypes.reverseParkRoad]).toEqual({ selected: true });
    });
    it('should replace current with selected manoeuvre', () => {
      const state: Manoeuvres = {
        reverseParkCarpark: {
          selected: true,
        },
      };
      const result = manoeuvresReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
      );
      expect(result[ManoeuvreTypes.reverseParkRoad]).toEqual({ selected: true });
      expect(result.reverseParkCarpark).toBeUndefined();
    });
    it('should wipe any outcome data from other manoeuvres when changing selected manoeuvre', () => {
      const state: Manoeuvres = {
        reverseParkCarpark: {
          selected: true,
          controlFault: 'S',
        },
      };
      const result = manoeuvresReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
      );
      expect(result[ManoeuvreTypes.reverseParkRoad]).toBeDefined();
      expect(result[ManoeuvreTypes.reverseParkRoad].selected).toEqual(true);
      expect(result[ManoeuvreTypes.reverseParkCarpark]).toBeUndefined();
    });

    describe('ADD_MANOEUVRE_DRIVING_FAULT', () => {
      it('should add a "DF" outcome to the selected manoeuvre', () => {
        const state: Manoeuvres = {
          reverseParkRoad: { selected: true },
        };
        const result = manoeuvresReducer(
          state,
          new AddManoeuvreDrivingFault({
            manoeuvre: ManoeuvreTypes.reverseParkRoad,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
        expect(result.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.DF);
      });
    });

    describe('ADD_MANOEUVRE_SERIOUS_FAULT', () => {
      it('should add a "S" outcome to the selected manoeuvre', () => {
        const state: Manoeuvres = {
          reverseParkRoad: { selected: true },
        };
        const result = manoeuvresReducer(
          state,
          new AddManoeuvreSeriousFault({
            manoeuvre: ManoeuvreTypes.reverseParkRoad,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
        expect(result.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.S);
      });
    });

    describe('ADD_MANOEUVRE_DANGEROUS_FAULT', () => {
      it('should add a "D" outcome to the selected manoeuvre', () => {
        const state: Manoeuvres = {
          reverseParkRoad: { selected: true },
        };
        const result = manoeuvresReducer(
          state,
          new AddManoeuvreDangerousFault({
            manoeuvre: ManoeuvreTypes.reverseParkRoad,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
        expect(result.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.D);
      });
    });
  });

});
