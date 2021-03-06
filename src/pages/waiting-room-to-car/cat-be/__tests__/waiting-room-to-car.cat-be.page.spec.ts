import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { WaitingRoomToCarCatBEPage } from '../waiting-room-to-car.cat-be.page';
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
import { of } from 'rxjs';
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
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { VehicleChecksCatBEComponent } from '../components/vehicle-checks/vehicle-checks';
import { configureTestSuite } from 'ng-bullet';
import {
  VehicleChecksCompletedToggled,
} from '../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import {
  CandidateDeclarationSigned,
  SetDeclarationStatus,
} from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { VehicleChecksToggleComponent } from '../../components/vehicle-checks-completed/vehicle-checks-completed';
import { CandidateDeclarationSignedComponent } from '../../components/candidate-declaration/candidate-declaration';

describe('WaitingRoomToCarCatBEPage', () => {
  let fixture: ComponentFixture<WaitingRoomToCarCatBEPage>;
  let component: WaitingRoomToCarCatBEPage;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomToCarCatBEPage,
        MockComponent(EyesightTestComponent),
        MockComponent(EyesightFailureConfirmationComponent),
        MockComponent(EndTestLinkComponent),
        MockComponent(VehicleRegistrationComponent),
        MockComponent(VehicleDetailsCardComponent),
        MockComponent(VehicleDetailsComponent),
        MockComponent(AccompanimentCardComponent),
        MockComponent(AccompanimentComponent),
        MockComponent(VehicleChecksCatBEComponent),
        MockComponent(WarningBannerComponent),
        MockComponent(VehicleChecksToggleComponent),
        MockComponent(CandidateDeclarationSignedComponent),
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
                    tellMeQuestions: [],
                    showMeQuestions: [],
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
    fixture = TestBed.createComponent(WaitingRoomToCarCatBEPage);
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
      it('should show the is load secure warning banner', () => {
        fixture.detectChanges();
        const warningBanner = fixture.debugElement.query(By.css('warning-banner'));
        expect(warningBanner).not.toBeNull();
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
      expect(component.navController.push).toHaveBeenCalledWith('TestReportCatBEPage');
    }));
  });
  describe('vehicleChecksCompletedOutcomeChanged', () => {
    it('should dispatch VehicleChecksCompletedToggled action with the value passed in', () => {
      component.vehicleChecksCompletedOutcomeChanged(true);
      expect(store$.dispatch).toHaveBeenCalledWith(new VehicleChecksCompletedToggled(true));
    });
  });

  describe('candidateDeclarationOutcomeChanged', () => {
    it('should dispatch a SetDeclarationStatus action with the value passed in and CandidateDeclarationSigned', () => {
      component.candidateDeclarationOutcomeChanged(false);
      expect(store$.dispatch).toHaveBeenCalledWith(new SetDeclarationStatus(false));
      expect(store$.dispatch).toHaveBeenCalledWith(new CandidateDeclarationSigned());
    });
  });
});
