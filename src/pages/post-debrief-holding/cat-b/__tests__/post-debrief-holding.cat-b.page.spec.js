import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from 'ionic-angular';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { PostDebriefHoldingCatBPage } from '../post-debrief-holding.cat-b.page';
import { PostDebriefHoldingViewDidEnter } from '../../post-debrief-holding.actions';
import { configureTestSuite } from 'ng-bullet';
describe('PostDebriefHoldingCatBPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PostDebriefHoldingCatBPage,
                MockComponent(PracticeModeBanner),
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PostDebriefHoldingCatBPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('ionViewDidEnter', function () {
            it('should dispatch a view did enter action', function () {
                component.ionViewDidEnter();
                expect(store$.dispatch).toHaveBeenCalledWith(new PostDebriefHoldingViewDidEnter());
            });
        });
    });
});
//# sourceMappingURL=post-debrief-holding.cat-b.page.spec.js.map