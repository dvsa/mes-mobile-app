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
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { RouteNumberComponent } from '../../components/route-number/route-number';
import { CandidateDescriptionComponent } from '../../components/candidate-description/candidate-description';
import { WeatherConditionsComponent } from '../../components/weather-conditions/weather-conditions';
import { AdditionalInformationComponent } from '../../components/additional-information/additional-information';
import { IdentificationComponent } from '../../components/identification/identification';
import { IndependentDrivingComponent } from '../../components/independent-driving/independent-driving';
import { OfficeValidationError } from '../../office.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastControllerMock } from '../../__mocks__/toast-controller-mock';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import { OfficeCatCPCPage } from '../office.cat-cpc.page';
import { CombinationComponent } from '../components/combination/combination';
import { AssessmentReportComponent } from '../components/assessment-report/assessment-report';
import { CPCDebriefCardComponent } from '../../../../components/common/cpc-debrief-card/cpc-debrief-card';
import { ActivityCodeComponent } from '../../components/activity-code/activity-code';

fdescribe('OfficeCatCPCPage', () => {
  let fixture: ComponentFixture<OfficeCatCPCPage>;
  let component: OfficeCatCPCPage;
  let navController: NavController;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        OfficeCatCPCPage,
        MockComponent(ActivityCodeComponent),
        MockComponent(CandidateDescriptionComponent),
        MockComponent(IdentificationComponent),
        MockComponent(CombinationComponent),
        MockComponent(AdditionalInformationComponent),
        MockComponent(AssessmentReportComponent),
        MockComponent(CPCDebriefCardComponent),
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
                category: TestCategory.CCPC,
                vehicleDetails: {},
                accompaniment: {},
                testSummary: {
                  candidateDescription: 'tall',
                  additionalInformation: 'additional',
                  assessmentReport: null,
                  identification: 'Licence',
                  D255: false,
                },
                testData: {
                  combination: 'LGV4',
                  question1: {
                    questionCode: 'Q08',
                    title: 'title',
                    subtitle: 'subtitle',
                    additionalItems: [],
                    answer1: {
                      selected: true,
                      label: 'label',
                    },
                    answer2: {
                      selected: false,
                      label: 'label',
                    },
                    answer3: {
                      selected: false,
                      label: 'label',
                    },
                    answer4: {
                      selected: false,
                      label: 'label',
                    },
                    score: 5,
                  },
                  question2: {
                    questionCode: 'Q04',
                    title: 'title',
                    subtitle: 'subtitle',
                    additionalItems: [],
                    answer1: {
                      selected: true,
                      label: 'label',
                    },
                    answer2: {
                      selected: false,
                      label: 'label',
                    },
                    answer3: {
                      selected: false,
                      label: 'label',
                    },
                    answer4: {
                      selected: false,
                      label: 'label',
                    },
                    score: 5,
                  },
                  question3: {
                    questionCode: 'Q15',
                    title: 'title',
                    subtitle: 'subtitle',
                    additionalItems: [],
                    answer1: {
                      selected: true,
                      label: 'label',
                    },
                    answer2: {
                      selected: false,
                      label: 'label',
                    },
                    answer3: {
                      selected: false,
                      label: 'label',
                    },
                    answer4: {
                      selected: false,
                      label: 'label',
                    },
                    score: 5,
                  },
                  question4: {
                    questionCode: 'Q11',
                    title: 'title',
                    subtitle: 'subtitle',
                    additionalItems: [],
                    answer1: {
                      selected: true,
                      label: 'label',
                    },
                    answer2: {
                      selected: false,
                      label: 'label',
                    },
                    answer3: {
                      selected: false,
                      label: 'label',
                    },
                    answer4: {
                      selected: false,
                      label: 'label',
                    },
                    score: 5,
                  },
                  question5: {
                    questionCode: 'Q05',
                    title: 'title',
                    subtitle: 'subTitle',
                    additionalItems: [],
                    answer1: {
                      selected: true,
                      label: 'Brakes',
                    },
                    answer2: {
                      selected: true,
                      label: 'Horn',
                    },
                    answer3: {
                      selected: false,
                      label: 'Exhaust system(s)',
                    },
                    answer4: {
                      selected: true,
                      label: 'Lights/Reflectors',
                    },
                    answer5: {
                      selected: true,
                      label: 'Mirrors',
                    },
                    answer6: {
                      selected: false,
                      label: 'Instrument panel warning lights',
                    },
                    answer7: {
                      selected: true,
                      label: 'Tyres / Wheel fixings ',
                    },
                    answer8: {
                      selected: true,
                      label: 'Height marker',
                    },
                    answer9: {
                      selected: true,
                      label: 'Wipers / Washers',
                    },
                    answer10: {
                      selected: true,
                      label: 'Air leaks',
                    },
                    score: 15,
                  },
                  totalPercent: 75,
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
      ],
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: ToastController, useClass: ToastControllerMock },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OfficeCatCPCPage);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('popToRoot', () => {
    it('should call the popTo method in the navcontroller if not in practice mode', () => {
      component.popToRoot();
      expect(navController.popTo).toHaveBeenCalled();
    });
  });

  describe('defer', () => {
    it('should call the popTo method', () => {
      spyOn(component, 'popToRoot');
      component.defer();
      expect(component.popToRoot).toHaveBeenCalled();
    });
  });

  // describe('onSubmit', () => {
  //   it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
  //     component.form = new FormGroup({
  //       requiredControl1: new FormControl(null, [Validators.required]),
  //       requiredControl2: new FormControl(null, [Validators.required]),
  //       notRequiredControl: new FormControl(null),
  //     });
  //
  //     component.onSubmit();
  //     tick();
  //     expect(store$.dispatch)
  //       .toHaveBeenCalledWith(new OfficeValidationError('requiredControl1 is blank'));
  //     expect(store$.dispatch)
  //       .toHaveBeenCalledWith(new OfficeValidationError('requiredControl2 is blank'));
  //     expect(store$.dispatch)
  //       .not
  //       .toHaveBeenCalledWith(new OfficeValidationError('notRequiredControl is blank'));
  //   }));
  // });
});
