import { ShowMeQuestion } from './../../../providers/question/show-me-question.model';
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
import {
  ToggleETA,
  TogglePlanningEco,
  AddDangerousFault,
  AddSeriousFault,
} from '../../../modules/tests/test_data/test-data.actions';
import { ExaminerActions, Competencies } from '../../../modules/tests/test_data/test-data.constants';
import { By } from '@angular/platform-browser';
import {
  ShowMeQuestionSelected,
} from '../../../modules/tests/vehicle-checks/vehicle-checks.actions';
import { PersistTests } from '../../../modules/tests/tests.actions';
import {
  IndependentDrivingTypeChanged,
  WeatherConditionsChanged,
} from '../../../modules/tests/test-summary/test-summary.actions';
import { WeatherConditions } from '@dvsa/mes-test-schema/categories/B';
import { of } from 'rxjs/observable/of';
import { OfficeComponentsModule } from '../components/office.components.module';
import { MockComponent } from 'ng-mocks';
import { RouteNumberComponent } from '../components/route-number/route-number';
import { CandidateDescriptionComponent } from '../components/candidate-description/candidate-description';
import { DebriefWitnessedComponent } from '../components/debrief-witnessed/debrief-witnessed';
import { ShowMeQuestionComponent } from '../components/show-me-question/show-me-question';
import { WeatherConditionsComponent } from '../components/weather-conditions/weather-conditions';
import { D255Component } from '../components/d255/d255';
import { AdditionalInformationComponent } from '../components/additional-information/additional-information';
import { IdentificationComponent } from '../components/identification/identification';

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
      ],
      imports: [IonicModule, AppModule, ComponentsModule, OfficeComponentsModule,
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
                vehicleChecks: {
                  showMeQuestionCode: 'S3',
                  showMeQuestionDescription: '',
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
          showMeQuestionCode: 'S1',
          showMeQuestionDescription: 'desc',
          showMeQuestionShortName: 'name',
        };
        component.showMeQuestionChanged(question);
        expect(store$.dispatch).toHaveBeenCalledWith(new ShowMeQuestionSelected(question));
      });
    });
  });

  describe('DOM', () => {
    it('should pass the selected show me question code to the show me subcomponent', () => {
      fixture.detectChanges();
      const showMeElement = fixture.debugElement.query(By.css('show-me-question'))
        .componentInstance as ShowMeQuestionComponent;
      expect(showMeElement.showMeQuestion.showMeQuestionCode).toEqual('S3');
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
        const saveAndContinueButton = fixture.debugElement.query(By.css('.defer-button'));
        saveAndContinueButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
        expect(navCtrl.popToRoot).toHaveBeenCalled();
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

    describe('driving fault commentary', () => {
      it('should display the card with commentary fields when displayDrivingFaultComments is true', () => {
        fixture.detectChanges();
        component.pageState.displayDrivingFaultComments$ = of(true);
        fixture.detectChanges();
        const drivingFaultWithCommentary = fixture.debugElement.queryAll(By.css('#driving-fault-with-commentary'));
        const drivingFaultNoCommentary = fixture.debugElement.queryAll(By.css('#driving-fault-no-commentary'));
        expect(drivingFaultWithCommentary.length).toBe(1);
        expect(drivingFaultNoCommentary.length).toBe(0);
      });
      it('should display the card with no commentary fields when displayDrivingFaultComments is false', () => {
        fixture.detectChanges();
        component.pageState.displayDrivingFaultComments$ = of(false);
        component.pageState.drivingFaultCount$ = of(10);
        fixture.detectChanges();
        const drivingFaultWithCommentary = fixture.debugElement.queryAll(By.css('#driving-fault-with-commentary'));
        const drivingFaultNoCommentary = fixture.debugElement.queryAll(By.css('#driving-fault-no-commentary'));
        expect(drivingFaultWithCommentary.length).toBe(0);
        expect(drivingFaultNoCommentary.length).toBe(1);
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
