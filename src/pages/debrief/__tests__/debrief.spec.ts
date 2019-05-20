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
import { TranslateModule, TranslateService } from 'ng2-translate';
import { fullCompetencyLabels } from '../../../shared/constants/competencies/catb-competencies';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { PopulateTestSlotAttributes } from '../../../modules/tests/test-slot-attributes/test-slot-attributes.actions';

describe('DebriefPage', () => {
  let fixture: ComponentFixture<DebriefPage>;
  let component: DebriefPage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let translate: TranslateService;

  const testSlotAttributes: TestSlotAttributes = {
    welshTest: false,
    extendedTest: false,
    slotId: 123,
    specialNeeds: false,
    start: '',
    vehicleSlotType: '',
  };

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
                testSlotAttributes,
                vehicleDetails: {},
                accompaniment: {},
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
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                  },
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
        TranslateModule,
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
        spyOn(store$, 'dispatch').and.callThrough();
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
      });
  }));

  describe('Class', () => {
    describe('ionViewDidLeave', () => {
      it('should disable the plugins when the test is a practice test', () => {
        component.isPracticeTest = true;
        component.ionViewDidLeave();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });
      it('should not disable the plugins when the test is not a practice test', () => {
        component.isPracticeTest = false;
        component.ionViewDidLeave();
        expect(screenOrientation.unlock).not.toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).not.toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    it('should display passed container if outcome is `passed`', () => {
      fixture.detectChanges();
      component.outcome = 'Pass';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.passed'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.failed'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.terminated'))).toBeNull();
    });
    it('should display failed container if outcome is `fail`', () => {
      fixture.detectChanges();
      component.outcome = 'Fail';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.failed'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.passed'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.terminated'))).toBeNull();
    });
    it('should display terminated container if outcome is `terminated`', () => {
      fixture.detectChanges();
      component.outcome = 'Terminated';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.terminated'))).not.toBeNull();
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
      expect(fixture.debugElement.query(By.css('#ETA'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('#etaFaults'))).not.toBeNull();
    });

    it('should display dangerous faults container if there are dangerous faults', () => {
      store$.dispatch(new AddDangerousFault(Competencies.controlsClutch));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#dangerous-fault'))).not.toBeNull();
    });

    it('should display serious faults container if there are serious faults', () => {
      store$.dispatch(new AddSeriousFault(Competencies.controlsClutch));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#serious-fault'))).not.toBeNull();
    });

    it('should display driving faults container if there are driving faults', () => {
      store$.dispatch(new AddDrivingFault({ competency: Competencies.controlsClutch, newFaultCount: 1 }));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#driving-fault'))).not.toBeNull();
    });

    it('should display the eco faults if there are any', () => {
      store$.dispatch(new TogglePlanningEco());
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#eco'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('#ecoFaults'))).not.toBeNull();
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

    describe('translation of fault competencies', () => {
      it('should display fault competencies in English by default', () => {
        store$.dispatch(new AddDrivingFault({ competency: Competencies.moveOffSafety, newFaultCount: 1 }));
        store$.dispatch(new AddSeriousFault(Competencies.useOfMirrorsSignalling));
        store$.dispatch(new AddDangerousFault(Competencies.useOfMirrorsChangeDirection));
        fixture.detectChanges();
        const drivingFaultLabel = fixture.debugElement.query(By.css('#driving-fault .counter-label')).nativeElement;
        const seriousLabel = fixture.debugElement.query(By.css('#serious-fault .counter-label')).nativeElement;
        const dangerousLabel = fixture.debugElement.query(By.css('#dangerous-fault .counter-label')).nativeElement;

        expect(drivingFaultLabel.innerHTML).toBe(fullCompetencyLabels.moveOffSafety);
        expect(seriousLabel.innerHTML).toBe(fullCompetencyLabels.useOfMirrorsSignalling);
        expect(dangerousLabel.innerHTML).toBe(fullCompetencyLabels.useOfMirrorsChangeDirection);
      });
      it('should display fault competencies in Welsh for a Welsh test', (done) => {
        store$.dispatch(new AddDrivingFault({ competency: Competencies.moveOffSafety, newFaultCount: 1 }));
        store$.dispatch(new AddSeriousFault(Competencies.useOfMirrorsSignalling));
        store$.dispatch(new AddDangerousFault(Competencies.useOfMirrorsChangeDirection));
        fixture.detectChanges();
        translate.onLangChange.subscribe(() => {
          fixture.detectChanges();
          const drivingFaultLabel = fixture.debugElement.query(By.css('#driving-fault .counter-label')).nativeElement;
          const seriousLabel = fixture.debugElement.query(By.css('#serious-fault .counter-label')).nativeElement;
          const dangerousLabel = fixture.debugElement.query(By.css('#dangerous-fault .counter-label')).nativeElement;

          expect(drivingFaultLabel.innerHTML).toBe(`[CY] ${fullCompetencyLabels.moveOffSafety}`);
          expect(seriousLabel.innerHTML).toBe(`[CY] ${fullCompetencyLabels.useOfMirrorsSignalling}`);
          expect(dangerousLabel.innerHTML).toBe(`[CY] ${fullCompetencyLabels.useOfMirrorsChangeDirection}`);
          done();
        });
        store$.dispatch(new PopulateTestSlotAttributes({ ...testSlotAttributes, welshTest: true }));
      });
    });
  });

});
