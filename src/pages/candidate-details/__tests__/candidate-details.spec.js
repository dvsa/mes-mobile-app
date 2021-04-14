import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { CandidateDetailsPage } from '../candidate-details';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { MockComponent } from 'ng-mocks';
import { DisplayAddressComponent } from '../../../components/common/display-address/display-address';
import { DataRowComponent } from '../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../components/common/data-row-custom/data-row-custom';
import { configureTestSuite } from 'ng-bullet';
describe('CandidateDetailsPage', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CandidateDetailsPage,
                MockComponent(DisplayAddressComponent),
                MockComponent(DataRowComponent),
                MockComponent(DataRowCustomComponent),
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
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CandidateDetailsPage);
        component = fixture.componentInstance;
    }));
    describe('specialNeedsIsPopulated', function () {
        it('returns true for a populated array', function () {
            var specialNeedsString = ['one', 'two', 'three', 'four'];
            var result = component.specialNeedsIsPopulated(specialNeedsString);
            expect(result).toEqual(true);
        });
        it('returns false for string', function () {
            var specialNeedsString = 'No details supplied';
            var result = component.specialNeedsIsPopulated(specialNeedsString);
            expect(result).toEqual(false);
        });
    });
    describe('DOM', function () {
        // Unit tests for the components template
    });
});
//# sourceMappingURL=candidate-details.spec.js.map