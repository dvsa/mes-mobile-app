import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, LoadingController, } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, LoadingControllerMock, } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { SearchProvider } from '../../../../providers/search/search';
import { SearchProviderMock } from '../../../../providers/search/__mocks__/search.mock';
import { MockComponent } from 'ng-mocks';
import { TestDetailsCardComponent } from '../../components/test-details-card/test-details-card';
import { RekeyDetailsCardComponent } from '../../components/rekey-details-card/rekey-details';
import { RekeyReasonCardComponent } from '../../components/rekey-reason-card/rekey-reason';
import { ExaminerDetailsCardComponent } from '../../components/examiner-details-card/examiner-details';
import { By } from '@angular/platform-browser';
import { VehicleDetailsCardComponent } from '../../components/vehicle-details-card/vehicle-details-card';
import { CompressionProvider } from '../../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../../providers/compression/__mocks__/compression.mock';
import { TestSummaryCardComponent } from '../../components/test-summary-card/test-summary-card';
import { ViewTestHeaderComponent } from '../../components/view-test-header/view-test-header';
import { TestOutcome } from '../../../../modules/tests/tests.constants';
import { DebriefCardComponent } from '../components/debrief-card/debrief-card';
import { ErrorMessageComponent } from '../../../../components/common/error-message/error-message';
import { BusinessDetailsCardComponent } from '../../components/business-details-card/business-details-card';
import { ContactDetailsCardComponent } from '../../components/contact-details-card/contact-details-card';
import { ViewTestResultCatAMod1Page } from '../view-test-result.cat-a-mod1.page';
import { configureTestSuite } from 'ng-bullet';
import { categoryAM1TestResultMock } from '../../../../shared/mocks/cat-a-mod1-test-result.mock';
import { VehicleDetailsCardCatAComponent } from '../../components/vehicle-details-card-cat-a/vehicle-details-card-cat-a';
describe('ViewTestResultCatAMod1Page', function () {
    var fixture;
    var component;
    var loadingController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ViewTestResultCatAMod1Page,
                MockComponent(TestDetailsCardComponent),
                MockComponent(RekeyDetailsCardComponent),
                MockComponent(RekeyReasonCardComponent),
                MockComponent(ExaminerDetailsCardComponent),
                MockComponent(VehicleDetailsCardComponent),
                MockComponent(TestSummaryCardComponent),
                MockComponent(ViewTestHeaderComponent),
                MockComponent(DebriefCardComponent),
                MockComponent(ErrorMessageComponent),
                MockComponent(BusinessDetailsCardComponent),
                MockComponent(ContactDetailsCardComponent),
                MockComponent(VehicleDetailsCardCatAComponent),
            ],
            imports: [IonicModule, AppModule],
            providers: [
                {
                    provide: NavController,
                    useFactory: function () { return NavControllerMock.instance(); },
                },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                {
                    provide: LoadingController,
                    useFactory: function () { return LoadingControllerMock.instance(); },
                },
                {
                    provide: AuthenticationProvider,
                    useClass: AuthenticationProviderMock,
                },
                { provide: SearchProvider, useClass: SearchProviderMock },
                { provide: CompressionProvider, useClass: CompressionProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ViewTestResultCatAMod1Page);
        component = fixture.componentInstance;
        loadingController = TestBed.get(LoadingController);
    }));
    describe('Class', function () {
        describe('handleLoadingUI', function () {
            it('should setup a loading spinner when isLoading is set to true', function () {
                component.handleLoadingUI(true);
                expect(component.isLoading).toEqual(true);
                expect(component.loadingSpinner).not.toBeNull;
            });
            it('should remove the loading spinner when isLoading is set to false', function () {
                component.loadingSpinner = loadingController.create();
                component.handleLoadingUI(false);
                expect(component.isLoading).toEqual(false);
                expect(component.loadingSpinner).toBeNull();
            });
        });
        describe('getTestDetails', function () {
            it('should correctly generate the data', function () {
                component.testResult = categoryAM1TestResultMock;
                var result = component.getTestDetails();
                expect(result.applicationReference).toBe('20123000011');
                expect(result.category).toBe('EUAM1');
                expect(result.date).toBe('Thursday 13th February 2020');
                expect(result.time).toBe('08:10');
                expect(result.specialNeeds).toEqual([
                    'None',
                ]);
                expect(result.entitlementCheck).toBe(false);
                expect(result.slotType).toBe('Standard Test');
                expect(result.previousCancellations).toEqual(['Act of nature']);
            });
            it('should return null when there is no test result', function () {
                var result = component.getTestDetails();
                expect(result).toBeNull();
            });
        });
        describe('getExaminerDetails', function () {
            it('should correctly generate the data', function () {
                component.testResult = categoryAM1TestResultMock;
                var result = component.getExaminerDetails();
                expect(result.staffNumber).toBe('10000010');
                expect(result.costCode).toBe('EXTC1');
                expect(result.testCentreName).toBe('Example Test Centre');
            });
            it('should return null when there is no test result', function () {
                var result = component.getExaminerDetails();
                expect(result).toBeNull();
            });
        });
        describe('getHeaderDetails', function () {
            it('should return the correct data', function () {
                component.testResult = categoryAM1TestResultMock;
                var result = component.getHeaderDetails();
                expect(result.activityCode).toBe('1');
                expect(result.candidateName).toBe('Mr Fred Colon');
                expect(result.candidateDriverNumber).toBe('CATA112345678902');
                expect(result.testOutcome).toBe(TestOutcome.Passed);
            });
            it('should return null when there is no test result', function () {
                var result = component.getHeaderDetails();
                expect(result).toBeNull();
            });
        });
        describe('goBack', function () {
            it('should navigation the user back to the last page', function () {
                component.goBack();
                expect(component.navController.pop).toHaveBeenCalled();
            });
        });
    });
    describe('DOM', function () {
        it('should hide the cards and error message when the data is loading', function () {
            component.isLoading = true;
            expect(fixture.debugElement.query(By.css('.error'))).toBeNull();
            expect(fixture.debugElement.query(By.css('view-test-header'))).toBeNull();
            expect(fixture.debugElement.query(By.css('test-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-reason-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('examiner-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('debrief-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('test-summary-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('vehicle-details-card-cat-a'))).toBeNull();
        });
        it('should hide the cards and show the error message when there has been an error', function () {
            component.isLoading = false;
            component.showErrorMessage = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.error'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('view-test-header'))).toBeNull();
            expect(fixture.debugElement.query(By.css('test-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-reason-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('examiner-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('debrief-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('test-summary-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('vehicle-details-card-cat-a'))).toBeNull();
        });
        it('should show the cards when the data is not loading and there is no error', function () {
            component.isLoading = false;
            component.testResult = categoryAM1TestResultMock;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.error'))).toBeNull();
            expect(fixture.debugElement.query(By.css('view-test-header'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('test-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-reason-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('examiner-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('vehicle-details-card-cat-a'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('debrief-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('test-summary-card'))).not.toBeNull();
        });
    });
    it('should show rekey cards only when rekey is true', function () {
        component.isLoading = false;
        component.testResult = categoryAM1TestResultMock;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('rekey-details-card'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('rekey-reason-card'))).not.toBeNull();
    });
});
//# sourceMappingURL=view-test-result.cat-a-mod1.page.spec.js.map