import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  IonicModule,
  NavController,
  NavParams,
  Config,
  Platform,
  AlertController,
  ToastController,
} from 'ionic-angular';
import {
  NavControllerMock,
  NavParamsMock,
  ConfigMock,
  PlatformMock,
  AlertControllerMock,
} from 'ionic-mocks';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AppModule } from '../../../../app/app.module';
import { TranslateModule } from 'ng2-translate';
import { OfficeCatAMod2Page } from '../office.cat-a-mod2.page';
import { SafetyAndBalanceCardCatAMod2Component } from '../components/safety-and-balance/safety-and-balance.cat-a-mod2';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { ToggleETA } from '../../../../modules/tests/test-data/common/eta/eta.actions';
import { TogglePlanningEco } from '../../../../modules/tests/test-data/common/eco/eco.actions';
import {
  AddDangerousFault,
} from '../../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFault } from '../../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { EyesightTestFailed } from '../../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { ExaminerActions, Competencies } from '../../../../modules/tests/test-data/test-data.constants';
import { By } from '@angular/platform-browser';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import {
  WeatherConditionsChanged,
} from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { WeatherConditions } from '@dvsa/mes-test-schema/categories/common';
import { of } from 'rxjs/observable/of';
import { MockComponent } from 'ng-mocks';
import { RouteNumberComponent } from '../../components/route-number/route-number';
import { CandidateDescriptionComponent } from '../../components/candidate-description/candidate-description';
import { ShowMeQuestionComponent } from '../../components/show-me-question/show-me-question';
import { WeatherConditionsComponent } from '../../components/weather-conditions/weather-conditions';
import { AdditionalInformationComponent } from '../../components/additional-information/additional-information';
import { IdentificationComponent } from '../../components/identification/identification';
import { IndependentDrivingComponent } from '../../components/independent-driving/independent-driving';
import { FaultCommentCardComponent } from '../../components/fault-comment-card/fault-comment-card';
import { FaultSummary } from '../../../../shared/models/fault-marking.model';
import { ActivityCodeComponent } from '../../components/activity-code/activity-code';
import {
  ActivityCodeModel,
  activityCodeModelList,
  ActivityCodeDescription,
} from '../../components/activity-code/activity-code.constants';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { CompleteTest, OfficeValidationError } from '../../office.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastControllerMock } from '../../__mocks__/toast-controller-mock';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { SetActivityCode } from '../../../../modules/tests/activity-code/activity-code.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { VehicleChecksOfficeCardComponent } from '../../components/vehicle-checks/vehicle-checks-office-card';
import { configureTestSuite } from 'ng-bullet';

