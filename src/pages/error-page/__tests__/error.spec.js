import { AppModule } from './../../../app/app.module';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, AlertController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, AlertControllerMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { ErrorPage } from './../error';
import { ErrorMessageComponent } from '../../../components/common/error-message/error-message';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
describe('ErrorPage', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ErrorPage,
                MockComponent(ErrorMessageComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AlertController, useFactory: function () { return AlertControllerMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ErrorPage);
        component = fixture.componentInstance;
    }));
    it('should navigation back to the last page in the stack', function () {
        component.goBack();
        expect(component.navController.pop).toHaveBeenCalled();
    });
    describe('DOM', function () {
        it('should display an error message', function () {
            expect(fixture.debugElement.query(By.css('.error'))).not.toBeNull();
        });
    });
});
//# sourceMappingURL=error.spec.js.map