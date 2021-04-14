import { async, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { MockComponent } from 'ng-mocks';
import { ViewTestResultCatCPCPage } from '../view-test-result.cat-cpc.page';
import { TestDetailsCardComponent } from '../../components/test-details-card/test-details-card';
import { RekeyDetailsCardComponent } from '../../components/rekey-details-card/rekey-details';
import { RekeyReasonCardComponent } from '../../components/rekey-reason-card/rekey-reason';
import { ExaminerDetailsCardComponent } from '../../components/examiner-details-card/examiner-details';
import { ViewTestHeaderComponent } from '../../components/view-test-header/view-test-header';
import { ErrorMessageComponent } from '../../../../components/common/error-message/error-message';
import { BusinessDetailsCardComponent } from '../../components/business-details-card/business-details-card';
import { ContactDetailsCardComponent } from '../../components/contact-details-card/contact-details-card';
import { AppModule } from '../../../../app/app.module';
import { LoadingControllerMock, NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { SearchProvider } from '../../../../providers/search/search';
import { SearchProviderMock } from '../../../../providers/search/__mocks__/search.mock';
import { CompressionProvider } from '../../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../../providers/compression/__mocks__/compression.mock';
import { categoryCPCTestResultMock } from '../../../../shared/mocks/cat-cpc-test-result.mock';
import { CPCDebriefCardComponent } from '../../../../components/common/cpc-debrief-card/cpc-debrief-card';
import { TestOutcome } from '../../../../modules/tests/tests.constants';
import { By } from '@angular/platform-browser';
import { ViewTestResultCatCPCComponentsModule } from '../components/view-test-result.cat-cpc.components.module';
describe('ViewTestResultCatCPCPage', function () {
    var fixture;
    var component;
    var loadingController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ViewTestResultCatCPCPage,
                MockComponent(TestDetailsCardComponent),
                MockComponent(RekeyDetailsCardComponent),
                MockComponent(RekeyReasonCardComponent),
                MockComponent(ExaminerDetailsCardComponent),
                MockComponent(ViewTestHeaderComponent),
                MockComponent(CPCDebriefCardComponent),
                MockComponent(ErrorMessageComponent),
                MockComponent(BusinessDetailsCardComponent),
                MockComponent(ContactDetailsCardComponent),
            ],
            imports: [IonicModule, AppModule, ViewTestResultCatCPCComponentsModule],
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
        fixture = TestBed.createComponent(ViewTestResultCatCPCPage);
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
                component.testResult = categoryCPCTestResultMock;
                var result = component.getTestDetails();
                expect(result.applicationReference).toBe('12345672013');
                expect(result.category).toBe('CCPC');
                expect(result.date).toBe('Friday 5th July 2019');
                expect(result.time).toBe('09:00');
                expect(result.specialNeeds).toEqual([
                    'Candidate is heavily pregnant',
                    'Candidate whishes to be called a different name',
                ]);
                expect(result.entitlementCheck).toBe(true);
                expect(result.slotType).toBe('Double Slot Special Needs');
                expect(result.previousCancellations).toEqual(['Act of nature', 'DSA']);
            });
            it('should return null when there is no test result', function () {
                var result = component.getTestDetails();
                expect(result).toBeNull();
            });
        });
        describe('getExaminerDetails', function () {
            it('should correctly generate the data', function () {
                component.testResult = categoryCPCTestResultMock;
                var result = component.getExaminerDetails();
                expect(result.staffNumber).toBe('12345678');
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
                component.testResult = categoryCPCTestResultMock;
                var result = component.getHeaderDetails();
                expect(result.activityCode).toBe('2');
                expect(result.candidateName).toBe('Miss Florence Pearson');
                expect(result.candidateDriverNumber).toBe('PEARSL6767655777BN');
                expect(result.testOutcome).toBe(TestOutcome.Failed);
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
            expect(fixture.debugElement.query(By.css('cpc-vehicle-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('cpc-debrief-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('test-summary-card'))).toBeNull();
        });
        it('should show vehicle details if testCategory is DCPC', function () {
            component.isLoading = false;
            var mockData = categoryCPCTestResultMock;
            mockData.category = "DCPC" /* DCPC */;
            spyOn(component.compressionProvider, 'extractTestResult').and.returnValue(mockData);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('cpc-vehicle-details-card'))).not.toBeNull();
        });
        it('should show vehicle details if testCategory is CCPC', function () {
            component.isLoading = false;
            var mockData = categoryCPCTestResultMock;
            mockData.category = "CCPC" /* CCPC */;
            spyOn(component.compressionProvider, 'extractTestResult').and.returnValue(mockData);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('cpc-vehicle-details-card'))).not.toBeNull();
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
            expect(fixture.debugElement.query(By.css('cpc-vehicle-details-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('cpc-debrief-card'))).toBeNull();
            expect(fixture.debugElement.query(By.css('test-summary-card'))).toBeNull();
        });
        it('should show the cards when the data is not loading and there is no error', function () {
            component.isLoading = false;
            spyOn(component.compressionProvider, 'extractTestResult').and.returnValue(categoryCPCTestResultMock);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.error'))).toBeNull();
            expect(fixture.debugElement.query(By.css('view-test-header'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('test-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('rekey-reason-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('examiner-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('cpc-vehicle-details-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('cpc-debrief-card'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('cpc-test-summary-card'))).not.toBeNull();
        });
    });
    it('should show rekey cards only when rekey is true', function () {
        component.isLoading = false;
        component.testResult = categoryCPCTestResultMock;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('rekey-details-card'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('rekey-reason-card'))).not.toBeNull();
    });
});
//# sourceMappingURL=view-test-result.cat-cpc.page.spec.js.map