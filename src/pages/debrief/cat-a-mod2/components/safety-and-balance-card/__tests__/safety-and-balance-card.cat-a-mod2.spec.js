import { async, TestBed } from '@angular/core/testing';
import { SafetyAndBalanceCardCatAMod2Component } from '../safety-and-balance-card.cat-a-mod2';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { SafetyQuestionSelected, SafetyQuestionOutcomeChanged, } from '../../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.actions';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../../../../../app/app.module';
import * as welshTranslations from '../../../../../../assets/i18n/cy.json';
import * as englishTranslations from '../../../../../../assets/i18n/en.json';
import { PopulateTestCategory } from '../../../../../../modules/tests/category/category.actions';
import { PopulateCandidateDetails } from '../../../../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { candidateMock } from '../../../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
describe('SafetyAndBalanceCardCatAMod2Component', function () {
    var fixture;
    var store$;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SafetyAndBalanceCardCatAMod2Component,
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
        fixture = TestBed.createComponent(SafetyAndBalanceCardCatAMod2Component);
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "EUA2M2" /* EUA2M2 */));
        store$.dispatch(new PopulateTestCategory("EUA2M2" /* EUA2M2 */));
        store$.dispatch(new PopulateCandidateDetails(candidateMock));
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        describe('Safety and balance question reporting', function () {
            it('should show results', function () {
                var safetyQuestion = {
                    code: 'M4',
                    description: 'Tell me how you would check that the lights and reflectors are clean and working.',
                };
                // Configure show safety and balance questions
                store$.dispatch(new SafetyQuestionSelected(safetyQuestion, 1));
                store$.dispatch(new SafetyQuestionOutcomeChanged('P', 1));
                fixture.detectChanges();
                var safetyQuestionText = fixture.debugElement
                    .query(By.css('#safety-and-balance-questions .counter-label')).nativeElement;
                expect(safetyQuestionText.innerHTML.trim())
                    .toContain(englishTranslations.debrief.safetyAndBalanceQuestions.M4);
            });
            it('should show results in Welsh for a Welsh test', function (done) {
                var safetyQuestion = {
                    code: 'M4',
                    description: 'Tell me how you would check that the lights and reflectors are clean and working.',
                };
                // Configure show safety and balance questions
                store$.dispatch(new SafetyQuestionSelected(safetyQuestion, 1));
                store$.dispatch(new SafetyQuestionOutcomeChanged('P', 1));
                fixture.detectChanges();
                // Language change handled by parent page component, force the switch
                translate.use('cy').subscribe(function () {
                    fixture.detectChanges();
                    var safetyQuestionText = fixture.debugElement
                        .query(By.css('#safety-and-balance-questions .counter-label')).nativeElement;
                    expect(safetyQuestionText.innerHTML.trim())
                        .toContain(welshTranslations.debrief.safetyAndBalanceQuestions.M4);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=safety-and-balance-card.cat-a-mod2.spec.js.map