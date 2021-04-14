import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform, NavParams } from 'ionic-angular';
import { NavControllerMock, PlatformMock, NavParamsMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { FakeCandidateDetailsPage } from '../fake-candidate-details';
import { MockComponent } from 'ng-mocks';
import { DisplayAddressComponent } from '../../../components/common/display-address/display-address';
import { configureTestSuite } from 'ng-bullet';
describe('FakeCandidateDetailsPage', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                FakeCandidateDetailsPage,
                MockComponent(DisplayAddressComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(FakeCandidateDetailsPage);
        component = fixture.componentInstance;
        component.slot = {};
    }));
    describe('Class', function () {
        // Unit tests for the components TypeScript class
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=fake-candidate-details.spec.js.map