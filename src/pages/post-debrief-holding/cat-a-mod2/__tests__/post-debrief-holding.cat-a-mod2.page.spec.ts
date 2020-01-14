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
import { PostDebriefHoldingViewDidEnter } from '../../post-debrief-holding.actions';
import { PostDebriefHoldingCatAMod2Page } from '../post-debrief-holding.cat-a-mod2.page';

describe('PostDebriefHoldingCatAMod2Page', () => {
  let fixture: ComponentFixture<PostDebriefHoldingCatAMod2Page>;
  let component: PostDebriefHoldingCatAMod2Page;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostDebriefHoldingCatAMod2Page,
        MockComponent(PracticeModeBanner),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PostDebriefHoldingCatAMod2Page);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch a view did enter action', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new PostDebriefHoldingViewDidEnter());
      });
    });
  });
});
