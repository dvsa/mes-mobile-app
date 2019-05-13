import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { DebriefPage } from '../debrief';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../components/components.module';
import { StoreModel } from '../../../shared/models/store.model';
import { StoreModule, Store } from '@ngrx/store';
import {
  AddDangerousFault,
  AddSeriousFault,
  AddDrivingFault,
  ToggleETA,
  TogglePlanningEco,
} from '../../../modules/tests/test-data/test-data.actions';
import { Competencies, ExaminerActions } from '../../../modules/tests/test-data/test-data.constants';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';

describe('DebriefPage', () => {
  let fixture: ComponentFixture<DebriefPage>;
  let component: DebriefPage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebriefPage],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        DebriefComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testLifecycles: {},
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                candidate: {
                  candidateName: 'Joe Bloggs',
                },
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                  vehicleChecks: {
                    tellMeQuestion: {},
                    showMeQuestion: {},
                  },
                  controlledStop: {},
                },
              },
            },
          }),
          testReport: () => ({
            seriousMode: false,
            dangerousMode: false,
            removeFaultMode: false,
            isValid: false,
          }),
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DebriefPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
        spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
    describe('ionViewDidLeave', () => {
      it('should disable the plugins when the test is a practice test', () => {
        component.isPracticeTest = true;
        component.ionViewDidLeave();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });
      it('should not disable the plugins when the test is not a practice test', () => {
        component.isPracticeTest = false;
        component.ionViewDidLeave();
        expect(deviceProvider.disableSingleAppMode).not.toHaveBeenCalled();
        expect(screenOrientation.unlock).not.toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).not.toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template

    it('should display passed container if outcome is `passed`', () => {
      component.outcome = 'Pass';

      expect(fixture.debugElement.query(By.css('.passed'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('.failed'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.terminated'))).toBeNull();
    });
    it('should display failed container if outcome is `fail`', () => {
      component.outcome = 'Fail';

      expect(fixture.debugElement.query(By.css('.failed'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('.passed'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.terminated'))).toBeNull();
    });
    it('should display terminated container if outcome is `terminated`', () => {
      component.outcome = 'Terminated';

      expect(fixture.debugElement.query(By.css('.terminated'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('.passed'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.failed'))).toBeNull();
    });

    it('should not display ETA fault container if there are no ETA faults', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#ETA'))).toBeNull();
    });

    it('should not display dangerous faults container if there are no dangerous faults', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#dangerous-fault'))).toBeNull();
    });

    it('should not display serious faults container if there are no serious faults', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#serious-fault'))).toBeNull();
    });

    it('should not display driving faults container if there are no driving faults', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#driving-fault'))).toBeNull();
    });

    it('should not display eco fault container if there are no eco faults', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#eco'))).toBeNull();
    });

    it('should display the ETA faults if there are any', () => {
      store$.dispatch(new ToggleETA(ExaminerActions.physical));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#ETA'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('#etaFaults'))).toBeDefined();
    });

    it('should display dangerous faults container if there are dangerous faults', () => {
      store$.dispatch(new AddDangerousFault(Competencies.controlsClutch));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#dangerous-fault'))).toBeDefined();
    });

    it('should display serious faults container if there are serious faults', () => {
      store$.dispatch(new AddSeriousFault(Competencies.controlsClutch));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#serious-fault'))).toBeDefined();
    });

    it('should display driving faults container if there are driving faults', () => {
      store$.dispatch(new AddDrivingFault({ competency: Competencies.controlsClutch, newFaultCount: 1 }));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#driving-fault'))).toBeDefined();
    });

    it('should display the eco faults if there are any', () => {
      store$.dispatch(new TogglePlanningEco());
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#eco'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('#ecoFaults'))).toBeDefined();
    });

    describe('endDebrief', () => {
      it('should dispatch the PersistTests action', () => {
        component.endDebrief();
        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests);
      });
      it('should navigate to PassFinalisationPage when outcome = pass', () => {
        component.outcome = 'Pass';
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith('PassFinalisationPage');
      });
      it('should navigate to BackToOfficePage when outcome = fail', () => {
        component.outcome = 'Fail';
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith('BackToOfficePage');
      });
      it('should navigate to the BackToOfficePage when outcomes = terminated', () => {
        component.outcome = 'Terminated';
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith('BackToOfficePage');
      });
      it('should navigate back to the root when this is a practice test', () => {
        component.isPracticeTest = true;
        component.endDebrief();
        expect(navController.popToRoot).toHaveBeenCalled();
      });

    });
  });

});