describe('OfficePage', () => {
  let fixture: ComponentFixture<OfficeCatAMod2Page>;
  let component: OfficeCatAMod2Page;
  let navController: NavController;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        OfficeCatAMod2Page,
        SafetyAndBalanceCardCatAMod2Component,
        MockComponent(RouteNumberComponent),
        MockComponent(CandidateDescriptionComponent),
        MockComponent(IdentificationComponent),
        MockComponent(ShowMeQuestionComponent),
        MockComponent(WeatherConditionsComponent),
        MockComponent(AdditionalInformationComponent),
        MockComponent(IndependentDrivingComponent),
        MockComponent(FaultCommentCardComponent),
        MockComponent(VehicleChecksOfficeCardComponent),
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
                category: TestCategory.EUA2M2,
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
                    showMeQuestions: [{
                      code: 'S3',
                      description: '',
                      outcome: '',
                    }],
                    tellMeQuestions: [{
                      code: '',
                      description: '',
                      outcome: '',
                    }],
                  },
                  eyesightTest: {},
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
                },
                rekey: false,
              },
            },
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
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: ToastController, useClass: ToastControllerMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
        { provide: FaultSummaryProvider, useClass: FaultSummaryProvider },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OfficeCatAMod2Page);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {

    describe('weatherConditionsChanged', () => {
      it('should dispatch a weather conditions changed action with the weather condition values', () => {
        const conditions: WeatherConditions[] = ['Showers'];
        component.weatherConditionsChanged(conditions);
        expect(store$.dispatch).toHaveBeenCalledWith(new WeatherConditionsChanged(conditions));
      });
    });
    describe('selecting a activity code', () => {
      it('should dispatch a SetActivityCode action with the activity code', () => {
        component.activityCodeChanged(activityCodeModelList[0]);
        expect(store$.dispatch).toHaveBeenCalledWith(new SetActivityCode(activityCodeModelList[0].activityCode));
      });
    });
    describe('completeTest', () => {
      it('should successfully end the test', () => {
        component.completeTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new CompleteTest());
      });
    });
  });

  describe('DOM', () => {
    it('should pass the selected activity code to the activity code subcomponent', () => {
      const activityCodeModel: ActivityCodeModel = {
        activityCode: ActivityCodes.ACCIDENT,
        description: ActivityCodeDescription.ACCIDENT,
      };
      fixture.detectChanges();
      const activityCodeElement = fixture.debugElement.query(By.css('activity-code'))
        .componentInstance as ActivityCodeComponent;
      expect(activityCodeElement.activityCodeModel).toEqual(activityCodeModel);
    });
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
      expect(fixture.debugElement.query(By.css('#dangerousFaultComment'))).toBeNull();
    });
    it('should display dangerous fault comment textbox if there are any', () => {
      store$.dispatch(new AddDangerousFault(Competencies.judgementCrossing));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#dangerousFaultComment'))).toBeDefined();
    });
    it('should not display serious fault comment textbox if there are not any', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#seriousFaultComment'))).toBeNull();
    });
    it('should display serious fault comment textbox if there are any', () => {
      store$.dispatch(new AddSeriousFault(Competencies.judgementOvertaking));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#seriousFaultComment'))).toBeDefined();
    });

    it('should display the serious fault comment textbox if the eyesight test is failed', () => {
      store$.dispatch(new EyesightTestFailed());
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#seriousFaultComment'))).toBeDefined();
    });

    describe('deferring the write up', () => {
      it('should dispatch an action to persist tests + pop navstack to root when pressing save and continue', () => {
        fixture.detectChanges();
        const saveAndContinueButton = fixture.debugElement.query(By.css('#defer-button'));
        saveAndContinueButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
        expect(navController.popTo).toHaveBeenCalled();
      });
    });

    describe('driving fault commentary', () => {
      it('should pass whether to render driving fault commentary to fault-comment-card', () => {
        const drivingFaultCommentCard: FaultCommentCardComponent = fixture.debugElement
          .query(By.css('#driving-fault-comment-card')).componentInstance;
        fixture.detectChanges();

        component.pageState.displayDrivingFaultComments$ = of(true);
        component.pageState.displayDrivingFault$ = of(true);
        fixture.detectChanges();
        expect(drivingFaultCommentCard.shouldRender).toBeTruthy();
        component.pageState.displayDrivingFaultComments$ = of(false);
        fixture.detectChanges();
        expect(drivingFaultCommentCard.shouldRender).toBeFalsy();
      });
    });

    describe('driving fault overview', () => {
      const drivingFaults: FaultSummary[] = [
        {
          competencyIdentifier: 'signalsTimed',
          competencyDisplayName: 'Signals - Timed',
          faultCount: 3,
          comment: 'dummy',
        },
        {
          competencyIdentifier: 'useOfSpeed',
          competencyDisplayName: 'Use of speed',
          faultCount: 1,
          comment: 'dummy',
        },
      ];
      it('should display a driving faults badge with the count for each type of driving fault on the test', () => {
        fixture.detectChanges();
        component.pageState.drivingFaults$ = of(drivingFaults);
        component.pageState.drivingFaultCount$ = of(4);
        component.pageState.displayDrivingFaultComments$ = of(false);
        component.pageState.displayDrivingFault$ = of(true);

        fixture.detectChanges();

        const drivingFaultBadges = fixture.debugElement.queryAll(By.css('driving-faults-badge'));
        expect(drivingFaultBadges.length).toBe(2);
        expect(drivingFaultBadges[0].componentInstance.count).toBe(3);
        expect(drivingFaultBadges[1].componentInstance.count).toBe(1);
      });
      it('should render the display name for each driving fault', () => {
        fixture.detectChanges();
        component.pageState.drivingFaults$ = of(drivingFaults);
        component.pageState.drivingFaultCount$ = of(4);
        component.pageState.displayDrivingFaultComments$ = of(false);
        component.pageState.displayDrivingFault$ = of(true);

        fixture.detectChanges();

        const faultLabels = fixture.debugElement.queryAll(By.css('.fault-label'));
        expect(faultLabels.length).toBe(2);
        expect(faultLabels[0].nativeElement.innerHTML).toBe('Signals - Timed');
        expect(faultLabels[1].nativeElement.innerHTML).toBe('Use of speed');
      });
    });
  });

  describe('popToRoot', () => {
    it('should call the popTo method in the navcontroller if not in practice mode', () => {
      component.popToRoot();
      expect(navController.popTo).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
      component.form = new FormGroup({
        requiredControl1: new FormControl(null, [Validators.required]),
        requiredControl2: new FormControl(null, [Validators.required]),
        notRequiredControl: new FormControl(null),
      });

      component.onSubmit();
      tick();
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new OfficeValidationError('requiredControl1 is blank'));
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new OfficeValidationError('requiredControl2 is blank'));
      expect(store$.dispatch)
        .not
        .toHaveBeenCalledWith(new OfficeValidationError('notRequiredControl is blank'));
    }));
  });
});
