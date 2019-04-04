
import { CompetencyWithModalComponent } from './../components/competency-with-modal/competency-with-modal';
import { ManoeuvresPopoverComponent } from './../components/manoeuvres-popover/manoeuvres-popover';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { AppModule } from '../../../app/app.module';
import { TestReportPage } from '../test-report';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { CompetencyComponent } from '../components/competency/competency';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { DrivingFaultSummaryComponent } from '../components/driving-fault-summary/driving-fault-summary';
import { TickIndicatorComponent } from '../components/tick-indicator/tick-indicator';
import { ToolbarComponent } from '../components/toolbar/toolbar';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { testReportReducer } from '../test-report.reducer';
import { LegalRequirementsComponent } from '../components/legal-requirements/legal-requirements';
import { EtaComponent } from '../components/examiner-takes-action/eta';
import { initialState } from '../../../modules/tests/test_data/test-data.reducer';

describe('TestReportPage', () => {
  let fixture: ComponentFixture<TestReportPage>;
  let component: TestReportPage;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportPage,
        MockComponent(ManoeuvresPopoverComponent),
        MockComponent(CompetencyWithModalComponent),
        MockComponent(TickIndicatorComponent),
        MockComponent(CompetencyComponent),
        MockComponent(LegalRequirementsComponent),
        MockComponent(EtaComponent),
        MockComponent(DrivingFaultSummaryComponent),
        MockComponent(ToolbarComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forFeature('tests', () => (
          {
            currentTest: {
              slotId: '123',
            },
            startedTests: {
              123: {
                testData: initialState,
                candidate: mockCandidate,
              },
            },
          })),
        StoreModule.forFeature('testReport', testReportReducer),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestReportPage);
        component = fixture.componentInstance;
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('ionViewDidEnter', () => {
      it('should lock the screen orientation to Portrait Primary', () => {
        component.ionViewDidEnter();
        expect(screenOrientation.lock)
          .toHaveBeenCalledWith(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      });

      it('should keep the device awake', () => {
        component.ionViewDidEnter();
        expect(insomnia.keepAwake).toHaveBeenCalled();
      });

      it('should enable singleAppMode', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
      });

    });

    describe('ionViewDidLeave', () => {
      it('should unlock the screen orientation', () => {
        component.ionViewDidLeave();
        expect(screenOrientation.unlock).toHaveBeenCalled();
      });

      it('should allow the device to sleep', () => {
        component.ionViewDidLeave();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });

      it('should disable singleAppMode', () => {
        component.ionViewDidLeave();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {

    describe('Fault Modes Styling', () => {
      it('should not have any fault mode styles applied when serious and dangerous mode is disabled', () => {
        expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
        expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
      });
      it('should have serious fault mode styles applied when serious mode is enabled', () => {
        component.isSeriousMode = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeDefined();
        expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
      });
      it('should have dangerous fault mode styles applied when dangerous mode is enabled', () => {
        component.isDangerousMode = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
        expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeDefined();
      });
    });

  });
});
