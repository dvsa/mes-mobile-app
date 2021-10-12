import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Alert, AlertController, IonicModule, NavController } from 'ionic-angular';
import { AlertControllerMock, NavControllerMock } from 'ionic-mocks';
import { of } from 'rxjs/observable/of';
import { take } from 'rxjs/operators';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { ManoeuvresPage } from '../manoeuvres';
import { StoreModel } from '../../../shared/models/store.model';
import { CandidateSectionComponent } from '../../../components/common/candidate-section/candidate-section';
import { ActivityCodeComponent } from '../../office/components/activity-code/activity-code';
import { TransmissionComponent } from '../../../components/common/transmission/transmission';
import {
  PassCertificateNumberComponent,
} from '../../pass-finalisation/components/pass-certificate-number/pass-certificate-number';
import { AppModule } from '../../../app/app.module';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { PassCertificateNumberChanged } from '../../../modules/tests/pass-completion/pass-completion.actions';
import {
  ClearGearboxCategory,
  GearboxCategoryChanged,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { ActivityCodeModel } from '../../office/components/activity-code/activity-code.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManoeuvresPageValidationError } from '../manoeuvres.actions';
import { CompleteTest } from '../../office/office.actions';
import { JOURNAL_PAGE } from '../../page-names.constants';

describe('ManoeuvresPage', () => {
  let fixture: ComponentFixture<ManoeuvresPage>;
  let component: ManoeuvresPage;
  let store$: Store<StoreModel>;
  let navController: NavController;
  let alertController: AlertController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManoeuvresPage,
        MockComponent(CandidateSectionComponent),
        MockComponent(ActivityCodeComponent),
        MockComponent(TransmissionComponent),
        MockComponent(PassCertificateNumberComponent),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forFeature('tests', () => ({
          currentTest: { slotId: '123' },
          testStatus: {},
          startedTests: {
            123: {
              journalData: { candidate: candidateMock },
              activityCode: '1',
              category: TestCategory.CEM,
              passCompletion: { passCertificateNumber: '1234123' },
              vehicleDetails: { gearboxCategory: 'Automatic' },
              communicationPreferences: { conductedLanguage: 'English' },
            },
          },
        })),
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManoeuvresPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    navController = TestBed.get(NavController);
    alertController = TestBed.get(AlertController);

    spyOn(store$, 'dispatch');
    component.subscription = new Subscription();
  }));

  describe('Class', () => {
    describe('ngOnInit', () => {
      it('should resolve page variables', () => {
        component.ngOnInit();
        forkJoin([
          component.pageState.candidateName$,
          component.pageState.candidateUntitledName$,
          component.pageState.candidateDriverNumber$,
          component.pageState.passCertificateNumber$,
          component.pageState.transmission$,
          component.pageState.testCategory$,
          component.pageState.testOutcomeText$,
          component.pageState.activityCode$,
        ]).pipe(take(1))
          .subscribe((
            [
              name,
              untitledName,
              driNumber,
              passCertNum,
              transmission,
              category,
              outcomeText,
              activityCodeModel,
            ],
          ) => {
            expect(name).toEqual('mr some name');
            expect(untitledName).toEqual('some name');
            expect(driNumber).toEqual('1232');
            expect(passCertNum).toEqual('1231132');
            expect(transmission).toEqual('Automatic');
            expect(category).toEqual(TestCategory.CEM);
            expect(outcomeText).toEqual('o');
            expect((activityCodeModel as ActivityCodeModel).activityCode).toEqual('1');
          });
      });
    });
    describe('ionViewWillEnter', () => {
      it('should assign the value of the observables to subscription', () => {
        expect(component.subscription).not.toEqual(component.merged$);
        component.merged$ = of('val');
        component.ionViewWillEnter();
        expect(component.subscription).toEqual(of('val').pipe(take(1)).subscribe());
      });
    });
    describe('ionViewDidLeave', () => {
      it('should call unsubscribe if subscription is defined', () => {
        spyOn(component.subscription, 'unsubscribe');
        component.ionViewDidLeave();
        expect(component.subscription.unsubscribe).toHaveBeenCalled();
      });
    });
    describe('clickBack', () => {
      it('should call through to the nav ctrl pop', () => {
        spyOn(navController, 'pop');
        component.clickBack();
        expect(navController.pop).toHaveBeenCalled();
      });
    });
    describe('passCertificateNumberChanged', () => {
      it('should dispatch PassCertificateNumberChanged with input', () => {
        component.passCertificateNumberChanged('C123456X');
        expect(store$.dispatch).toHaveBeenCalledWith(new PassCertificateNumberChanged('C123456X'));
      });
    });
    describe('transmissionChanged', () => {
      it('should dispatch GearboxCategoryChanged with input', () => {
        component.transmissionChanged('Automatic');
        expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Automatic'));
      });
    });
    describe('activityCodeChanged', () => {
      it('should dispatch SetActivityCode with input', () => {
        component.activityCodeChanged({ activityCode: '1' } as ActivityCodeModel);
        expect(store$.dispatch).toHaveBeenCalledWith(new SetActivityCode('1'));
      });
    });
    describe('onSubmit', () => {
      beforeEach(() => {
        spyOn(component, 'showCompleteModal');
      });
      it('should not call the modal when form is invalid', async () => {
        spyOn(component, 'isFormValid').and.returnValue(false);
        await component.onSubmit();
        expect(component.showCompleteModal).not.toHaveBeenCalled();
      });
      it('should call through to modal on valid form detection', async () => {
        spyOn(component, 'isFormValid').and.returnValue(true);
        await component.onSubmit();
        expect(component.showCompleteModal).toHaveBeenCalled();
      });
    });
    describe('showCompleteModal', () => {
      it('should call alertController.create', async () => {
        spyOn(alertController, 'create').and.returnValue({
          present: async () => {},
        } as Alert);
        await component.showCompleteModal();
        expect(alertController.create).toHaveBeenCalled();
      });
    });
    describe('isFormValid', () => {
      it('should recognise and invalid form and dispatch actions', () => {
        component.form = new FormGroup({
          ctrl: new FormControl(null, [Validators.required]),
        });
        component.isFormValid();
        expect(store$.dispatch).toHaveBeenCalledWith(new ManoeuvresPageValidationError('ctrl is blank'));
      });
      it('should recognise no invalid controls and return true', () => {
        component.form = new FormGroup({
          ctrl: new FormControl(null),
        });
        expect(component.isFormValid()).toEqual(true);
        expect(store$.dispatch).not.toHaveBeenCalled();
      });
    });
    describe('onTestDetailsConfirm', () => {
      beforeEach(() => {
        spyOn(navController, 'getViews').and.returnValue([{ id: JOURNAL_PAGE }]);
        spyOn(navController, 'popTo').and.returnValue(Promise.resolve());
        component.passCode = '1';
      });
      it('should dispatch the complete test action and pop to journal', async () => {
        component.activityCodeSelected = { activityCode: '1' } as ActivityCodeModel;
        await component.onTestDetailsConfirm();
        expect(store$.dispatch).toHaveBeenCalledWith(new CompleteTest());
        expect(navController.getViews).toHaveBeenCalled();
        expect(navController.popTo).toHaveBeenCalled();
      });
      it('should remove previously selected value if changed from pass and pop to journal', async () => {
        component.activityCodeSelected = { activityCode: '2' } as ActivityCodeModel;
        await component.onTestDetailsConfirm();
        expect(store$.dispatch).toHaveBeenCalledWith(new PassCertificateNumberChanged(null));
        expect(store$.dispatch).toHaveBeenCalledWith(new ClearGearboxCategory());
        expect(store$.dispatch).toHaveBeenCalledWith(new CompleteTest());
        expect(navController.getViews).toHaveBeenCalled();
        expect(navController.popTo).toHaveBeenCalled();
      });
    });
  });
});
