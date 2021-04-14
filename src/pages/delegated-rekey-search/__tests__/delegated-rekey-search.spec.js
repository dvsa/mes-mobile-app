var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ModalControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { DelegatedRekeySearchPage } from '../delegated-rekey-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { StoreModule, Store } from '@ngrx/store';
import { delegatedSearchReducer } from '../delegated-rekey-search.reducer';
import { DelegatedRekeySearchViewDidEnter, SearchBookedDelegatedTest } from '../delegated-rekey-search.actions';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { bookedTestSlotMock } from '../../../shared/mocks/test-slot-data.mock';
import { configureTestSuite } from 'ng-bullet';
describe('DelegatedRekeySearchPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DelegatedRekeySearchPage,
            ],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                TestSlotComponentsModule,
                StoreModule.forRoot({
                    delegatedRekeySearch: delegatedSearchReducer,
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
    beforeEach(async(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fixture = TestBed.createComponent(DelegatedRekeySearchPage);
                    component = fixture.componentInstance;
                    store$ = TestBed.get(Store);
                    return [4 /*yield*/, component.ngOnInit()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
        describe('applicationReferenceInvalid', function () {
            it('should return true if the applicationReference is less than 11 characters', function () {
                var appRefInput = component.delegatedRekeyForm.get('applicationReferenceInput');
                appRefInput.patchValue('1234567891');
                appRefInput.markAsDirty();
                var value = component.applicationReferenceInvalid;
                expect(value).toEqual(true);
            });
            it('should return false if the applicationReference is 11 characters', function () {
                var appRefInput = component.delegatedRekeyForm.get('applicationReferenceInput');
                appRefInput.patchValue('12345678910');
                appRefInput.markAsDirty();
                var value = component.applicationReferenceInvalid;
                expect(value).toEqual(false);
            });
        });
        it('should dispatch RekeySearchViewDidEnter action', function () {
            spyOn(store$, 'dispatch');
            spyOn(component, 'setUpSubscription').and.callFake(function () { });
            component.ionViewDidEnter();
            expect(store$.dispatch).toHaveBeenCalledWith(new DelegatedRekeySearchViewDidEnter());
            expect(component.setUpSubscription).toHaveBeenCalled();
        });
        it('should set applicationReference property', function () {
            var applicationReference = 'application-reference';
            component.applicationReferenceChanged(applicationReference);
            expect(component.applicationReference).toBe(applicationReference);
        });
        it('should dispatch SearchBookedTest with the right params', function () {
            var applicationReference = 'application-reference';
            component.applicationReferenceChanged(applicationReference);
            spyOn(store$, 'dispatch');
            component.searchTests();
            expect(store$.dispatch).toHaveBeenCalledWith(new SearchBookedDelegatedTest(applicationReference));
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
//# sourceMappingURL=delegated-rekey-search.spec.js.map