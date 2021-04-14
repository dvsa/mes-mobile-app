import { async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardCatBComponent } from '../vehicle-checks-card.cat-b';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { TellMeQuestionCorrect, ShowMeQuestionPassed, ShowMeQuestionDrivingFault, TellMeQuestionDrivingFault, ShowMeQuestionSeriousFault, ShowMeQuestionDangerousFault, } from '../../../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../../../../../app/app.module';
import * as welshTranslations from '../../../../../../assets/i18n/cy.json';
import { configureTestSuite } from 'ng-bullet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
describe('VehicleChecksCardCatBComponent', function () {
    var fixture;
    var store$;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCardCatBComponent,
            ],
            imports: [
                IonicModule,
                HttpClientModule,
                StoreModule.forRoot({ tests: testsReducer }),
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [HttpClient],
                    },
                }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksCardCatBComponent);
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "B" /* B */));
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        it('should not display the card when no fault marked', function () {
            store$.dispatch(new TellMeQuestionCorrect());
            store$.dispatch(new ShowMeQuestionPassed());
            fixture.detectChanges();
            var vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
            expect(vehicleChecksCard).toBeNull();
        });
        it('should display the card when show me has a fault', function () {
            store$.dispatch(new TellMeQuestionCorrect());
            store$.dispatch(new ShowMeQuestionDrivingFault());
            fixture.detectChanges();
            var vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
            expect(vehicleChecksCard).not.toBeNull();
        });
        it('should display the card when tell me has a fault', function () {
            store$.dispatch(new TellMeQuestionDrivingFault());
            store$.dispatch(new ShowMeQuestionPassed());
            fixture.detectChanges();
            var vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
            expect(vehicleChecksCard).not.toBeNull();
        });
        it('should display tell me question div, when there is a tell me fault', function () {
            store$.dispatch(new TellMeQuestionDrivingFault());
            store$.dispatch(new ShowMeQuestionPassed());
            fixture.detectChanges();
            var vehicleChecksCard = fixture.debugElement.query(By.css('#tell-me-question'));
            expect(vehicleChecksCard).not.toBeNull();
        });
        it('should display show me question div, when there is a show me fault', function () {
            store$.dispatch(new TellMeQuestionCorrect());
            store$.dispatch(new ShowMeQuestionDrivingFault());
            fixture.detectChanges();
            var vehicleChecksCard = fixture.debugElement.query(By.css('#show-me-question'));
            expect(vehicleChecksCard).not.toBeNull();
        });
        describe('Vehicle check reporting', function () {
            describe('Tell me question reporting', function () {
                it('should indicate when there was a driving fault on the tell me question', function () {
                    store$.dispatch(new TellMeQuestionDrivingFault());
                    fixture.detectChanges();
                    var tellMeQuestionText = fixture.debugElement.query(By.css('#tell-me-question')).nativeElement;
                    expect(tellMeQuestionText.innerHTML.trim()).toBe('Tell me question - Driving fault');
                });
                it('should indicate a tell me fault in Welsh for a Welsh test', function (done) {
                    fixture.detectChanges();
                    store$.dispatch(new TellMeQuestionDrivingFault());
                    // Language change handled by parent page component, force the switch
                    translate.use('cy').subscribe(function () {
                        fixture.detectChanges();
                        var tellMeQuestionText = fixture.debugElement.query(By.css('#tell-me-question')).nativeElement;
                        var questionText = welshTranslations.debrief.tellMeQuestion;
                        var drvingFaultText = welshTranslations.debrief.drivingFault;
                        expect(tellMeQuestionText.innerHTML.trim())
                            .toBe(questionText + " - " + drvingFaultText);
                        done();
                    });
                });
            });
            describe('Show me question reporting', function () {
                it('should indicate when there was a driving fault on the show me question', function () {
                    fixture.detectChanges();
                    store$.dispatch(new ShowMeQuestionDrivingFault());
                    fixture.detectChanges();
                    var showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
                    expect(showMeQuestionText.innerHTML.trim()).toBe('Show me question - Driving fault');
                });
                it('should indicate a show me driving fault in Welsh for a Welsh test', function (done) {
                    fixture.detectChanges();
                    store$.dispatch(new ShowMeQuestionDrivingFault());
                    // Language change handled by parent page component, force the switch
                    translate.use('cy').subscribe(function () {
                        fixture.detectChanges();
                        var showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
                        var _a = welshTranslations.debrief, showMeQuestion = _a.showMeQuestion, drivingFault = _a.drivingFault;
                        var expectedTranslation = showMeQuestion + " - " + drivingFault;
                        expect(showMeQuestionText.innerHTML.trim()).toBe(expectedTranslation);
                        done();
                    });
                });
                it('should indicate when there was a serious fault on the show me question', function () {
                    fixture.detectChanges();
                    store$.dispatch(new ShowMeQuestionSeriousFault());
                    fixture.detectChanges();
                    var showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
                    expect(showMeQuestionText.innerHTML.trim()).toBe('Show me question - Serious fault');
                });
                it('should indicate a show me serious fault in Welsh for a Welsh test', function (done) {
                    fixture.detectChanges();
                    store$.dispatch(new ShowMeQuestionSeriousFault());
                    // Language change handled by parent page component, force the switch
                    translate.use('cy').subscribe(function () {
                        fixture.detectChanges();
                        var showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
                        var _a = welshTranslations.debrief, showMeQuestion = _a.showMeQuestion, seriousFault = _a.seriousFault;
                        var expectedTranslation = showMeQuestion + " - " + seriousFault;
                        expect(showMeQuestionText.innerHTML.trim()).toBe(expectedTranslation);
                        done();
                    });
                });
                it('should indicate when there was a dangerous fault on the show me question', function () {
                    fixture.detectChanges();
                    store$.dispatch(new ShowMeQuestionDangerousFault());
                    fixture.detectChanges();
                    var showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
                    expect(showMeQuestionText.innerHTML.trim()).toBe('Show me question - Dangerous fault');
                });
                it('should indicate a tell me dangerous fault in Welsh for a Welsh test', function (done) {
                    fixture.detectChanges();
                    store$.dispatch(new ShowMeQuestionDangerousFault());
                    // Language change handled by parent page component, force the switch
                    translate.use('cy').subscribe(function () {
                        fixture.detectChanges();
                        var showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
                        var _a = welshTranslations.debrief, showMeQuestion = _a.showMeQuestion, dangerousFault = _a.dangerousFault;
                        var expectedTranslation = showMeQuestion + " - " + dangerousFault;
                        expect(showMeQuestionText.innerHTML.trim()).toBe(expectedTranslation);
                        done();
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-card.cat-b.spec.js.map