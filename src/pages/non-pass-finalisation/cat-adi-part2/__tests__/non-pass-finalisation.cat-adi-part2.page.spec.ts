import { ComponentFixture, async, TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from 'ionic-angular';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { NonPassFinalisationCatADIPart2Page } from '../non-pass-finalisation.cat-adi-part2.page';
import {
  NonPassFinalisationViewDidEnter,
  NonPassFinalisationValidationError,
} from '../../non-pass-finalisation.actions';
import { ActivityCodeComponent } from '../../../office/components/activity-code/activity-code';
import { SetTestStatusWriteUp } from '../../../../modules/tests/test-status/test-status.actions';
import * as testActions from '../../../../modules/tests/tests.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { LanguagePreferencesComponent } from
'../../../../components/test-finalisation/language-preference/language-preferences';
import { DebriefWitnessedComponent } from
'../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { FinalisationHeaderComponent } from
'../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { DebriefWitnessed, DebriefUnwitnessed } from
'../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from
'../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { CAT_ADI_PART2 } from '../../../page-names.constants';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { ActivityCodeDescription } from '../../../../pages/office/components/activity-code/activity-code.constants';
import {
  ActivityCodeFinalisationProvider,
} from '../../../../providers/activity-code-finalisation/activity-code-finalisation';

describe('NonPassFinalisationCatADIPart2Page', () => {
  let fixture: ComponentFixture<NonPassFinalisationCatADIPart2Page>;
  let component: NonPassFinalisationCatADIPart2Page;
  let store$: Store<StoreModel>;
  let navController$: NavController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        NonPassFinalisationCatADIPart2Page,
        MockComponent(ActivityCodeComponent),
        MockComponent(LanguagePreferencesComponent),
        MockComponent(DebriefWitnessedComponent),
        MockComponent(FinalisationHeaderComponent),
        MockComponent(WarningBannerComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        ActivityCodeFinalisationProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NonPassFinalisationCatADIPart2Page);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    navController$ = TestBed.get(NavController);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch a view did enter action', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new NonPassFinalisationViewDidEnter());
      });
    });
    describe('debriefWitnessedChanged', () => {
      it('should dispatch the correct action if the inputted value is true', () => {
        component.debriefWitnessedChanged(true);
        expect(store$.dispatch).toHaveBeenCalledWith(new DebriefWitnessed());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
      it('should dispatch the correct action if the inputted value is false', () => {
        component.debriefWitnessedChanged(false);
        expect(store$.dispatch).toHaveBeenCalledWith(new DebriefUnwitnessed());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('isWelshChanged', () => {
      it('should dispatch the correct action if the isWelsh flag is true', () => {
        component.isWelshChanged(true);
        expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInWelsh('Cymraeg'));
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
      it('should dispatch the correct action if the isWelsh flag is false', () => {
        component.isWelshChanged(false);
        expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInEnglish('English'));
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('OnContinue', () => {

      it('should remove non pass finalisation from view', fakeAsync(() => {
        spyOn(navController$, 'push').and.returnValue(Promise.resolve());
        spyOn(navController$, 'getViews').and.returnValue([
          { id: CAT_ADI_PART2.TEST_REPORT_PAGE },
          { id: CAT_ADI_PART2.DEBRIEF_PAGE },
          { id: CAT_ADI_PART2.NON_PASS_FINALISATION_PAGE },
        ]);
        spyOn(navController$, 'removeView');
        component.activityCode = {
          activityCode: ActivityCodes.FAIL,
          description: ActivityCodeDescription.FAIL,
        },
        component.testData = {
          dangerousFaults: {},
          seriousFaults: {},
        };

        component.continue();
        flushMicrotasks();
        expect(navController$.push).toHaveBeenCalledWith(CAT_ADI_PART2.BACK_TO_OFFICE_PAGE);
        flushMicrotasks();
        expect(navController$.getViews).toHaveBeenCalled();
        flushMicrotasks();
        expect(navController$.removeView).toHaveBeenCalledWith({ id: 'NonPassFinalisationCatADIPart2Page' });
        expect(navController$.removeView).toHaveBeenCalledWith({ id: 'TestReportCatADIPart2Page' });
        expect(navController$.removeView).toHaveBeenCalledWith({ id: 'DebriefCatADIPart2Page' });
      }));

      it('should dispatch a change test state to WriteUp action', async () => {
        // Arrange
        store$.dispatch(new testActions.StartTest(123, TestCategory.ADI2));
        component.slotId = '123';
        component.activityCode = {
          activityCode: ActivityCodes.FAIL,
          description: ActivityCodeDescription.FAIL,
        },
        component.testData = {
          dangerousFaults: {},
          seriousFaults: {},
        };

        // Act
        await component.continue();

        // Assert
        expect(store$.dispatch).toHaveBeenCalledWith(new SetTestStatusWriteUp('123'));
      });

      // tslint:disable-next-line:max-line-length
      it('should create the TestFinalisationInvalidTestDataModal when activityCode is 5 and no S/D faults', async () => {
        // Arrange
        store$.dispatch(new testActions.StartTest(123, TestCategory.ADI2));
        spyOn(component, 'openTestDataValidationModal').and.callThrough();
        spyOn(component.modalController, 'create').and.callThrough();

        component.slotId = '123';
        component.activityCode = {
          activityCode: ActivityCodes.FAIL_CANDIDATE_STOPS_TEST,
          description: ActivityCodeDescription.FAIL_CANDIDATE_STOPS_TEST,
        },
        component.testData = {
          dangerousFaults: {},
          seriousFaults: {},
        };

        // Act
        await component.continue();

        // Assert
        expect(component.openTestDataValidationModal).toHaveBeenCalled();
        expect(component.modalController.create).toHaveBeenCalled();
        expect(store$.dispatch).not.toHaveBeenCalledWith(new SetTestStatusWriteUp('123'));
      });
      // tslint:disable-next-line:max-line-length
      it('should create the TestFinalisationInvalidTestDataModal when activityCode is 4 and no S/D faults', async () => {
        // Arrange
        store$.dispatch(new testActions.StartTest(123, TestCategory.ADI2));
        spyOn(component, 'openTestDataValidationModal').and.callThrough();
        spyOn(component.modalController, 'create').and.callThrough();

        component.slotId = '123';
        component.activityCode = {
          activityCode: ActivityCodes.FAIL_PUBLIC_SAFETY,
          description: ActivityCodeDescription.FAIL_PUBLIC_SAFETY,
        },
        component.testData = {
          dangerousFaults: {},
          seriousFaults: {},
        };

        // Act
        await component.continue();

        // Assert
        expect(component.openTestDataValidationModal).toHaveBeenCalled();
        expect(component.modalController.create).toHaveBeenCalled();
        expect(store$.dispatch).not.toHaveBeenCalledWith(new SetTestStatusWriteUp('123'));
      });

      it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
        component.form = new FormGroup({
          requiredControl1: new FormControl(null, [Validators.required]),
          requiredControl2: new FormControl(null, [Validators.required]),
          notRequiredControl: new FormControl(null),
        });
        component.activityCode = {
          activityCode: ActivityCodes.FAIL_CANDIDATE_STOPS_TEST,
          description: ActivityCodeDescription.FAIL_CANDIDATE_STOPS_TEST,
        },
        component.testData = {
          dangerousFaults: {},
          seriousFaults: {},
        };

        component.continue();
        tick();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new NonPassFinalisationValidationError('requiredControl1 is blank'));
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new NonPassFinalisationValidationError('requiredControl2 is blank'));
        expect(store$.dispatch)
          .not
          .toHaveBeenCalledWith(new NonPassFinalisationValidationError('notRequiredControl is blank'));
      }));
    });
  });
});
