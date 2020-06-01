import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import { MockComponent } from 'ng-mocks';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';

import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModel } from '../../../../shared/models/store.model';
import { EndTestLinkComponent } from '../../../../components/common/end-test-link/end-test-link';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { VehicleRegistrationComponent } from '../../components/vehicle-registration/vehicle-registration';
import { WaitingRoomToCarValidationError } from '../../waiting-room-to-car.actions';
import { WaitingRoomToCarCatCPCPage } from '../waiting-room-to-car.cat-cpc.page';
import { AccompanimentCardCatCPCComponent } from '../components/accompaniment-card/accompaniment-card.cat-cpc';
import { VehicleDetailsCatCPCComponent } from '../components/vehicle-details/vehicle-details';
import { CombinationComponent } from '../components/combination/combination';
import { PopulateCombination } from '../../../../modules/tests/test-data/cat-cpc/combination/combination.action';
import { PopulateQuestions } from '../../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import {
  InterpreterAccompanimentToggled,
  SupervisorAccompanimentToggled,
} from '../../../../modules/tests/accompaniment/cat-cpc/accompaniment.cat-cpc.actions';
import {
  PopulateVehicleConfiguration,
  VehicleRegistrationChanged,
} from '../../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { CPCQuestionProvider } from '../../../../providers/cpc-questions/cpc-questions';
import { CpcQuestionsMock } from '../../../../providers/cpc-questions/_mocks_/cpc-questions.mock';

describe('WaitingRoomToCarCatCPCPage', () => {
  let fixture: ComponentFixture<WaitingRoomToCarCatCPCPage>;
  let component: WaitingRoomToCarCatCPCPage;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomToCarCatCPCPage,
        MockComponent(EndTestLinkComponent),
        MockComponent(VehicleRegistrationComponent),
        MockComponent(AccompanimentCardCatCPCComponent),
        MockComponent(VehicleDetailsCatCPCComponent),
        MockComponent(CombinationComponent),
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
                category: 'CCPC',
                vehicleDetails: {},
                accompaniment: {},
                testData: {},
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
        { provide: CPCQuestionProvider, useClass: CpcQuestionsMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaitingRoomToCarCatCPCPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

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
      expect(component.navController.push).toHaveBeenCalledWith('TestReportCatCPCPage');
    }));
  });

  describe('combinationSelected', () => {
    it('should receive a combination selection and emit actions for questions to populate state', () => {
      const questions = ['q1', 'q2', 'q3', 'q4'];
      spyOn(component.cpcQuestionProvider, 'getQuestionsBank').and.returnValue(questions);
      spyOn(component.cpcQuestionProvider, 'getQuestion5ByVehicleType').and.returnValue({});

      component.combinationSelected('LGV1');

      expect(component.cpcQuestionProvider.getQuestionsBank).toHaveBeenCalledWith('LGV1');
      expect(component.cpcQuestionProvider.getQuestion5ByVehicleType).toHaveBeenCalledWith('LGV1');
      expect(store$.dispatch).toHaveBeenCalledWith(new PopulateCombination('LGV1'));
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new PopulateQuestions([...questions, {}] as Question[]));
    });
  });

  describe('supervisorAccompanimentToggled', () => {
    it('should dispatch the SupervisorAccompanimentToggled action', () => {
      component.supervisorAccompanimentToggled();
      expect(store$.dispatch).toHaveBeenCalledWith(new SupervisorAccompanimentToggled());
    });
  });

  describe('interpreterAccompanimentToggled', () => {
    it('should dispatch the InterpreterAccompanimentToggled action', () => {
      component.interpreterAccompanimentToggled();
      expect(store$.dispatch).toHaveBeenCalledWith(new InterpreterAccompanimentToggled());
    });
  });

  describe('vehicleRegistrationChanged', () => {
    it('should dispatch the VehicleRegistrationChanged action', () => {
      component.vehicleRegistrationChanged('ABC123');
      expect(store$.dispatch).toHaveBeenCalledWith(new VehicleRegistrationChanged('ABC123'));
    });
  });

  describe('vehicleConfiguration', () => {
    it('should dispatch the PopulateVehicleConfiguration action', () => {
      component.vehicleConfiguration('Articulated');
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new PopulateVehicleConfiguration('Articulated'));
    });
  });
});
