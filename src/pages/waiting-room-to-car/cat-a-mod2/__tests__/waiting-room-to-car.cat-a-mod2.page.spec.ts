import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { WaitingRoomToCarCatAMod2Page } from '../waiting-room-to-car.cat-a-mod2.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import {
  EyesightFailureConfirmationComponent,
} from '../../components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import { of } from 'rxjs/observable/of';
import { QuestionProvider } from '../../../../providers/question/question';
import { QuestionProviderMock } from '../../../../providers/question/__mocks__/question.mock';
import { EndTestLinkComponent } from '../../../../components/common/end-test-link/end-test-link';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { VehicleRegistrationComponent } from '../../components/vehicle-registration/vehicle-registration';
import { VehicleDetailsCardComponent } from '../../components/vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from '../../components/vehicle-details/vehicle-details';
import { AccompanimentCardComponent } from '../../components/accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from '../../components/accompaniment/accompaniment';
import { EyesightTestComponent } from '../../components/eyesight-test/eyesight-test';
import { EyesightTestReset } from '../../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { WaitingRoomToCarValidationError } from '../../waiting-room-to-car.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleChecksCatAMod2Component } from '../components/vehicle-checks/vehicle-checks';
import { configureTestSuite } from 'ng-bullet';
import { TransmissionComponent } from '../../../../components/common/transmission/transmission';
import { BikeCategoryTypeComponent } from '../../components/bike-category-type/bike-category-type';

describe('WaitingRoomToCarCatAMod2Page', () => {
  let fixture: ComponentFixture<WaitingRoomToCarCatAMod2Page>;
  let component: WaitingRoomToCarCatAMod2Page;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomToCarCatAMod2Page,
        MockComponent(EyesightTestComponent),
        MockComponent(EyesightFailureConfirmationComponent),
        MockComponent(EndTestLinkComponent),
        MockComponent(VehicleRegistrationComponent),
        MockComponent(VehicleDetailsCardComponent),
        MockComponent(VehicleDetailsComponent),
        MockComponent(AccompanimentCardComponent),
        MockComponent(AccompanimentComponent),
        MockComponent(VehicleChecksCatAMod2Component),
        MockComponent(TransmissionComponent),
        MockComponent(BikeCategoryTypeComponent),
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
                  safetyAndBalanceQuestions: {
                    safetyQuestions: [],
                    balanceQuestions: [],
                  },
                  seriousFaults: [],
                  eyesightTest: {},
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
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaitingRoomToCarCatAMod2Page);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('DOM', () => {

    describe('eyesight failure confirmation', () => {

      // tslint:disable-next-line:max-line-length
      it('should hide the rest of the form and show eyesight failure confirmation when page state indicates fail is selected', () => {
        fixture.detectChanges();
        component.pageState.eyesightTestComplete$ = of(true);
        component.pageState.eyesightTestFailed$ = of(true);
        fixture.detectChanges();
        const eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
        const formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
        expect(eyesightFailureConfirmation).not.toBeNull();
        expect(formAfterEyesight.nativeElement.hidden).toEqual(true);
      });
      // tslint:disable-next-line:max-line-length
      it('should show the rest of the form and not render eyesight failure confirmation when page state indicates pass is selected', () => {
        fixture.detectChanges();
        component.pageState.eyesightTestComplete$ = of(true);
        fixture.detectChanges();
        const eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
        const formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
        expect(eyesightFailureConfirmation).toBeNull();
        expect(formAfterEyesight.nativeElement.hidden).toEqual(false);
      });
      it('should dispatch an EyesightResultReset action when the when the method is called', () => {
        component.eyesightFailCancelled();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightTestReset());
      });
    });

  });
  describe('ionViewWillLeave', () => {
    it('should dispatch the PersistTests action', () => {
      component.ionViewWillLeave();
      expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
    });
  });
  describe('onSubmit', () => {
    it('should dispatch the appropriate WaitingRoomToCarValidationError actions', fakeAsync(() => {
      fixture.detectChanges();

      component.form = new FormGroup({
        requiredControl1: new FormControl(null, [Validators.required]),
        requiredControl2: new FormControl(null, [Validators.required]),
        notRequiredControl: new FormControl(null),
      });

      component.onSubmit();
      tick();
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('requiredControl1 is blank'));
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('requiredControl2 is blank'));
      expect(store$.dispatch)
        .not
        .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('notRequiredControl is blank'));
    }));

    it('should navigate to the test report page', fakeAsync(() => {
      fixture.detectChanges();

      component.form = new FormGroup({
        requiredControl1: new FormControl({ value: 1, disabled: false }, [Validators.required]),
        requiredControl2: new FormControl({ value: 1, disabled: false }, [Validators.required]),
        notRequiredControl: new FormControl(null),
      });

      component.onSubmit();
      tick();
      expect(component.navController.push).toHaveBeenCalledWith('TestReportCatAMod2Page');
    }));
  });
});
