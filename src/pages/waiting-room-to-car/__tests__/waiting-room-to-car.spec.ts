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
import {
  GearboxCategoryChanged,
  SchoolCarToggled,
  DualControlsToggled,
} from '../../../modules/tests/vehicle-details/vehicle-details.actions';
import {
  InstructorAccompanimentToggled,
  SupervisorAccompanimentToggled,
  OtherAccompanimentToggled,
} from '../../../modules/tests/accompaniment/accompaniment.actions';
import { MockComponent } from 'ng-mocks';
import {
  EyesightFailureConfirmationComponent,
} from '../components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import { of } from 'rxjs/observable/of';
import {
  EyesightResultFailed,
  EyesightResultPasssed,
  EyesightResultReset,
} from '../../../modules/tests/eyesight-test-result/eyesight-test-result.actions';
import { QuestionProvider } from '../../../providers/question/question';
import { QuestionProviderMock } from '../../../providers/question/__mocks__/question.mock';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';
import {
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
} from '../../../modules/tests/test_data/test-data.actions';

describe('WaitingRoomToCarPage', () => {
  let fixture: ComponentFixture<WaitingRoomToCarPage>;
  let component: WaitingRoomToCarPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomToCarPage,
        MockComponent(EyesightFailureConfirmationComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
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
                  vehicleChecks: {
                    tellMeQuestion: {
                      code: 'T1',
                      description: 'desc',
                      outcome: 'P',
                    },
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
    describe('changing transmission', () => {
      it('should dispatch a change to manual gearbox category action when manual is clicked', () => {
        const manualRadio = fixture.debugElement.query(By.css('#transmission-manual'));
        manualRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Manual'));
      });
      it('should dispatch a change to automatic gearbox category action when automatic is clicked', () => {
        const automaticRadio = fixture.debugElement.query(By.css('#transmission-automatic'));
        automaticRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Automatic'));
      });
    });

    describe('changing accompaniment status', () => {
      it('should dispatch a toggle instructor accompaniment action when Ins is clicked', () => {
        const instructorCb = fixture.debugElement.query(By.css('#accompaniment-instructor'));
        instructorCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new InstructorAccompanimentToggled());
      });
      it('should dispatch a toggle supervisor accompaniment action when Sup is clicked', () => {
        const supervisorCb = fixture.debugElement.query(By.css('#accompaniment-supervisor'));
        supervisorCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new SupervisorAccompanimentToggled());
      });
      it('should dispatch a toggle other accompaniment action when Other is clicked', () => {
        const otherCb = fixture.debugElement.query(By.css('#accompaniment-other'));
        otherCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new OtherAccompanimentToggled());
      });
    });

    describe('setting optional vehicle details', () => {
      it('should dispatch a toggle school car action when school car is selected', () => {
        const schoolCarCb = fixture.debugElement.query(By.css('#school-car'));
        schoolCarCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new SchoolCarToggled());
      });
      it('should dispatch a toggle dual controls action when dual controls is selected', () => {
        const dualControlCb = fixture.debugElement.query(By.css('#dual-control'));
        dualControlCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new DualControlsToggled());
      });
    });

    describe('eyesight failure confirmation', () => {
      it('should dispatch an EyesightResultPassed action when Pass is pressed', () => {
        const passEyesightRadio = fixture.debugElement.query(By.css('#eyesight-pass'));
        passEyesightRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightResultPasssed());
      });
      it('should dispatch an EyesightResultFailed action when Fail is pressed', () => {
        const failEyesightRadio = fixture.debugElement.query(By.css('#eyesight-fail'));
        failEyesightRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightResultFailed());
      });
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

    describe('marking tell me question', () => {
      it('should dispatch a TellMeQuestionCorrect action when marked as correct', () => {
        fixture.detectChanges();
        const tellMeCorrectRadio = fixture.debugElement.query(By.css('#tell-me-correct'));
        tellMeCorrectRadio.triggerEventHandler('click', null);
        expect(store$.dispatch).toHaveBeenCalledWith(new TellMeQuestionCorrect());
      });
      it('should dispatch a TellMeQuestionDrivingFault action when marked as a driving fault', () => {
        fixture.detectChanges();
        const tellMeFaultRadio = fixture.debugElement.query(By.css('#tell-me-fault'));
        tellMeFaultRadio.triggerEventHandler('click', null);
        expect(store$.dispatch).toHaveBeenCalledWith(new TellMeQuestionDrivingFault());
      });
    });
  });
});
