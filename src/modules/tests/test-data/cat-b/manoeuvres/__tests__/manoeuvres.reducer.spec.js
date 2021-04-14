import { ManoeuvreTypes, ManoeuvreCompetencies } from '../../../test-data.constants';
import { manoeuvresReducer } from '../manoeuvres.reducer';
import { RecordManoeuvresSelection, AddManoeuvreDrivingFault, AddManoeuvreSeriousFault, AddManoeuvreDangerousFault, AddManoeuvreComment, RemoveManoeuvreFault, } from '../../../common/manoeuvres/manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('Manoeuvres Reducer', function () {
    describe('RECORD_MANOEUVRES_SELECTION', function () {
        it('should add selected manoeuvre', function () {
            var state = {};
            var result = manoeuvresReducer(state, new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad));
            expect(result[ManoeuvreTypes.reverseParkRoad]).toEqual({ selected: true });
        });
        it('should replace current with selected manoeuvre', function () {
            var state = {
                reverseParkCarpark: {
                    selected: true,
                },
            };
            var result = manoeuvresReducer(state, new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad));
            expect(result[ManoeuvreTypes.reverseParkRoad]).toEqual({ selected: true });
            expect(result.reverseParkCarpark).toBeUndefined();
        });
        it('should wipe any outcome data from other manoeuvres when changing selected manoeuvre', function () {
            var state = {
                reverseParkCarpark: {
                    selected: true,
                    controlFault: 'S',
                },
            };
            var result = manoeuvresReducer(state, new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad));
            expect(result[ManoeuvreTypes.reverseParkRoad]).toBeDefined();
            expect(result[ManoeuvreTypes.reverseParkRoad].selected).toEqual(true);
            expect(result[ManoeuvreTypes.reverseParkCarpark]).toBeUndefined();
        });
    });
    describe('ADD_MANOEUVRE_DRIVING_FAULT', function () {
        it('should add a "DF" outcome to the selected manoeuvre', function () {
            var state = {
                reverseParkRoad: { selected: true },
            };
            var result = manoeuvresReducer(state, new AddManoeuvreDrivingFault({
                manoeuvre: ManoeuvreTypes.reverseParkRoad,
                competency: ManoeuvreCompetencies.controlFault,
            }));
            expect(result.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.DF);
        });
    });
    describe('ADD_MANOEUVRE_SERIOUS_FAULT', function () {
        it('should add a "S" outcome to the selected manoeuvre', function () {
            var state = {
                reverseParkRoad: { selected: true },
            };
            var result = manoeuvresReducer(state, new AddManoeuvreSeriousFault({
                manoeuvre: ManoeuvreTypes.reverseParkRoad,
                competency: ManoeuvreCompetencies.controlFault,
            }));
            expect(result.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.S);
        });
    });
    describe('ADD_MANOEUVRE_DANGEROUS_FAULT', function () {
        it('should add a "D" outcome to the selected manoeuvre', function () {
            var state = {
                reverseParkRoad: { selected: true },
            };
            var result = manoeuvresReducer(state, new AddManoeuvreDangerousFault({
                manoeuvre: ManoeuvreTypes.reverseParkRoad,
                competency: ManoeuvreCompetencies.controlFault,
            }));
            expect(result.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.D);
        });
    });
    describe('ADD_MANOEUVRE_COMMENT', function () {
        it('should add a comment to the selected Manoeuvre', function () {
            var state = {
                reverseParkRoad: { selected: true },
            };
            var result = manoeuvresReducer(state, new AddManoeuvreComment(ManoeuvreTypes.reverseParkRoad, CompetencyOutcome.S, 'control', 'comments'));
            expect(result.reverseParkRoad.controlFaultComments).toEqual('comments');
        });
    });
    describe('REMOVE_MANOEUVRE_FAULT', function () {
        it('should remove the fault from a manoeuvre', function () {
            var state = {
                reverseParkRoad: { selected: true, controlFault: CompetencyOutcome.DF },
            };
            var result = manoeuvresReducer(state, new RemoveManoeuvreFault({
                competency: ManoeuvreCompetencies.controlFault,
                manoeuvre: ManoeuvreTypes.reverseParkRoad,
            }));
            expect(result.reverseParkRoad.controlFault).toBeUndefined();
        });
    });
});
//# sourceMappingURL=manoeuvres.reducer.spec.js.map