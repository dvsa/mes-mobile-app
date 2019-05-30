import { ShowMeQuestion } from '../../../providers/question/show-me-question.model';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, AlertController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, AlertControllerMock } from 'ionic-mocks';
import { ComponentsModule } from '../../../components/components.module';
import { AppModule } from '../../../app/app.module';
import { OfficePage } from '../office';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import {
  ToggleETA,
  TogglePlanningEco,
  AddDangerousFault,
  AddSeriousFault,
  ShowMeQuestionSelected,
} from '../../../modules/tests/test-data/test-data.actions';
import { ExaminerActions, Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { By } from '@angular/platform-browser';
import { PersistTests, SetActivityCode } from '../../../modules/tests/tests.actions';
import {
  WeatherConditionsChanged,
} from '../../../modules/tests/test-summary/test-summary.actions';
import { WeatherConditions } from '@dvsa/mes-test-schema/categories/B';
import { of } from 'rxjs/observable/of';
import { MockComponent } from 'ng-mocks';
import { RouteNumberComponent } from '../components/route-number/route-number';
import { CandidateDescriptionComponent } from '../components/candidate-description/candidate-description';
import { DebriefWitnessedComponent } from '../components/debrief-witnessed/debrief-witnessed';
import { ShowMeQuestionComponent } from '../components/show-me-question/show-me-question';
import { WeatherConditionsComponent } from '../components/weather-conditions/weather-conditions';
import { D255Component } from '../components/d255/d255';
import { AdditionalInformationComponent } from '../components/additional-information/additional-information';
import { IdentificationComponent } from '../components/identification/identification';
import { IndependentDrivingComponent } from '../components/independent-driving/independent-driving';
import { FaultCommentCardComponent } from '../components/fault-comment-card/fault-comment-card';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../../shared/models/fault-marking.model';
import { TerminationCodeComponent } from '../components/termination-code/termination-code';
import {
  TerminationCode,
  terminationCodeList,
  ActivityCodeDescription,
} from '../components/termination-code/termination-code.constants';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { CompleteTest } from '../office.actions';
import { WelshTestChanged } from '../../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { LanguagePreferencesComponent } from '../components/language-preference/language-preferences';

describe('OfficePage', () => {
  let fixture: ComponentFixture<OfficePage>;
  let component: OfficePage;
  let navCtrl: NavController;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OfficePage,
        MockComponent(RouteNumberComponent),
        MockComponent(CandidateDescriptionComponent),
        MockComponent(DebriefWitnessedComponent),
        MockComponent(IdentificationComponent),
        MockComponent(ShowMeQuestionComponent),
        MockComponent(WeatherConditionsComponent),
        MockComponent(D255Component),
        MockComponent(AdditionalInformationComponent),
        MockComponent(IndependentDrivingComponent),
        MockComponent(FaultCommentCardComponent),
        MockComponent(TerminationCodeComponent),
        MockComponent(LanguagePreferencesComponent),
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
                    showMeQuestion: {
                      code: 'S3',
                      description: '',
                    },
                  },
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
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
        { provide: AlertController, useClass: AlertControllerMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OfficePage);
        component = fixture.componentInstance;
        navCtrl = TestBed.get(NavController);
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('weatherConditionsChanged', () => {
      it('should dispatch a weather conditions changed action with the weather condition values', () => {
        const conditions: WeatherConditions[] = ['Showers'];
        component.weatherConditionsChanged(conditions);
        expect(store$.dispatch).toHaveBeenCalledWith(new WeatherConditionsChanged(conditions));
      });
    });
    describe('selecting a show me question', () => {
      it('should dispatch an action when show me question change handler is called', () => {
        const question: ShowMeQuestion = {
          code: 'S1',
          description: 'desc',
          shortName: 'name',
        };
        component.showMeQuestionChanged(question);
        expect(store$.dispatch).toHaveBeenCalledWith(new ShowMeQuestionSelected(question));
      });
    });
    describe('selecting a termination code', () => {
      it('should dispatch a SetActivityCode action with the activity code', () => {
        component.activityCodeChanged(terminationCodeList[0]);
        expect(store$.dispatch).toHaveBeenCalledWith(new SetActivityCode(terminationCodeList[0].activityCode));
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
    it('should pass the selected show me question code to the show me subcomponent', () => {
      fixture.detectChanges();
      const showMeElement = fixture.debugElement.query(By.css('show-me-question'))
        .componentInstance as ShowMeQuestionComponent;
      expect(showMeElement.showMeQuestion.code).toEqual('S3');
    });
    it('should pass the selected termination code to the termination code subcomponent', () => {
      const terminationCode: TerminationCode = {
        activityCode: ActivityCodes.ACCIDENT,
        description: ActivityCodeDescription.ACCIDENT,
      };
      fixture.detectChanges();
      const terminationCodeElement = fixture.debugElement.query(By.css('termination-code'))
        .componentInstance as TerminationCodeComponent;
      expect(terminationCodeElement.terminationCode).toEqual(terminationCode);
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

    describe('deferring the write up', () => {
      it('should dispatch an action to persist tests + pop navstack to root when pressing save and continue', () => {
        const saveAndContinueButton = fixture.debugElement.query(By.css('#defer-button'));
        saveAndContinueButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
        expect(navCtrl.popToRoot).toHaveBeenCalled();
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
      const drivingFaults: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [
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
    it('should call the popToRoot method in the navcontroller', () => {
      component.popToRoot();
      expect(navCtrl.popToRoot).toHaveBeenCalled();
    });
  });

  describe('isWelshChanged', () => {
    it('should', () => {
      const isWelsh = true;
      component.isWelshChanged(isWelsh);
      expect(store$.dispatch).toHaveBeenCalledWith(new WelshTestChanged(isWelsh));
    });
  });
});
