import { async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardComponent } from '../vehicle-checks-card';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../../../../app/app.module';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import * as englishTranslations from '../../../../../assets/i18n/en.json';
import { configureTestSuite } from 'ng-bullet';
import { getMalformedVehicleChecks } from '../__mocks__/vehicle-checks-card.mock';
import { HttpClient, HttpClientModule } from '@angular/common/http';
describe('VehicleChecksCardComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCardComponent,
            ],
            imports: [
                IonicModule,
                HttpClientModule,
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
        fixture = TestBed.createComponent(VehicleChecksCardComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('questionHasFault', function () {
        var questionResult = {
            code: 'Test Code',
            description: 'Test description',
            outcome: 'P',
        };
        var questionResultFault = {
            code: 'Test Code',
            description: 'Test description',
            outcome: 'DF',
        };
        it('should return TRUE if the question has a fault', function () {
            var result = component.questionHasFault(questionResultFault);
            expect(result).toEqual(true);
        });
        it('should return FALSE if the question does NOT have a fault', function () {
            var result = component.questionHasFault(questionResult);
            expect(result).toEqual(false);
        });
    });
    describe('isHomeTest', function () {
        it('should return TRUE if it is a home test', function () {
            component.category = "F" /* F */;
            var result = component.isHomeTest();
            expect(result).toEqual(true);
        });
        it('should return FALSE if it is NOT a home test', function () {
            component.category = "B+E" /* BE */;
            var result = component.isHomeTest();
            expect(result).toEqual(false);
        });
    });
    describe('DOM', function () {
        describe('Vehicle check reporting', function () {
            it('should remove any SMTM questions which have no outcome provided', function () {
                component.category = "B+E" /* BE */;
                // 2 questions are provided with an outcome here.
                component.tellMeShowMeQuestions = getMalformedVehicleChecks();
                component.ngOnInit();
                expect(component.tellMeShowMeQuestions.length).toEqual(2);
            });
            it('should show results', function () {
                component.category = "B+E" /* BE */;
                component.tellMeShowMeQuestions = [
                    {
                        code: 'S01',
                        description: 'Show me how you would check that the direction indicators are working.',
                        outcome: 'P',
                    },
                ];
                fixture.detectChanges();
                var tellMeQuestionText = fixture.debugElement
                    .query(By.css('#vehicle-checks .counter-label')).nativeElement;
                expect(tellMeQuestionText.innerHTML.trim())
                    .toContain(englishTranslations.debrief.showMeTellMeQuestions["B+E" /* BE */].S01);
            });
            it('should show results in Welsh for a Welsh test', function (done) {
                component.category = "B+E" /* BE */;
                component.tellMeShowMeQuestions = [
                    {
                        code: 'S01',
                        description: 'Show me how you would check that the direction indicators are working.',
                        outcome: 'P',
                    },
                ];
                fixture.detectChanges();
                // Language change handled by parent page component, force the switch
                translate.use('cy').subscribe(function () {
                    fixture.detectChanges();
                    var tellMeQuestionText = fixture.debugElement
                        .query(By.css('#vehicle-checks .counter-label')).nativeElement;
                    expect(tellMeQuestionText.innerHTML.trim())
                        .toContain(welshTranslations.debrief.showMeTellMeQuestions["B+E" /* BE */].S01);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-card.spec.js.map