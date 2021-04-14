var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { async, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { Platform, NavController } from 'ionic-angular';
import { PlatformMock, NavControllerMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { BasePageComponent } from '../base-page';
import { LOGIN_PAGE } from '../../../pages/page-names.constants';
import { configureTestSuite } from 'ng-bullet';
describe('Base Page', function () {
    var platform;
    var navController;
    var authenticationProvider;
    var basePageComponent;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        platform = TestBed.get(Platform);
        navController = TestBed.get(NavController);
        authenticationProvider = TestBed.get(AuthenticationProvider);
        var BasePageClass = /** @class */ (function (_super) {
            __extends(BasePageClass, _super);
            function BasePageClass(platform, navController, authenticationProvider) {
                return _super.call(this, platform, navController, authenticationProvider) || this;
            }
            return BasePageClass;
        }(BasePageComponent));
        basePageComponent = new BasePageClass(platform, navController, authenticationProvider);
    }));
    describe('ionViewWillEnter()', function () {
        beforeEach(function () {
            spyOn(basePageComponent.navController, 'setRoot');
        });
        it('should allow user access if authentication is not required', fakeAsync(function () {
            basePageComponent.loginRequired = false;
            basePageComponent.ionViewWillEnter();
            expect(basePageComponent.navController.setRoot).not.toHaveBeenCalled();
            flushMicrotasks();
        }));
        it('should allow user access if authentication is required and device is not ios', fakeAsync(function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
            basePageComponent.ionViewWillEnter();
            expect(basePageComponent.navController.setRoot).not.toHaveBeenCalled();
            flushMicrotasks();
        }));
        it('should allow user access if authenticated , is an ios device and is required', fakeAsync(function () {
            authenticationProvider.hasValidToken =
                jasmine.createSpy('authenticationProvider.hasValidToken').and.returnValue(Promise.resolve(false));
            basePageComponent.ionViewWillEnter();
            expect(basePageComponent.navController.setRoot).not.toHaveBeenCalled();
            flushMicrotasks();
        }));
        // tslint:disable-next-line:max-line-length
        it('should not allow user access if user is not authenticated, authentication is required and device is ios', fakeAsync(function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
            authenticationProvider.hasValidToken =
                jasmine.createSpy('authenticationProvider.hasValidToken').and.returnValue(Promise.resolve(false));
            authenticationProvider.isInUnAuthenticatedMode =
                jasmine.createSpy('authenticationProvider.isInUnAuthenticatedMode').and.returnValue(false);
            basePageComponent.loginRequired = true;
            basePageComponent.ionViewWillEnter();
            flushMicrotasks();
            expect(basePageComponent.navController.setRoot).toHaveBeenCalledWith(LOGIN_PAGE);
        }));
    });
    describe('isIos()', function () {
        it('should return true if platform is ios', function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
            expect(basePageComponent.isIos()).toBe(true);
        });
        it('should return false if platform is not ios', function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
            expect(basePageComponent.isIos()).toBe(false);
        });
    });
    describe('logout()', function () {
        it('should try to logout when platform is ios', fakeAsync(function () {
            authenticationProvider.logout =
                jasmine.createSpy('authenticationProvider.logout').and.returnValue(Promise.resolve(false));
            basePageComponent.logout();
            flushMicrotasks();
            expect(authenticationProvider.logout).toHaveBeenCalledTimes(1);
            expect(navController.setRoot).toHaveBeenCalledTimes(1);
            expect(navController.setRoot).toHaveBeenCalledWith(LOGIN_PAGE, {
                hasLoggedOut: true,
            });
        }));
        it('should not try to logout when platform is not ios', function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
            basePageComponent.logout();
            expect(authenticationProvider.logout).toHaveBeenCalledTimes(0);
            expect(navController.setRoot).toHaveBeenCalledTimes(0);
        });
    });
});
//# sourceMappingURL=base-page.spec.js.map