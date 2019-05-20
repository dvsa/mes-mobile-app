import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { WaitingRoomToCarPage } from '../waiting-room-to-car';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import {
  EyesightFailureConfirmationComponent,
} from '../components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import { of } from 'rxjs/observable/of';
import {
  EyesightResultReset,
} from '../../../modules/tests/eyesight-test-result/eyesight-test-result.actions';
import { QuestionProvider } from '../../../providers/question/question';
import { QuestionProviderMock } from '../../../providers/question/__mocks__/question.mock';
import { EndTestLinkComponent } from '../../../components/end-test-link/end-test-link';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { TellMeQuestionCardComponent } from '../components/tell-me-question-card/tell-me-question-card';
import { TellMeQuestionComponent } from '../components/tell-me-question/tell-me-question';
import { TellMeQuestionOutcomeComponent } from '../components/tell-me-question-outcome/tell-me-question-outcome';
import { VehicleRegistrationComponent } from '../components/vehicle-registration/vehicle-registration';
import { InstructorRegistrationComponent } from '../components/instructor-registration/instructor-registration';
import { TransmissionComponent } from '../components/transmission/transmission';
import { VehicleDetailsCardComponent } from '../components/vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from '../components/vehicle-details/vehicle-details';
import { AccompanimentCardComponent } from '../components/accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from '../components/accompaniment/accompaniment';
import { EyesightTestComponent } from '../components/eyesight-test/eyesight-test';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';
import { TellMeQuestionSelected } from '../../../modules/tests/test-data/test-data.actions';

describe('WaitingRoomToCarPage', () => {
  let fixture: ComponentFixture<WaitingRoomToCarPage>;
  let component: WaitingRoomToCarPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomToCarPage,
        MockComponent(EyesightTestComponent),
        MockComponent(EyesightFailureConfirmationComponent),
        MockComponent(EndTestLinkComponent),
        MockComponent(TellMeQuestionCardComponent),
        MockComponent(TellMeQuestionComponent),
        MockComponent(TellMeQuestionOutcomeComponent),
        MockComponent(VehicleRegistrationComponent),
        MockComponent(InstructorRegistrationComponent),
        MockComponent(TransmissionComponent),
        MockComponent(VehicleDetailsCardComponent),
        MockComponent(VehicleDetailsComponent),
        MockComponent(AccompanimentCardComponent),
        MockComponent(AccompanimentComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
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
                  vehicleChecks: {
                    tellMeQuestion: {
                      code: 'T1',
                      description: 'desc',
                      outcome: CompetencyOutcome.P,
                    },
                  },
                },
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
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
        { provide: QuestionProvider, useClass: QuestionProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WaitingRoomToCarPage);
        component = fixture.componentInstance;
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
    it('should get tell me question from the question provider', () => {
      expect(component.tellMeQuestions.length).toBe(2);
    });

    describe('selecting a tell me question', () => {
      it('should dispatch an action when the tell me question change handler is called', () => {
        const question: TellMeQuestion = {
          code: 'T1',
          description: 'desc',
          shortName: 'name',
        };
        component.tellMeQuestionChanged(question);
        expect(store$.dispatch).toHaveBeenCalledWith(new TellMeQuestionSelected(question));
      });
    });
  });

  describe('DOM', () => {

    describe('eyesight failure confirmation', () => {

      // tslint:disable-next-line:max-line-length
      it('should hide the rest of the form and show eyesight failure confirmation when page state indicates fail is selected', () => {
        fixture.detectChanges();
        component.pageState.eyesightFailRadioChecked$ = of(true);
        fixture.detectChanges();
        const eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
        const formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
        expect(eyesightFailureConfirmation).toBeTruthy();
        expect(formAfterEyesight.nativeElement.hidden).toBeTruthy();
      });
      // tslint:disable-next-line:max-line-length
      it('should show the rest of the form and not render eyesight failure confirmation when page state indicates pass is selected', () => {
        fixture.detectChanges();
        component.pageState.eyesightPassRadioChecked$ = of(true);
        fixture.detectChanges();
        const eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
        const formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
        expect(eyesightFailureConfirmation).toBeNull();
        expect(formAfterEyesight.nativeElement.hidden).toBeFalsy();
      });
      it('should dispatch an EyesightResultReset action when the when the method is called', () => {
        component.eyesightFailCancelled();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightResultReset());
      });
    });

  });
  describe('ionViewWillLeave', () => {
    it('should dispatch the PersistTests action', () => {
      component.ionViewWillLeave();
      expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
    });
  });
});
