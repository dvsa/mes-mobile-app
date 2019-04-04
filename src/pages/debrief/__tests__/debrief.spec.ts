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
} from '../../../modules/tests/test_data/test-data.actions';
import { Competencies } from '../../../modules/tests/test_data/test-data.constants';

describe('DebriefPage', () => {
  let fixture: ComponentFixture<DebriefPage>;
  let component: DebriefPage;
  let navController: NavController;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebriefPage],
      imports: [IonicModule, AppModule, ComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
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
                },
              },
            },
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
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DebriefPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template

    it('should display passed container if passed is true', () => {
      component.passed = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.passed'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('.failed'))).toBeNull();
    });
    it('should display failed container if passed is false', () => {
      component.passed = false;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.failed'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('.passed'))).toBeNull();
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

    describe('endDebrief', () => {
      it('should navigate to PassFinalisationPage when passed = true', () => {
        component.passed = true;
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith('PassFinalisationPage');
      });
      it('should navigate to OfficePage when passed = false', () => {
        component.passed = false;
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith('BackToOfficePage');
      });

    });
  });

});
