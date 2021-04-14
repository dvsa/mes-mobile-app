import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ModalControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { RekeySearchPage } from '../rekey-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { StoreModule, Store } from '@ngrx/store';
import { rekeySearchReducer } from '../rekey-search.reducer';
import { RekeySearchViewDidEnter, SearchBookedTest } from '../rekey-search.actions';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { bookedTestSlotMock } from '../../../shared/mocks/test-slot-data.mock';
import { configureTestSuite } from 'ng-bullet';
describe('RekeySearchPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                RekeySearchPage,
            ],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                TestSlotComponentsModule,
                StoreModule.forRoot({
                    rekeySearch: rekeySearchReducer,
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: ViewController, useFactory: function () { return ViewControllerMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: App, useClass: MockAppComponent },
                Store,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(RekeySearchPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
        it('should dispatch RekeySearchViewDidEnter action', function () {
            spyOn(store$, 'dispatch');
            component.ionViewDidEnter();
            expect(store$.dispatch).toHaveBeenCalledWith(new RekeySearchViewDidEnter());
        });
        it('should set staffNumber property', function () {
            var staffNumber = 'staff-number';
            component.staffNumberChanged(staffNumber);
            expect(component.staffNumber).toBe(staffNumber);
        });
        it('should set applicationReference property', function () {
            var applicationReference = 'application-reference';
            component.applicationReferenceChanged(applicationReference);
            expect(component.applicationReference).toBe(applicationReference);
        });
        it('should dispatch SearchBookedTest with the right params', function () {
            var staffNumber = 'staff-number';
            var applicationReference = 'application-reference';
            component.staffNumberChanged(staffNumber);
            component.applicationReferenceChanged(applicationReference);
            spyOn(store$, 'dispatch');
            component.searchTests();
            expect(store$.dispatch).toHaveBeenCalledWith(new SearchBookedTest(applicationReference, staffNumber));
        });
        describe('isBookedTestSlotEmpty', function () {
            it('should return true if booked test slot variable is empty', function () {
                var bookedTestSlot = {};
                var result = component.isBookedTestSlotEmpty(bookedTestSlot);
                expect(result).toBe(true);
            });
            it('should return false if booked test slot variable is not empty', function () {
                var bookedTestSlot = bookedTestSlotMock;
                var result = component.isBookedTestSlotEmpty(bookedTestSlot);
                expect(result).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=rekey-search.spec.js.map