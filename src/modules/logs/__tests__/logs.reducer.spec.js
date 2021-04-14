import { initialState, logsReducer } from '../logs.reducer';
import * as logsActions from '../logs.actions';
import { LogType } from '../../../shared/models/log.model';
describe('Logs Reducer', function () {
    describe('undefined action', function () {
        it('should return the existing state', function () {
            var action = { type: 'NOOP' };
            var result = logsReducer(undefined, action);
            expect(result).toBe(initialState);
        });
    });
    describe('[GLOBAL] Save Log', function () {
        it('should save a log to state', function () {
            var log = {
                type: LogType.INFO,
                message: 'DE with id: 12345678 - [JournalEffects] Load Journal Success',
                timestamp: Date.now(),
                drivingExaminerId: '1234567',
            };
            var action = new logsActions.SaveLog(log);
            var result = logsReducer(initialState, action);
            expect(result).toEqual([log]);
        });
    });
    describe('[LogsEffects] Send Logs Success', function () {
        var timestamps = [1551872497881, 1551872497882, 1551872497883];
        var lastLog = {
            type: LogType.WARNING,
            message: 'DE with id: 12345678 - [JournalEffects] Load Journal Silent Failure',
            timestamp: timestamps[2],
            drivingExaminerId: '1234567',
        };
        var logs = [
            {
                type: LogType.INFO,
                message: 'DE with id: 12345678 - [JournalEffects] Load Journal Success',
                timestamp: timestamps[0],
                drivingExaminerId: '1234567',
            },
            {
                type: LogType.ERROR,
                message: 'DE with id: 12345678 - [JournalEffects] Load Journal Failure',
                timestamp: timestamps[1],
                drivingExaminerId: '1234567',
            },
            lastLog,
        ];
        it('should delete all logs if every one of them has been sent', function () {
            var state = logs;
            var action = new logsActions.SendLogsSuccess(timestamps);
            var result = logsReducer(state, action);
            expect(result).toEqual([]);
        });
        it('should not delete the logs which have not yet been sent', function () {
            var state = logs;
            // let's say that only the first 2 logs got sent to the logs service
            var action = new logsActions.SendLogsSuccess(timestamps.slice(0, 2));
            var result = logsReducer(state, action);
            expect(result).toEqual([lastLog]);
        });
    });
});
//# sourceMappingURL=logs.reducer.spec.js.map