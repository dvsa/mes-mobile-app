import { ComponentFixture, async, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavParamsMock, ConfigMock, PlatformMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { DebriefWitnessedComponent } from
    '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from
    '../../../../components/test-finalisation/language-preference/language-preferences';
import { FinalisationHeaderComponent } from
    '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import {
  PassFinalisationViewDidEnter,
} from '../../pass-finalisation.actions';
import { DebriefWitnessed, DebriefUnwitnessed } from
    '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from
    '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PassFinalisationCatADIPart2Page } from '../pass-finalisation.cat-adi-part2.page';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
import { CAT_ADI_PART2 } from '../../../page-names.constants';

describe('PassFinalisationCatADIPart2Page', () => {
  let fixture: ComponentFixture<PassFinalisationCatADIPart2Page>;
  let component: PassFinalisationCatADIPart2Page;
  let store$: Store<StoreModel>;
  let navController$: NavController;
  jasmine.getEnv().allowRespy(true);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassFinalisationCatADIPart2Page,
        MockComponent(DebriefWitnessedComponent),
        MockComponent(FinalisationHeaderComponent),
        MockComponent(LanguagePreferencesComponent),
        MockComponent(WarningBannerComponent),
      ],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PassFinalisationCatADIPart2Page);
    component = fixture.componentInstance;
    component.subscription = new Subscription();
    store$ = TestBed.get(Store);
    navController$ = TestBed.get(NavController);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch the VIEW_DID_ENTER action when the function is run', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new PassFinalisationViewDidEnter());
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
    describe('onSubmit', () => {
      it('should dispatch the PersistTests action', () => {
        component.onSubmit();
        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
      });

      it('should remove pass finalisation from view', fakeAsync(() => {
        spyOn(navController$, 'push').and.returnValue(Promise.resolve());
        spyOn(navController$, 'getViews').and.returnValue([
          { id: CAT_ADI_PART2.TEST_REPORT_PAGE },
          { id: CAT_ADI_PART2.DEBRIEF_PAGE },
          { id: CAT_ADI_PART2.PASS_FINALISATION_PAGE },
        ]);
        spyOn(navController$, 'removeView');
        component.onSubmit();
        flushMicrotasks();
        expect(navController$.push).toHaveBeenCalledWith(CAT_ADI_PART2.BACK_TO_OFFICE_PAGE);
        flushMicrotasks();
        expect(navController$.getViews).toHaveBeenCalled();
        flushMicrotasks();
        expect(navController$.removeView).toHaveBeenCalledWith({ id: 'PassFinalisationCatADIPart2Page' });
        expect(navController$.removeView).toHaveBeenCalledWith({ id: 'TestReportCatADIPart2Page' });
        expect(navController$.removeView).toHaveBeenCalledWith({ id: 'DebriefCatADIPart2Page' });
      }));

      it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
        component.form = new FormGroup({
          requiredControl1: new FormControl(null, [Validators.required]),
          notRequiredControl: new FormControl(null),
        });
      }));
    });
  });
});
