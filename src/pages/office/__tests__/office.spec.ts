import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { ComponentsModule } from '../../../components/components.module';
import { AppModule } from '../../../app/app.module';
import { OfficePage } from '../office';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ToggleETA, TogglePlanningEco, AddDangerousFault } from '../../../modules/tests/test_data/test-data.actions';
import { ExaminerActions, Competencies } from '../../../modules/tests/test_data/test-data.constants';
import { By } from '@angular/platform-browser';
import { PersistTests } from '../../../modules/tests/tests.actions';
import {
  IndependentDrivingTypeChanged,
  DebriefWitnessed,
  DebriefUnwitnessed,
  IdentificationUsedChanged,
  D255Yes,
  D255No,
} from '../../../modules/tests/test-summary/test-summary.actions';

describe('OfficePage', () => {
  let fixture: ComponentFixture<OfficePage>;
  let component: OfficePage;
  let navCtrl: NavController;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfficePage],
      imports: [IonicModule, AppModule, ComponentsModule,
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
                  driverNumber: '123',
                },
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
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
        fixture = TestBed.createComponent(OfficePage);
        component = fixture.componentInstance;
        navCtrl = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should hide ETA faults container if there are none', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#ETA'))).toBeNull();
    });
    it('should display ETA faults container if there are any', () => {
      store$.dispatch(new ToggleETA(ExaminerActions.verbal));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#ETA'))).toBeDefined();
    });
    it('should hide eco faults container if there are none', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#eco'))).toBeNull();
    });
    it('should display eco faults container if there are any', () => {
      store$.dispatch(new TogglePlanningEco());
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#eco'))).toBeDefined();
    });
    it('should display eta fault details if there are any', () => {
      store$.dispatch(new ToggleETA(ExaminerActions.verbal));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#etaFaults'))).toBeDefined();
    });
    it('should display eco fault details if there are any', () => {
      store$.dispatch(new TogglePlanningEco());
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#ecoFaults'))).toBeDefined();
    });
    it('should not display dangerous fault comment textbox if there are not any', () => {
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(fixture.debugElement.query(By.css('#dangerousFaultComment'))).toBeNull();
    });
    it('should display dangerous fault comment textbox if there are any', () => {
      store$.dispatch(new AddDangerousFault(Competencies.judgementCrossing));
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(fixture.debugElement.query(By.css('#dangerousFaultComment'))).toBeDefined();
    });
    describe('deferring the write up', () => {
      it('should dispatch an action to persist tests + pop navstack to root when pressing save and continue', () => {
        const saveAndContinueButton = fixture.debugElement.query(By.css('.defer-button'));
        saveAndContinueButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
        expect(navCtrl.popToRoot).toHaveBeenCalled();
      });
    });

    describe('changing debrief witnessed', () => {
      it('should dispatch a change to debrief witnessed action when Yes is clicked', () => {
        const witnessedRadio = fixture.debugElement.query(By.css('#debrief-witnessed-yes'));
        witnessedRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new DebriefWitnessed());
      });
      it('should dispatch a change to debrief unwitnessed when No is clicked', () => {
        const unwitnessedRadio = fixture.debugElement.query(By.css('#debrief-witnessed-no'));
        unwitnessedRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new DebriefUnwitnessed());
      });
    });

    describe('changing independent driving', () => {
      it('should dispatch a change to independent driving action when Yes is clicked', () => {
        const satNavRadio = fixture.debugElement.query(By.css('#independent-driving-satnav'));
        satNavRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new IndependentDrivingTypeChanged('Sat nav'));
      });
      it('should dispatch a change to independent driving action when Traffic signs is clicked', () => {
        const trafficSignsRadio = fixture.debugElement.query(By.css('#independent-driving-trafficsigns'));
        trafficSignsRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new IndependentDrivingTypeChanged('Traffic signs'));
      });
    });

    describe('changing identification', () => {
      it('should dispatch a change to identification action when Licence is clicked', () => {
        const licenceRadio = fixture.debugElement.query(By.css('#identification-license'));
        licenceRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new IdentificationUsedChanged('Licence'));
      });
      it('should dispatch a change to identification action when Passport is clicked', () => {
        const passportRadio = fixture.debugElement.query(By.css('#identification-passport'));
        passportRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new IdentificationUsedChanged('Passport'));
      });
    });

    describe('changing D255', () => {
      it('should dispatch a change to D255 action when Yes is clicked', () => {
        const d255YesRadio = fixture.debugElement.query(By.css('#d255-yes'));
        d255YesRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new D255Yes());
      });
      it('should dispatch a change to D255 action when No is clicked', () => {
        const d255NoRadio = fixture.debugElement.query(By.css('#d255-no'));
        d255NoRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new D255No());
      });
    });

  });

  describe('popToRoot', () => {
    it('should call the popToRoot method in the navcontroller', () => {
      component.popToRoot();
      expect(navCtrl.popToRoot).toHaveBeenCalled();
    });
  });
});
