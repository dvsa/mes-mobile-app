import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Device } from '@ionic-native/device';
import { Store, StoreModule } from '@ngrx/store';
import { DeviceMock } from '@ionic-native-mocks/device';
import { LogHelper } from '../logsHelper';
import { LogType } from '../../../shared/models/log.model';
import { configureTestSuite } from 'ng-bullet';

describe('LogHelper', () => {
  let logHelper: LogHelper;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          appInfo: () => ({
            versionNumber: '5',
          }),
        }),
      ],
      providers: [
        { provide: Device, useClass: DeviceMock },
        LogHelper,
        Store,
      ],
    });
  });

  beforeEach(() => {
    logHelper = TestBed.get(LogHelper);
  });

  describe('createLog', () => {
    it('creates log successfully', (done) => {
      const log = logHelper.createLog(LogType.ERROR, 'description', 'error');
      expect(log.message).toBe('error');
      expect(log.type).toBe(LogType.ERROR);
      expect(log.description).toBe('description');
      expect(log.appVersion).toBe('5');
      done();
    });
  });
});
