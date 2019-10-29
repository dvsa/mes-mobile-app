import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from 'ionic-angular';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { NonPassFinalisationCatBEPage } from '../non-pass-finalisation.cat-be.page';
import { NonPassFinalisationViewDidEnter } from '../../non-pass-finalisation.actions';
import { ActivityCodeComponent } from '../../../office/components/activity-code/activity-code';
import { SetTestStatusWriteUp } from '../../../../modules/tests/test-status/test-status.actions';
import * as testActions from '../../../../modules/tests/tests.actions';
import { TestFinalisationComponentsModule } from
  '../../../../components/test-finalisation/test-finalisation-component.module';
import { TestCategory } from '../../../../shared/models/test-category';

describe('NonPassFinalisationCatBEPage', () => {
  let fixture: ComponentFixture<NonPassFinalisationCatBEPage>;
  let component: NonPassFinalisationCatBEPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NonPassFinalisationCatBEPage,
        MockComponent(PracticeModeBanner),
        MockComponent(ActivityCodeComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
        TestFinalisationComponentsModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NonPassFinalisationCatBEPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch a view did enter action', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new NonPassFinalisationViewDidEnter());
      });
    });
  });

  describe('OnContinue', () => {
    it('should dispatch a change test state to WriteUp action', () => {
      // Arrange
      store$.dispatch(new testActions.StartTest(123, TestCategory.BE));
      component.slotId = '123';

      // Act
      component.continue();

      // Assert
      expect(store$.dispatch).toHaveBeenCalledWith(new SetTestStatusWriteUp('123'));
    });
  });
});
