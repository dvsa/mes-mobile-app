import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { DebriefCatHomeTestPage } from '../debrief.cat-home-test.page';
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
import { CAT_HOME_TEST } from '../../../page-names.constants';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { of } from 'rxjs/observable/of';
import { TestOutcome } from '../../../../shared/models/test-outcome';
import { configureTestSuite } from 'ng-bullet';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksCardComponent } from '../../components/vehicle-checks-card/vehicle-checks-card';
import { EtaDebriefCardComponent } from '../../components/eta-debrief-card/eta-debrief-card';
import {
  DangerousFaultsDebriefCardComponent,
} from '../../components/dangerous-faults-debrief-card/dangerous-faults-debrief-card';
import {
  SeriousFaultsDebriefCardComponent,
} from '../../components/serious-faults-debrief-card/serious-faults-debrief-card';
import {
  DrivingFaultsDebriefCardComponent,
} from '../../components/driving-faults-debrief-card/driving-faults-debrief-card';
import {
  TestOutcomeDebriefCardComponent,
} from '../../components/test-outcome-debrief-card/test-outcome-debrief-card';
import { EcoDebriefCardComponent } from '../../components/eco-debrief-card/eco-debrief-card';

describe('DebriefCatHomeTestPage', () => {
  let fixture: ComponentFixture<DebriefCatHomeTestPage>;
  let component: DebriefCatHomeTestPage;
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

  const exampleTestData: CatHUniqueTypes.TestData  = {
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
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DebriefCatHomeTestPage,
        MockComponent(VehicleChecksCardComponent),
        MockComponent(EtaDebriefCardComponent),
        MockComponent(DangerousFaultsDebriefCardComponent),
        MockComponent(SeriousFaultsDebriefCardComponent),
        MockComponent(DrivingFaultsDebriefCardComponent),
        MockComponent(EcoDebriefCardComponent),
        MockComponent(TestOutcomeDebriefCardComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                testSlotAttributes,
                category: TestCategory.H,
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
        TestDataByCategoryProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DebriefCatHomeTestPage);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
  }));

  describe('Class', () => {
    describe('endDebrief', () => {
      it('should dispatch the PersistTests action', () => {
        component.endDebrief();
        expect(store$.dispatch).toHaveBeenCalledWith(new EndDebrief);
      });
      it('should navigate to PassFinalisationPage when outcome = pass', () => {
        component.outcome = TestOutcome.PASS;
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith(CAT_HOME_TEST.PASS_FINALISATION_PAGE);
      });
      it('should navigate to BackToOfficePage when outcome = fail', () => {
        component.outcome = TestOutcome.FAIL;
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith(CAT_HOME_TEST.POST_DEBRIEF_HOLDING_PAGE);
      });
      it('should navigate to the BackToOfficePage when outcomes = terminated', () => {
        component.outcome = 'Terminated';
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith(CAT_HOME_TEST.POST_DEBRIEF_HOLDING_PAGE);
      });
    });
  });

  describe('DOM', () => {
    it('should display the candidate name in the title', () => {
      fixture.detectChanges();
      component.pageState.candidateName$ = of('John Doe');
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('ion-title'));
      expect(title.nativeElement.textContent).toEqual('Debrief - John Doe');
    });

  });
});
