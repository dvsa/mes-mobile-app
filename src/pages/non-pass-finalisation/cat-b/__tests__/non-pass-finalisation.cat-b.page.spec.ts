import { ComponentFixture, async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from 'ionic-angular';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { NonPassFinalisationCatBPage } from '../non-pass-finalisation.cat-b.page';
import {
  NonPassFinalisationViewDidEnter,
  NonPassFinalisationValidationError,
} from '../../non-pass-finalisation.actions';
import { ActivityCodeComponent } from '../../../office/components/activity-code/activity-code';
import * as testActions from '../../../../modules/tests/tests.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { D255Component } from '../../../../components/test-finalisation/d255/d255';
import { LanguagePreferencesComponent } from
    '../../../../components/test-finalisation/language-preference/language-preferences';
import { DebriefWitnessed, D255Yes, D255No, DebriefUnwitnessed } from
    '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from
    '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { DebriefWitnessedComponent } from
    '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { FinalisationHeaderComponent } from
    '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { ActivityCodeDescription } from '../../../../pages/office/components/activity-code/activity-code.constants';
import {
  ActivityCodeFinalisationProvider,
} from '../../../../providers/activity-code-finalisation/activity-code-finalisation';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';

describe('NonPassFinalisationCatBPage', () => {
  let fixture: ComponentFixture<NonPassFinalisationCatBPage>;
  let component: NonPassFinalisationCatBPage;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        NonPassFinalisationCatBPage,
        MockComponent(PracticeModeBanner),
        MockComponent(ActivityCodeComponent),
        MockComponent(D255Component),
        MockComponent(LanguagePreferencesComponent),
        MockComponent(DebriefWitnessedComponent),
        MockComponent(WarningBannerComponent),
        MockComponent(FinalisationHeaderComponent),
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
    fixture = TestBed.createComponent(NonPassFinalisationCatBPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch a view did enter action', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new NonPassFinalisationViewDidEnter());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('d255Changed', () => {
      it('should dispatch the correct action if the inputted value is true', () => {
        component.d255Changed(true);
        expect(store$.dispatch).toHaveBeenCalledWith(new D255Yes());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
      it('should dispatch the correct action if the inputted value is false', () => {
        component.d255Changed(false);
        expect(store$.dispatch).toHaveBeenCalledWith(new D255No());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
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
    describe('continue', () => {
      // tslint:disable-next-line:max-line-length
      it('should create the TestFinalisationInvalidTestDataModal when activityCode is 5 and no S/D faults', async () => {
        // Arrange
        store$.dispatch(new testActions.StartTest(123, TestCategory.B));
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
      });

      // tslint:disable-next-line:max-line-length
      it('should create the TestFinalisationInvalidTestDataModal when activityCode is 4 and no S/D faults', async () => {
        // Arrange
        store$.dispatch(new testActions.StartTest(123, TestCategory.B));
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
      });

      it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
        component.form = new FormGroup({
          requiredControl1: new FormControl(null, [Validators.required]),
          requiredControl2: new FormControl(null, [Validators.required]),
          notRequiredControl: new FormControl(null),
        });

        component.activityCode = {
          activityCode: ActivityCodes.FAIL,
          description: ActivityCodeDescription.FAIL,
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
