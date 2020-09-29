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
import { CandidateDescriptionComponent } from '../../components/candidate-description/candidate-description';
import { AdditionalInformationComponent } from '../../components/additional-information/additional-information';
import { IdentificationComponent } from '../../components/identification/identification';
import { ToastControllerMock } from '../../__mocks__/toast-controller-mock';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import { OfficeCatCPCPage } from '../office.cat-cpc.page';
import { CombinationComponent } from '../components/combination/combination';
import { AssessmentReportComponent } from '../components/assessment-report/assessment-report';
import { TestOutcome } from '../../../../shared/models/test-outcome';
import {
  AdditionalInformationChanged,
  CandidateDescriptionChanged,
  IdentificationUsedChanged,
} from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { AssessmentReportChanged } from '../../../../modules/tests/test-summary/cat-cpc/test-summary.cat-cpc.actions';
import { CAT_CPC } from '../../../page-names.constants';
import { CompleteTest, OfficeValidationError } from '../../office.actions';
import { of, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateSectionComponent } from '../../components/candidate-section/candidate-section';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../providers/app-config/__mocks__/app-config.mock';
import { TestFinalisationComponentsModule }
 from '../../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule }
 from '../../../pass-finalisation/components/pass-finalisation-components.module';
import { PassCertificateDeclarationComponent }
 from '../components/pass-certificate-declaration/pass-certificate-declaration';

describe('OfficeCatCPCPage', () => {
  let fixture: ComponentFixture<OfficeCatCPCPage>;
  let component: OfficeCatCPCPage;
  let navController: NavController;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        OfficeCatCPCPage,
        MockComponent(CandidateDescriptionComponent),
        MockComponent(IdentificationComponent),
        MockComponent(CombinationComponent),
        MockComponent(AdditionalInformationComponent),
        MockComponent(AssessmentReportComponent),
        MockComponent(CandidateSectionComponent),
        MockComponent(PassCertificateDeclarationComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        PassFinalisationComponentsModule,
        TestFinalisationComponentsModule,
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
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
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

  describe('getCombinationAdditionalText', () => {
    it('should return the additionalText for the passed in combination code (LGV1)', () => {
      expect(component.getCombinationAdditionalText('LGV1')).toEqual('Fire ex');
    });

    it('should return the additionalText for the passed in combination code (LGV2)', () => {
      expect(component.getCombinationAdditionalText('LGV2')).toEqual('LSDT');
    });

    it('should return the null for the passed in combination code (LGV3) has no additional text', () => {
      expect(component.getCombinationAdditionalText('LGV3')).toEqual(null);
    });

    it('should return null when nothing is passed in', () => {
      expect(component.getCombinationAdditionalText(null)).toEqual(null);
    });
  });

  describe('isFail', () => {
    it('should return false if test outcome is pass', () => {
      component.outcome = TestOutcome.PASS;
      expect(component.isFail()).toEqual(false);
    });

    it('should return true if test outcome is fail', () => {
      component.outcome = TestOutcome.FAIL;
      expect(component.isFail()).toEqual(true);
    });
  });

  describe('onSubmit', () => {
    it('should call showFinishTestModal when form is valid', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      spyOn(component, 'showFinishTestModal');
      component.onSubmit();
      expect(component.showFinishTestModal).toHaveBeenCalled();
    });

    it('should not call showFinishTestModal when form is not valid', () => {
      spyOn(component, 'isFormValid').and.returnValue(false);
      spyOn(component, 'showFinishTestModal');
      component.onSubmit();
      expect(component.showFinishTestModal).not.toHaveBeenCalled();
    });
  });

  describe('candidateDescriptionChanged', () => {
    it('should dispatch candidate description to the store', () => {
      component.candidateDescriptionChanged('tall');
      expect(store$.dispatch).toHaveBeenCalledWith(new CandidateDescriptionChanged('tall'));
    });
  });

  describe('identificationChanged', () => {
    it('should dispatch identification to the store', () => {
      component.identificationChanged('Licence');
      expect(store$.dispatch).toHaveBeenCalledWith(new IdentificationUsedChanged('Licence'));
    });
  });

  describe('additionalInformationChanged', () => {
    it('should dispatch additional info to the store', () => {
      component.additionalInformationChanged('text');
      expect(store$.dispatch).toHaveBeenCalledWith(new AdditionalInformationChanged('text'));
    });
  });

  describe('assessmentReportChanged', () => {
    it('should dispatch assessemnt report to the store', () => {
      component.assessmentReportChanged('text');
      expect(store$.dispatch).toHaveBeenCalledWith(new AssessmentReportChanged('text'));
    });
  });

  describe('goToReasonForRekey', () => {
    it('should call navController when form is valid', () => {
      spyOn(component, 'isFormValid').and.returnValue(true);
      spyOn(component.navController, 'push');
      component.goToReasonForRekey();
      expect(component.navController.push).toHaveBeenCalledWith(CAT_CPC.REKEY_REASON_PAGE);
    });

    it('should not call navController when form is not valid', () => {
      spyOn(component, 'isFormValid').and.returnValue(false);
      spyOn(component.navController, 'push');
      component.goToReasonForRekey();
      expect(component.navController.push).not.toHaveBeenCalled();
    });
  });

  describe('isFormValid', () => {

    it('should return true if form is valid', () => {
      spyOn(component, 'createToast');
      const form = component.form;
      fixture.detectChanges();
      component.pageState.additionalInformation$ = of('text');
      component.isFormValid();
      fixture.detectChanges();
      expect(form.valid).toEqual(true);
    });

    it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
      component.form = new FormGroup({
        requiredControl1: new FormControl(null, [Validators.required]),
        requiredControl2: new FormControl(null, [Validators.required]),
        notRequiredControl: new FormControl(null),
      });

      component.isFormValid();
      tick();
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new OfficeValidationError('requiredControl1 is blank'));
      expect(store$.dispatch)
        .toHaveBeenCalledWith(new OfficeValidationError('requiredControl2 is blank'));
      expect(store$.dispatch)
        .not.toHaveBeenCalledWith(new OfficeValidationError('notRequiredControl is blank'));
    }));
  });

  describe('completeTest', () => {
    it('should dispatch CompleteTest and call pop to root', () => {
      spyOn(component, 'popToRoot');
      component.completeTest();
      expect(store$.dispatch).toHaveBeenCalledWith(new CompleteTest());
      expect(component.popToRoot).toHaveBeenCalled();
    });
  });

  describe('ionViewDidLeave', () => {
    it('should unsubscribe when subscription', () => {
      component.subscription = new Subscription();
      spyOn(component.subscription, 'unsubscribe');
      component.ionViewDidLeave();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
