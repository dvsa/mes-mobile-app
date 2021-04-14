import { accompanimentReducer } from '../accompaniment.reducer';
import { InstructorAccompanimentToggled, SupervisorAccompanimentToggled, OtherAccompanimentToggled, InterpreterAccompanimentToggled, } from '../accompaniment.actions';
describe('accompaniment reducer', function () {
    it('should toggle ADI accompaniment when receiving the instructor toggle action', function () {
        var result;
        result = accompanimentReducer({}, new InstructorAccompanimentToggled());
        expect(result.ADI).toBe(true);
        result = accompanimentReducer(result, new InstructorAccompanimentToggled());
        expect(result.ADI).toBe(false);
    });
    it('should toggle supervisor accompaniment when receiving the supervisor toggle action', function () {
        var result;
        result = accompanimentReducer({}, new SupervisorAccompanimentToggled());
        expect(result.supervisor).toBe(true);
        result = accompanimentReducer(result, new SupervisorAccompanimentToggled());
        expect(result.supervisor).toBe(false);
    });
    it('should toggle other accompaniment when receiving the other toggle action', function () {
        var result;
        result = accompanimentReducer({}, new OtherAccompanimentToggled());
        expect(result.other).toBe(true);
        result = accompanimentReducer(result, new OtherAccompanimentToggled());
        expect(result.other).toBe(false);
    });
    it('should toggle interpreter accompaniment when receiving the interpreter toggle action', function () {
        var result;
        result = accompanimentReducer({}, new InterpreterAccompanimentToggled());
        expect(result.interpreter).toBe(true);
        result = accompanimentReducer(result, new InterpreterAccompanimentToggled());
        expect(result.interpreter).toBe(false);
    });
});
//# sourceMappingURL=accompaniment.reducer.spec.js.map