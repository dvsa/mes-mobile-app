import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { DebriefCatBEPage } from '../debrief.cat-be.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { StoreModel } from '../../../../shared/models/store.model';
import { StoreModule, Store } from '@ngrx/store';
import {
  AddDangerousFault,
} from '../../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFault } from '../../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFault } from '../../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import {
  EyesightTestFailed,
  EyesightTestPassed,
} from '../../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { Competencies } from '../../../../modules/tests/test-data/test-data.constants';
import { DebriefComponentsModule } from '../../components/debrief-components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { fullCompetencyLabels } from '../../../../shared/constants/competencies/competencies';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { PopulateTestSlotAttributes }
  from '../../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { EndDebrief } from '../../debrief.actions';
import * as welshTranslations from '../../../../assets/i18n/cy.json';
import { CAT_BE } from '../../../page-names.constants';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { of } from 'rxjs';
import { TestOutcome } from '../../../../shared/models/test-outcome';
import { configureTestSuite } from 'ng-bullet';

describe('DebriefCatBEPage', () => {
  let fixture: ComponentFixture<DebriefCatBEPage>;
  let component: DebriefCatBEPage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let translate: TranslateService;

  const testSlotAttributes: TestSlotAttributes = {
    welshTest: false,
    extendedTest: false,
    slotId: 123,
    specialNeeds: false,
    start: '',
    vehicleTypeCode: '',
  };

  const exampleTestData: CatBEUniqueTypes.TestData  = {
    dangerousFaults: {},
    drivingFaults: {},
    manoeuvres: {},
    seriousFaults: {},
    testRequirements: {},
    ETA: {},
    eco: {},
    vehicleChecks: {
      tellMeQuestions: [{}],
      showMeQuestions: [{}],
    },
    uncoupleRecouple: {},
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DebriefCatBEPage],
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
            testStatus: {},
            startedTests: {
              123: {
                testSlotAttributes,
                category: TestCategory.BE,
                vehicleDetails: {},
                accompaniment: {},
                testData: exampleTestData,
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
        { provide: FaultSummaryProvider, useClass: FaultSummaryProvider },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DebriefCatBEPage);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
  }));

  describe('DOM', () => {
    it('should display passed container if outcome is `passed`', () => {
      fixture.detectChanges();
      component.outcome = TestOutcome.PASS;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.passed'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.failed'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.terminated'))).toBeNull();
    });
    it('should display failed container if outcome is `fail`', () => {
      fixture.detectChanges();
      component.outcome = TestOutcome.FAIL;
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

    it('should display the candidate name in the title', () => {
      fixture.detectChanges();
      component.pageState.candidateName$ = of('John Doe');
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('ion-title'));
      expect(title.nativeElement.textContent).toEqual('Debrief - John Doe');
    });

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

  describe('endDebrief', () => {
    it('should dispatch the PersistTests action', () => {
      component.endDebrief();
      expect(store$.dispatch).toHaveBeenCalledWith(new EndDebrief);
    });
    it('should navigate to PassFinalisationPage when outcome = pass', () => {
      component.outcome = TestOutcome.PASS;
      component.endDebrief();
      expect(navController.push).toHaveBeenCalledWith(CAT_BE.PASS_FINALISATION_PAGE);
    });
    it('should navigate to BackToOfficePage when outcome = fail', () => {
      component.outcome = TestOutcome.FAIL;
      component.endDebrief();
      expect(navController.push).toHaveBeenCalledWith(CAT_BE.POST_DEBRIEF_HOLDING_PAGE);
    });
    it('should navigate to the BackToOfficePage when outcomes = terminated', () => {
      component.outcome = 'Terminated';
      component.endDebrief();
      expect(navController.push).toHaveBeenCalledWith(CAT_BE.POST_DEBRIEF_HOLDING_PAGE);
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
      configureI18N(Language.CYMRAEG, translate);
      translate.onLangChange.subscribe(() => {
        fixture.detectChanges();
        const drivingFaultLabel = fixture.debugElement.query(By.css('#driving-fault .counter-label')).nativeElement;
        const seriousLabel = fixture.debugElement.query(By.css('#serious-fault .counter-label')).nativeElement;
        const dangerousLabel = fixture.debugElement.query(By.css('#dangerous-fault .counter-label')).nativeElement;

        const expectedDrivingFaultTranslation = (<any>welshTranslations).debrief.competencies.moveOffSafety;
        const expectedSeriousFaultTranslation = (<any>welshTranslations).debrief.competencies.useOfMirrorsSignalling;
        const expectedDangerousFaultTranslation =
          (<any>welshTranslations).debrief.competencies.useOfMirrorsChangeDirection;

        expect(drivingFaultLabel.innerHTML).toBe(expectedDrivingFaultTranslation);
        expect(seriousLabel.innerHTML).toBe(expectedSeriousFaultTranslation);
        expect(dangerousLabel.innerHTML).toBe(expectedDangerousFaultTranslation);
        done();
      });
      store$.dispatch(new PopulateTestSlotAttributes({ ...testSlotAttributes, welshTest: true }));
    });
  });

  describe('Eyesight Test', () => {
    it('should display the eyesight test serious fault', () => {
      store$.dispatch(new EyesightTestFailed());
      fixture.detectChanges();
      const seriousLabel = fixture.debugElement.query(By.css('#serious-fault .counter-label')).nativeElement;
      expect(seriousLabel.innerHTML).toBe(fullCompetencyLabels.eyesightTest);
    });

    it('should not display a eyesight test serious fault if the test is passed', () => {
      store$.dispatch(new EyesightTestPassed());
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('#serious-fault .counter-label'));
      expect(label).toBeNull();
    });
  });
});
