import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Device } from '@ionic-native/device';
import { Store, StoreModule } from '@ngrx/store';
import { DeviceMock } from '@ionic-native-mocks/device';
import { LogHelper } from '../logsHelper';
import { LogType } from '../../../shared/models/log.model';
import { configureTestSuite } from 'ng-bullet';
describe('LogHelper', function () {
    var logHelper;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                    appInfo: function () { return ({
                        versionNumber: '5',
                    }); },
                }),
            ],
            providers: [
                { provide: Device, useClass: DeviceMock },
                LogHelper,
                Store,
            ],
        });
    });
    beforeEach(function () {
        logHelper = TestBed.get(LogHelper);
    });
    describe('createLog', function () {
        it('creates log successfully', function (done) {
            var log = logHelper.createLog(LogType.ERROR, 'description', 'error');
            expect(log.message).toBe('error');
            expect(log.type).toBe(LogType.ERROR);
            expect(log.description).toBe('description');
            expect(log.appVersion).toBe('5');
            done();
        });
    });
});
//# sourceMappingURL=logs-helper.spec.js.map